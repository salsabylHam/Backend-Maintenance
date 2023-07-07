#ECR
resource "aws_ecr_repository_policy" "maintenance-image-repo-policy" {
  repository = aws_ecr_repository.maintenance-image-repo.name
  policy = jsonencode({

    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "adds full ecr access to the maintenance repository",
        "Effect" : "Allow",
        "Principal" : { "AWS" : "${module.oidc_github.iam_role_arn}" },
        "Action" : [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetLifecyclePolicy",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]
      }
    ]
  })
}
#ECS
resource "aws_iam_policy" "ecs_register_task_definition" {
  name        = "ecs-register-task-definition-policy"
  description = "Allows the ecs:RegisterTaskDefinition"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "RegisterTaskDefinition",
        "Effect" : "Allow",
        "Action" : [
          "ecs:RegisterTaskDefinition"
        ],
        "Resource" : "*"
      },
      {
        "Sid" : "PassRolesInTaskDefinition",
        "Effect" : "Allow",
        "Action" : [
          "iam:PassRole"
        ],
        "Resource" : [
          "${aws_ecs_task_definition.maintenance-ecs-task-definition.arn}",
          "${aws_iam_role.ecsTaskExecutionRole.arn}",
          "${aws_iam_role.backend_role.arn}"

        ]
      },
      {
        "Sid" : "DeployService",
        "Effect" : "Allow",
        "Action" : [
          "ecs:UpdateService",
          "ecs:DescribeServices"
        ],
        "Resource" : [
          "${data.aws_ecs_service.maintenance_service.arn}"
        ]
      }
    ]
  })
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_policy_attachment" "ecs_register_task_definition" {
  name       = "ecs-register-task-definition-attachment"
  policy_arn = aws_iam_policy.ecs_register_task_definition.arn
  roles      = ["github"]
}

data "aws_iam_policy_document" "maintenance_secrets" {
  statement {
    effect    = "Allow"
    actions   = ["secretsmanager:GetSecretValue"]
    resources = [aws_secretsmanager_secret.env_var.arn]
  }
}
resource "aws_iam_policy" "maintenance_secrets_policy" {
  name        = "secrets-policy"
  description = "A policy for accessing the enviroment vairable for the maintenance project"
  policy      = data.aws_iam_policy_document.maintenance_secrets.json
}

resource "aws_iam_role_policy_attachment" "maintenance_secrets_policy_attachment" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = aws_iam_policy.maintenance_secrets_policy.arn
}
# Create IAM role for ECS backend service
data "aws_iam_policy_document" "backend_assume_role_policy" {
  statement {
    sid    = ""
    effect = "Allow"
    actions = [
      "sts:AssumeRole",
    ]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "backend_role" {
  name               = "backend-ecs-role"
  assume_role_policy = data.aws_iam_policy_document.backend_assume_role_policy.json
}
data "aws_iam_policy_document" "maintenance_backend_task_role" {
  statement {
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.maintenance.arn]
  }
  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject"
    ]
    resources = ["${aws_s3_bucket.maintenance.arn}/*"]
  }

  statement {
    effect    = "Allow"
    actions   = ["ses:*"]
    resources = ["*"]
  }
}
resource "aws_iam_policy" "maintenance_backend_task_policy" {
  name        = "backend-ecs-policy"
  description = "A policy for accessing the enviroment vairable for the maintenance project"
  policy      = data.aws_iam_policy_document.maintenance_backend_task_role.json
}

resource "aws_iam_role_policy_attachment" "maintenance_backend_task_policy_attachment" {
  role       = aws_iam_role.backend_role.name
  policy_arn = aws_iam_policy.maintenance_backend_task_policy.arn
}
