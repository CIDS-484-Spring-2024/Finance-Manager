package model

import (
	"database/sql"
	"errors"
	"fmt"
	"restApi/Encryption"
	Mysqlconnection "restApi/Mysql_connection"
	"restApi/Users"
)

// UserSearch takes in rows and adds each one to a list
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

// SignUserUp takes in a user struct and enters their data into the database.
// For obvious reasons, their password is first encrypted.
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
	//encrypt their password
	hashedPassword, err := Encryption.HashPasswordWithSalt(user.Password)

	if err != nil {
		fmt.Println("issue with encryption")
		return err
	}
	//execute the query with the email and hashed password
	_, err = stmt.Exec(user.Email, hashedPassword)
	//this is valid, as "err" will be nil if everything goes as planned
	return err
}

// AuthenticateUser searches the database for the users password by matching their email.
// It then checks if the passwords match. If so, the user is successfully logged in.
func AuthenticateUser(user Users.User) error {
	//Get password
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
	//return status of password match
	if !Encryption.PasswordsMatch(user.Password, storedPswd) {
		return errors.New("Passwords don't match")
	}
	return nil
}
