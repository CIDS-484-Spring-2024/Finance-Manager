package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"restApi/Middleware"
	Mysqlconnection "restApi/Mysql_connection"
	"restApi/routes"
)

func main() {

	const port = ":3200"
	//pointer to gin.engine
	engine := gin.Default()
	//middleware that enables frontend to access backend as it's on a different server
	engine.Use(Middleware.CorsMiddleware())
	//start database connection
	Mysqlconnection.Start()

	//functions to be called when endpoint is accessed
	engine.POST("/users/signup", routes.SignUp)
	engine.POST("/users/login", routes.Login)
	engine.GET("/users/details", routes.GetAllUsers)
	engine.GET("/users/finance/:id", routes.GetUserDetails)
	//start server
	err := engine.Run(port)
	//if server cannot start
	if err != nil {
		panic("Cannot start backend: ")
	}

	fmt.Println("server started!")

}

//
//func startDB() {
//	db := Mysqlconnection.NewDB()
//	err := db.Start()
//	if err != nil {
//		panic("error connecting to colton's db")
//	}
//}
