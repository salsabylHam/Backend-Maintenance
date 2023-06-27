resource "aws_security_group" "lb" {
  name   = "${var.app_name}-alb-security-group"
  vpc_id = module.vpc.vpc_id

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "default" {
  name            = "${var.app_name}-lb"
  subnets         = module.vpc.public_subnets
  security_groups = [aws_security_group.lb.id]
}

resource "aws_lb_target_group" "maintenance" {
  name        = "${var.app_name}-target-group"
  port        = 80
  protocol    = var.lb_tg_protocol
  vpc_id      = module.vpc.vpc_id
  target_type = "ip"
  health_check {
    path                = var.app_healthcheck_path
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200-299"
  }
}

resource "aws_lb_listener" "maintenance" {
  load_balancer_arn = aws_lb.default.id
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.maintenance.id
    type             = "forward"
  }
}
resource "aws_lb_listener_rule" "static" {
  listener_arn = aws_lb_listener.maintenance.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.maintenance.arn
  }

  condition {
    path_pattern {
      values = ["/api/v1/*"]
    }
  }

}
output "load_balancer_ip" {
  value = aws_lb.default.dns_name
}