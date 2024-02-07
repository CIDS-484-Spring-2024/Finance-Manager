package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"restApi/Mysql_connection"
	"restApi/routes"
)

func main() {
	const port = ":3200"
	engine := gin.Default() //pointer to gin.engine
	startDB()

	//functions to be called when endpoint is accessed
	engine.POST("/users/signup", routes.SignUp)
	engine.GET("/users/finance/:id", routes.GetUserDetails)

	err := engine.Run(port)

	if err != nil {
		panic("Cannot start backend: ")
	}

	fmt.Println("server started and connected to backend!")

}

func startDB() {
	db := Mysqlconnection.NewDB()
	err := db.Start()
	if err != nil {
		panic("error connecting to colton's db")
	}
}
