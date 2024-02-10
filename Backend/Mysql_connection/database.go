package Mysqlconnection

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	DbDriver *sql.DB
}

func NewDB() *DB {
	return &DB{}
}

func (db *DB) Start() {

	// establish connection with database                     goapi if root doesn't work
	dbPtr, err := sql.Open("mysql", "root:go@tcp(10.201.77.238:3306)/financedbschema")
	// If the database connection fails
	if err != nil {
		panic(err)
	}

	db.DbDriver = dbPtr //update the driver variable
	err = db.DbDriver.Ping()
	fmt.Println("after ping: ", err)
	//close the connection
	defer dbPtr.Close()
}
