package user

type CreateUserParams struct {
	Email    string `json:"email" binding:"required,email"`
	TeamName string `json:"team_name" binding:"required,min=3,max=60"`
	Password string `json:"password" binding:"required,min=6,max=100"`
}

type VerificateUserParams struct {
	VerificationToken string `json:"verification_token" uri:"verification_token" binding:"required"`
}

type ResendVerificationEmailParams struct {
	Email string `json:"email" binding:"required,email"`
}

type SendRenewPasswordEmailParams struct {
	Email string `json:"email" binding:"required,email"`
}

type RenewPasswordParams struct {
	RenewPasswordToken string `json:"renew_password_token" binding:"required"`
	Password           string `json:"password" binding:"required,min=6,max=100"`
}
