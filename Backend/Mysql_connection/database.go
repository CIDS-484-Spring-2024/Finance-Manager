package Mysqlconnection

import (
	"database/sql"
	"fmt"
	"github.com/go-sql-driver/mysql"
	_ "github.com/go-sql-driver/mysql"
)

// DbDriver is a variable that's used to access the DB calls
var DbDriver *sql.DB

// Start initiates a connection to the database
func Start() {

	//database configurations
	config := mysql.Config{
		User:                 "frandy",
		Passwd:               "rfaudir8",
		Net:                  "tcp",
		Addr:                 "100.115.207.149",
		DBName:               "financedbschema",
		AllowNativePasswords: true,
	}
	//open database driver
	var err error
	DbDriver, err = sql.Open("mysql", config.FormatDSN())

	// If the database connection fails
	if err != nil {
		panic(err)
	}

	//Confirm connection via ping
	err = DbDriver.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("successfully pinged db!")

}
