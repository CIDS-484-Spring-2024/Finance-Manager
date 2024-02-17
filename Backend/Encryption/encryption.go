package Encryption

import (
	"golang.org/x/crypto/bcrypt"
)

// HashPasswordWithSalt Guessing the correct password at a rate of 1 guess per second
// would take, on average, 57 trillion years with this algorithm
func HashPasswordWithSalt(password string) (string, error) {
	//password must be converted to a byte array
	passwordByte := []byte(password)
	//this hashing algorithm uses 2^10 hashes, so there's no need to generate salt as well.
	hashedPassword, err := bcrypt.GenerateFromPassword(passwordByte, bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func PasswordsMatch(password, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
