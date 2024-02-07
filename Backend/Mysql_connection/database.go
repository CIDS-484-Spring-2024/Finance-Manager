package Mysqlconnection

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	DbDriver *sql.DB
	test     string
}

func NewDB() *DB {
	return &DB{}
}

func (db *DB) Start() error {

	// establish connection with database
	dbPtr, err := sql.Open("mysql", "goapi:go@tcp(127.0.0.1:3306)/financedbschema")

	// If the database connection fails
	if err != nil {
		return err
	}

	db.DbDriver = dbPtr //update the driver variable
	//close the connection
	defer dbPtr.Close()
	return nil
}
