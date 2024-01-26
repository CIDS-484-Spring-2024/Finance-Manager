package main

import (
	"github.com/gin-gonic/gin"
	"restApi/routes"
)

func main() {
	engine := gin.Default() //pointer to gin.engine

	//functions to be called when endpoint is accessed
	engine.POST("/users/signup", routes.SignUp)
	engine.GET("/users/finance/:id", routes.GetUserDetails)

}
