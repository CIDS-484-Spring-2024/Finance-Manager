package model

import (
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
	_, err = stmt.Exec(form.Email, form.FirstName, form.LastName, form.Maritalstatus)

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
