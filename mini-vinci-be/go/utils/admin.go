package utils

func IsAdminUser(email string) bool {
	emails := []string{
		"ozn.akn@gmail.com",
		"mrgllemre@gmail.com",
		"alpkeles99@gmail.com",
	}

	for _, e := range emails {
		if e == email {
			return true
		}
	}

	return false
}
