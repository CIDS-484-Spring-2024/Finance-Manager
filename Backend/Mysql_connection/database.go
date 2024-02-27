package Mysqlconnection

import (
	"database/sql"
	"fmt"
	"github.com/go-sql-driver/mysql"
	_ "github.com/go-sql-driver/mysql"
)

var DbDriver *sql.DB

func Start() {

	//database configurations
	config := mysql.Config{
		User:                 "root",
		Passwd:               "roottest",
		Net:                  "tcp",
		Addr:                 "127.0.0.1:3306",
		DBName:               "financedbschema",
		AllowNativePasswords: true,
	}
	//open database driver
	var err error
	DbDriver, err = sql.Open("mysql", config.FormatDSN())

	// establish connection with database
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
	//close the connection
	//defer myDB.Close()
}
