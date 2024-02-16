package Mysqlconnection

import (
	"database/sql"
	"fmt"
	"github.com/go-sql-driver/mysql"
	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	DbDriver *sql.DB
}

func NewDB() *DB {
	return &DB{}
}

func (db *DB) Start() {

	//database configurations
	config := mysql.Config{
		User:   "root",
		Passwd: "dbadmin",
		Net:    "tcp",
		Addr:   "100.67.232.84:3306",
		DBName: "financedbschema",
	}
	//open database driver
	myDB, err := sql.Open("mysql", config.FormatDSN())

	// establish connection with database
	// If the database connection fails
	if err != nil {
		panic(err)
	}

	db.DbDriver = myDB //update the driver variable
	err = db.DbDriver.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("successfully pinged db!")
	//close the connection
	//defer myDB.Close()
}
