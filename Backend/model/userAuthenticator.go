package model

import (
	"database/sql"
	"errors"
	"fmt"
	"restApi/Encryption"
	Mysqlconnection "restApi/Mysql_connection"
	"restApi/Users"
)

func UserSearch(rows *sql.Rows) ([]Users.User, error) {
	var userSearchList []Users.User
	for rows.Next() {
		var user Users.User //reference to data at current row returned
		err := rows.Scan(&user.Email, &user.Password)
		if err != nil {
			return nil, err
		}
		userSearchList = append(userSearchList, user)
	}
	return userSearchList, nil
}

func GetConnectionDetails() error {
	query := "CALL financedbschema.onUserConnection(); "
	stmt, err := Mysqlconnection.DbDriver.Prepare(query)

	if err != nil {
		fmt.Println("issue getting connection info")
		return err
	}

	_, err = stmt.Exec()
	fmt.Println("execution status: ")
	return err
}

func SignUserUp(user Users.User) error {
	//Prepare the query first to prevent a sql injection attack
	//query := "INSERT INTO `financedbschema`.`userlogin` ('email', 'passwordHash') VALUES ('?', '?')"
	//query := "INSERT INTO  financedbschema.userlogin (email, passwordHash) VALUES (?,?)"
	query := "CALL signUpUserProc(?,?);" //use procedure to protect database structure

	stmt, err := Mysqlconnection.DbDriver.Prepare(query)

	if err != nil {
		fmt.Println("issue with preparation!")
		return err
	}

	hashedPassword, err := Encryption.HashPasswordWithSalt(user.Password)

	if err != nil {
		fmt.Println("issue with encryption")
		return err
	}

	_, err = stmt.Exec(user.Email, hashedPassword)
	fmt.Println("execution status: ", err)
	//this is valid, as it will be nil if everything goes as planned
	return err
}

func AuthenticateUser(user Users.User) error {
	//search the database for the users password by matching their email
	query := "CALL authUser(?)"
	//initiate search
	row := Mysqlconnection.DbDriver.QueryRow(query, user.Email)
	//store the encrypted password
	var storedPswd string
	err := row.Scan(&storedPswd)
	//if there's an error accessing the password
	if err != nil {
		return errors.New("unable to retrieve stored password")
	}

	if !Encryption.PasswordsMatch(user.Password, storedPswd) {
		return errors.New("Passwords don't match")
	}
	return nil
}

// Function used to check if the user filled out a form
func HasCompletedForm(email string) int {
	var formStatus int
	//search the status of the form completion
	query := "CALL getFormStatus(?)"
	row := Mysqlconnection.DbDriver.QueryRow(query, email)

	err := row.Scan(&formStatus)

	//return 0 because data cannot be queried
	if err != nil {
		return 0
	}
	return formStatus

}
