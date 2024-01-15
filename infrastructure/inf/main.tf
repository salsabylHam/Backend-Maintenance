provider "aws" {
  region = var.region
}
terraform {
  backend "s3" {
    bucket  = "backend-tfstates-tf"
    key     = "maintenance/terraform.tfstate"
    region  = "eu-west-3"
  }
}
module "oidc_github" {
  source = "unfunco/oidc-github/aws"

  github_repositories = [
    "datiumsas/maintenance"
  ]
  iam_role_name = "github"
}
