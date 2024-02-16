package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type User struct {
	email    string
	password string
}

func SignUp(context *gin.Context) {
	err := context.ShouldBindJSON()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to obtain request body"})
	}
	//add data to database
	//upon successful operation
	context.JSON(http.StatusOK, gin.H{"msg:": "user created successfuly!"})

}

func Login(context *gin.Context) {
	var credentials string
	err := context.ShouldBindJSON(&credentials)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"err": "unable to parse input"})
	}

	//retrieve expected data
	//assert email is as expected
	//is password is also valid, send success
	context.JSON(http.StatusOK, gin.H{"msg": "Successfully logged in!"})
}

func GetUserDetails(context *gin.Context) {
	userId := context.Param("id")

	if userId == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to parse userID"})
	}
	//check if user is valid
	//call database to retrieve information
	//upon successful retrieval
	context.JSON(http.StatusOK, gin.H{"content:": "data will go here"})
}
