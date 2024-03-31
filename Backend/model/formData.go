package model

import (
	"fmt"
	"restApi/Forms"
	Mysqlconnection "restApi/Mysql_connection"
)

func StoreForm(form Forms.Forms) error {
	//obtain stored procedure and enter into db, note there are two tables
	query := "CALL inputUserData(?,?,?,?)"
	stmt, err := Mysqlconnection.DbDriver.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(form.Email, form.FirstName, form.LastName, form.Maritalstatus, form.State)

	if err != nil {
		return err
	}
	//prepare user financial data
	query = "CALL inputFinanceData(?,?,?,?,?,?,?)"
	stmt, err = Mysqlconnection.DbDriver.Prepare(query)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(form.Email, form.Year, form.AME, form.AGI, form.Dependents, form.NumDependents, form.FinGoal)

	return err //return final status
}

func GetFormData(email string) Forms.Forms {
	//return struct
	var userForm Forms.Forms
	userForm.Email = email
	//query to obtain string using stored procedure
	query := "CALL getFinanceData(?)"
	row := Mysqlconnection.DbDriver.QueryRow(query, email)

	err := row.Scan(&userForm.Year, &userForm.AME, &userForm.AGI, &userForm.Dependents, &userForm.NumDependents, &userForm.FinGoal)
	if err != nil {
		fmt.Println("problem scanning finance data rows!")
		return Forms.Forms{}
	}
	//Now we need to obtain the firstname, lastname, and filing status
	query = "CALL getUserInfo(?)"
	row = Mysqlconnection.DbDriver.QueryRow(query, email)

	err = row.Scan(&userForm.FirstName, &userForm.LastName, &userForm.Maritalstatus, &userForm.State)
	if err != nil {
		fmt.Println("problem scanning personal data rows!")
		return Forms.Forms{}
	}
	return userForm
}
