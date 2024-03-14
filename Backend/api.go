package main

import (
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

	//user group endpoints
	users := engine.Group("/users")
	{
		users.POST("/signup", routes.SignUp)
		users.POST("/login", routes.Login)
		users.GET("/details", routes.GetAllUsers)
	}
	//form group endpoints
	form := engine.Group("/form")
	{
		form.GET("/getForm/:email", routes.GetFormDetails)
		form.POST("/postDetails", routes.StoreUserFormDetails)
	}

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
