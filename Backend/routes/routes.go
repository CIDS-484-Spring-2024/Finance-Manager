package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	Mysqlconnection "restApi/Mysql_connection"
	"restApi/Users"
	"restApi/model"
)

func SignUp(context *gin.Context) {
	var user Users.User
	err := context.ShouldBindJSON(&user)
	user.Salt = 10 //salt that represents hashing algorithm

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to obtain request body"})
		return
	}

	err = model.SignUserUp(user)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error:": "Unable to signup user"})
	}

	//upon successful operation
	context.JSON(http.StatusOK, gin.H{"msg:": "user created successfuly!"})

}

func GetAllUsers(context *gin.Context) {
	//wrap all non-keywords in single quotes
	query := "SELECT * FROM 'financedbschema'.'userlogin'"
	rows, err := Mysqlconnection.DbDriver.Query(query)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"err: ": "Unable to retrieve user data!"})
		return
	}

	userList, err := model.UserSearch(rows)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"err: ": "Unable to parse user data!"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"users": userList})

}

func Login(context *gin.Context) {
	var user Users.User
	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"err": "unable to parse input"})
		return
	}

	err = model.AuthenticateUser(user)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"err:": "Invalid login credentials"})
		return
	}

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
