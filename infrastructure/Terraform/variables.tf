variable "region" {
  description = "The AWS region to use."
  type = string
}
variable "account_id" {
  description = "The AWS account ID."
  type = number
}
variable "app_port" {
  description = "The Application port"
  default     = 4000
  type = number
}
variable "app_name" {
  description = "The Application name"
  default     = "maintenance"
  type = string
}
variable "env_key" {
  default = ".env"
  type = string
}
variable "env_source" {
  default = "../../.env"
  type = string
}
variable "sit_cred_key" {
  default = "sit-key.json"
  type = string
}

variable "sit_cred_source" {
  default = "../../credentials/sit-key.json"
  type = string
}

variable "min_task_count" {
  description = "Min number of tasks"
  default     = 1
  type = number
}
variable "max_task_count" {
  description = "Max number of tasks"
  default     = 3
  type = number
}

variable "vpc_name" {
  description = "Name for the VPC"
  default = "my-vpc"
  type = string
}
variable "vpc_cidr" {
  description = "the CIDR for VPC"
  default     = "10.32.0.0/16"
  type = string
}

variable "vpc_private_subnets" {
  description = "the list private subnets generated by the vpc module"
  default     = ["10.32.2.0/24", "10.32.3.0/24"]
}
variable "vpc_public_subnets" {
  description = "the list private subnets generated by the vpc module"
  default     = ["10.32.0.0/24", "10.32.1.0/24"]
}
variable "autoscaling_policy_name" {
  description = "the name for the autpscaling policy responsible for scaling the ecs containers"
  default     = "cpu_scaling"
  type = string
}
variable "app_healthcheck_path" {
  description = "the health check path for the application"
  default     = "/api/v1"
  type = string
}
variable "lb_tg_protocol" {
  default = "HTTP"
  type = string
}

variable "env_var_name" {
  description = "the name of the env variables"
  type = string 
  default ="maintenances-envs"
}
variable "sit_keys_name" {
  description = "the name of the env variables"
  type = string 
  default ="maintenance-secrets"
}