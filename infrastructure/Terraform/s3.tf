resource "aws_secretsmanager_secret" "env_vars" {
  name                    = "${var.env_var_name}"
  description             = "environment variables"
  recovery_window_in_days = 0
}
resource "aws_secretsmanager_secret_version" "env_vars" {
  secret_id     = aws_secretsmanager_secret.env_vars.id
  secret_string = filebase64(var.env_source)
}

resource "aws_secretsmanager_secret" "sit_vars" {
  name                    = "${var.sit_keys_name}"
  description             = "sit keys"
  recovery_window_in_days = 0
}
resource "aws_secretsmanager_secret_version" "sit_vars" {
  secret_id     = aws_secretsmanager_secret.sit_vars.id
  secret_string = filebase64(var.sit_cred_source)
}