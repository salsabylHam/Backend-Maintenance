module "db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "${var.app_name}-db"

  engine               = "mysql"
  engine_version       = "8.0"
  family               = "mysql8.0"
  major_engine_version = "8.0"
  instance_class       = "db.t2.small"
  manage_master_user_password = false
  allocated_storage     = 20
  max_allocated_storage = 100

  db_name  = var.env_var.DB_NAME
  password = var.env_var.DB_PASSWORD
  username = var.env_var.DB_USERNAME

  db_subnet_group_name   = module.vpc.database_subnet_group
  vpc_security_group_ids = [module.security_group.security_group_id]

}
module "security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.0"

  name        = "${var.app_name}-db-access-sg"
  description = "Complete MySQL example security group"
  vpc_id      = module.vpc.vpc_id

  # ingress
  ingress_with_cidr_blocks = [
    {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      description = "MySQL access from within VPC"
      cidr_blocks = module.vpc.vpc_cidr_block
    },
  ]

}
