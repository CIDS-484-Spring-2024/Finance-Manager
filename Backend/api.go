package main

import "C"
import (
	"fmt"
	"github.com/gin-gonic/gin"
	"restApi/Middleware"
	"restApi/routes"
)

func main() {
	const port = ":3200"
	engine := gin.Default() //pointer to gin.engine
	engine.Use(Middleware.CorsMiddleware())

	//db := Mysqlconnection.NewDB()
	//db.Start()
	//startDB()

	//functions to be called when endpoint is accessed
	engine.POST("/users/signup", routes.SignUp)
	engine.POST("users/login", routes.Login)
	engine.GET("/users/finance/:id", routes.GetUserDetails)

	err := engine.Run(port)

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
