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

	//return response
}
