provider "aws" {
  region = var.region
}
module "oidc_github" {
  source  = "unfunco/oidc-github/aws"
  version = "1.3.1"

  github_repositories = [
    "datiumsas/maintenance-api"
  ]
  iam_role_name = "github"
}