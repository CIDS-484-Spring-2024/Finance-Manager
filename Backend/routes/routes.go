package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func SignUp(context *gin.Context) {
	var user string
	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to obtain request body"})
	}
	//add data to database
	//upon successful operation
	context.JSON(http.StatusOK, gin.H{"msg:": "user created successfuly!"})

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
