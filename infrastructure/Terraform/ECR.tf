resource "aws_ecr_repository" "maintenance-image-repo" {
  name                 = "${var.app_name}-image-repo"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

}