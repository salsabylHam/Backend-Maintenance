
resource "aws_ses_email_identity" "maintenance" {
  email = var.email
}

# resource "aws_ses_email_identity_smtp_credentials" "maintenance" {
#   email_identity = aws_ses_email_identity.maintenance.email
#   username       = var.email
#   password       = var.email_password
# }
