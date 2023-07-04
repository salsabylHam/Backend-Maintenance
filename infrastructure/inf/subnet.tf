module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = var.vpc_name
  cidr = var.vpc_cidr

  azs             = data.aws_availability_zones.available_zones.names
  public_subnets   = [for k, v in data.aws_availability_zones.available_zones.names : cidrsubnet(var.vpc_cidr, 8, k)]
  private_subnets  = [for k, v in data.aws_availability_zones.available_zones.names : cidrsubnet(var.vpc_cidr, 8, k + 3)]
  database_subnets = [for k, v in data.aws_availability_zones.available_zones.names : cidrsubnet(var.vpc_cidr, 8, k + 6)]
  create_database_subnet_group = true

  enable_nat_gateway = true
  single_nat_gateway = true
}

data "aws_availability_zones" "available_zones" {
  state = "available"
}