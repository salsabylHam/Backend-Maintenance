#ECR
resource "aws_ecr_repository_policy" "maintenance-image-repo-policy" {
  repository = aws_ecr_repository.maintenance-image-repo.name
  policy = jsonencode({

    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "adds full ecr access to the model convertor repository",
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
          "${aws_iam_role.ecsTaskExecutionRole.arn}"
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
          "${data.aws_ecs_service.model_convertor_service.arn}"
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

data "aws_iam_policy_document" "secrets" {  
   statement {
    effect = "Allow"
    actions   = ["secretsmanager:GetSecretValue"]
    resources = [aws_secretsmanager_secret.env_vars.arn, aws_secretsmanager_secret.sit_vars.arn]
  }
}

resource "aws_iam_policy" "github_secrets_access" {
  name        = "allowOICDAccessToSecrets"
  description = "Allow github container access the needed secrets"
  policy = data.aws_iam_policy_document.secrets.json
}


resource "aws_iam_policy_attachment" "github_secrets_access" {
  name       = "github-secrets-access"
  policy_arn = aws_iam_policy.github_secrets_access.arn
  roles      = ["github"]
}