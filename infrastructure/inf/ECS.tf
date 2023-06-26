resource "aws_ecs_cluster" "maintenance-ecs-cluster" {
  name = "ecs-cluster-${var.app_name}"
}

resource "aws_cloudwatch_log_group" "maintenance" {
  name = "${var.app_name}-log-group"
}
resource "aws_secretsmanager_secret" "env_var" {
  name                    = "ENV_VAR"
  recovery_window_in_days = 0
}
resource "aws_secretsmanager_secret_version" "env_var" {
  secret_id = aws_secretsmanager_secret.env_var.id
  secret_string = jsonencode(
    var.env_var
  )
}
locals {
  env_var_output = [
    for key, value in var.env_var : {
      name      = key
      valueFrom = "${aws_secretsmanager_secret.env_var.arn}:${key}"
    }
  ]
}

resource "aws_ecs_task_definition" "maintenance-ecs-task-definition" {
  task_role_arn            = aws_iam_role.backend_role.arn
  container_definitions = jsonencode([
    {
      name      = "${var.app_name}-container"
      image     = "${aws_ecr_repository.maintenance-image-repo.repository_url}:latest"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = var.app_port
          hostPort      = var.app_port
        }
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "${aws_cloudwatch_log_group.maintenance.name}",
          awslogs-region        = "${var.region}",
          awslogs-stream-prefix = "ecs"
        }
      },
      environment = [{
        name  = "ALLOWED_ORIGIN"
        value = "http://${aws_lb.default.dns_name}"
      }]
      secrets = local.env_var_output
    },
  ])

  family                   = "ecs-task-definition-${var.app_name}"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_ecs_service" "maintenance_service" {
  name            = "${var.app_name}-service"
  cluster         = aws_ecs_cluster.maintenance-ecs-cluster.id
  task_definition = aws_ecs_task_definition.maintenance-ecs-task-definition.arn
  launch_type     = "FARGATE"
  desired_count   = 2
  network_configuration {
    security_groups = [aws_security_group.maintenance_task.id]
    subnets         = module.vpc.private_subnets
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.maintenance.id
    container_name   = "${var.app_name}-container"
    container_port   = var.app_port
  }

  depends_on = [aws_lb_listener.maintenance]

}

data "aws_ecs_service" "maintenance_service" {
  service_name = aws_ecs_service.maintenance_service.name
  cluster_arn  = aws_ecs_cluster.maintenance-ecs-cluster.arn
}
resource "aws_security_group" "maintenance_task" {
  name   = "${var.app_name}-task-security-group"
  vpc_id = module.vpc.vpc_id

  ingress {
    protocol        = "tcp"
    from_port       = var.app_port
    to_port         = var.app_port
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity       = var.max_task_count
  min_capacity       = var.min_task_count
  resource_id        = "service/${aws_ecs_cluster.maintenance-ecs-cluster.name}/${aws_ecs_service.maintenance_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "cpu_scaling" {
  name               = var.autoscaling_policy_name
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace
  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 80
  }
  depends_on = [aws_appautoscaling_target.ecs_target]
}
