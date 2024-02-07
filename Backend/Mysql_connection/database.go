package Mysql_connection

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	DbDriver *sql.DB
}

func (db *DB) StartDB() {

	// establish connection with database
	dbPtr, err := sql.Open("mysql", "username:password@tcp(127.0.0.1:3306)/test")

	// If the database connection fails
	if err != nil {
		panic(err)
	}

	db.DbDriver = dbPtr

	//close the connection
	defer dbPtr.Close()
}
