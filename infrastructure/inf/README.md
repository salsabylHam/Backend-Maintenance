<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 4.67.0 |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_oidc_github"></a> [oidc\_github](#module\_oidc\_github) | unfunco/oidc-github/aws | 1.3.1 |
| <a name="module_vpc"></a> [vpc](#module\_vpc) | terraform-aws-modules/vpc/aws | n/a |

## Resources

| Name | Type |
|------|------|
| [aws_appautoscaling_policy.cpu_scaling](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appautoscaling_policy) | resource |
| [aws_appautoscaling_target.ecs_target](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appautoscaling_target) | resource |
| [aws_cloudwatch_log_group.maintenance](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group) | resource |
| [aws_ecr_repository.maintenance-image-repo](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_repository) | resource |
| [aws_ecr_repository_policy.maintenance-image-repo-policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_repository_policy) | resource |
| [aws_ecs_cluster.maintenance-ecs-cluster](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_cluster) | resource |
| [aws_ecs_service.model_convertor_service](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service) | resource |
| [aws_ecs_task_definition.maintenance-ecs-task-definition](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_task_definition) | resource |
| [aws_iam_policy.ecs_register_task_definition](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy) | resource |
| [aws_iam_policy.github_secrets_access](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy) | resource |
| [aws_iam_policy_attachment.ecs_register_task_definition](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy_attachment) | resource |
| [aws_iam_policy_attachment.github_secrets_access](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy_attachment) | resource |
| [aws_iam_role.ecsTaskExecutionRole](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role_policy_attachment.ecsTaskExecutionRole_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_lb.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb) | resource |
| [aws_lb_listener.maintenance](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener) | resource |
| [aws_lb_target_group.maintenance](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group) | resource |
| [aws_secretsmanager_secret.env_vars](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret) | resource |
| [aws_secretsmanager_secret.sit_vars](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret) | resource |
| [aws_secretsmanager_secret_version.env_vars](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret_version) | resource |
| [aws_secretsmanager_secret_version.sit_vars](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret_version) | resource |
| [aws_security_group.lb](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group) | resource |
| [aws_security_group.maintenance_task](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group) | resource |
| [aws_availability_zones.available_zones](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/availability_zones) | data source |
| [aws_ecs_service.model_convertor_service](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ecs_service) | data source |
| [aws_iam_policy_document.assume_role_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |
| [aws_iam_policy_document.secrets](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_account_id"></a> [account\_id](#input\_account\_id) | The AWS account ID. | `number` | n/a | yes |
| <a name="input_app_healthcheck_path"></a> [app\_healthcheck\_path](#input\_app\_healthcheck\_path) | the health check path for the application | `string` | `"/api/v1"` | no |
| <a name="input_app_name"></a> [app\_name](#input\_app\_name) | The Application name | `string` | `"maintenance"` | no |
| <a name="input_app_port"></a> [app\_port](#input\_app\_port) | The Application port | `number` | `4000` | no |
| <a name="input_autoscaling_policy_name"></a> [autoscaling\_policy\_name](#input\_autoscaling\_policy\_name) | the name for the autpscaling policy responsible for scaling the ecs containers | `string` | `"cpu_scaling"` | no |
| <a name="input_env_key"></a> [env\_key](#input\_env\_key) | n/a | `string` | `".env"` | no |
| <a name="input_env_source"></a> [env\_source](#input\_env\_source) | n/a | `string` | `"../../.env"` | no |
| <a name="input_env_var_name"></a> [env\_var\_name](#input\_env\_var\_name) | the name of the env variables | `string` | `"model-converter-envs"` | no |
| <a name="input_lb_tg_protocol"></a> [lb\_tg\_protocol](#input\_lb\_tg\_protocol) | n/a | `string` | `"HTTP"` | no |
| <a name="input_max_task_count"></a> [max\_task\_count](#input\_max\_task\_count) | Max number of tasks | `number` | `3` | no |
| <a name="input_min_task_count"></a> [min\_task\_count](#input\_min\_task\_count) | Min number of tasks | `number` | `1` | no |
| <a name="input_region"></a> [region](#input\_region) | The AWS region to use. | `string` | n/a | yes |
| <a name="input_sit_cred_key"></a> [sit\_cred\_key](#input\_sit\_cred\_key) | n/a | `string` | `"sit-key.json"` | no |
| <a name="input_sit_cred_source"></a> [sit\_cred\_source](#input\_sit\_cred\_source) | n/a | `string` | `"../../credentials/sit-key.json"` | no |
| <a name="input_sit_keys_name"></a> [sit\_keys\_name](#input\_sit\_keys\_name) | the name of the env variables | `string` | `"model-converter-secrets"` | no |
| <a name="input_vpc_cidr"></a> [vpc\_cidr](#input\_vpc\_cidr) | the CIDR for VPC | `string` | `"10.32.0.0/16"` | no |
| <a name="input_vpc_name"></a> [vpc\_name](#input\_vpc\_name) | Name for the VPC | `string` | `"my-vpc"` | no |
| <a name="input_vpc_private_subnets"></a> [vpc\_private\_subnets](#input\_vpc\_private\_subnets) | the list private subnets generated by the vpc module | `list` | <pre>[<br>  "10.32.2.0/24",<br>  "10.32.3.0/24"<br>]</pre> | no |
| <a name="input_vpc_public_subnets"></a> [vpc\_public\_subnets](#input\_vpc\_public\_subnets) | the list private subnets generated by the vpc module | `list` | <pre>[<br>  "10.32.0.0/24",<br>  "10.32.1.0/24"<br>]</pre> | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_load_balancer_ip"></a> [load\_balancer\_ip](#output\_load\_balancer\_ip) | n/a |
<!-- END_TF_DOCS -->