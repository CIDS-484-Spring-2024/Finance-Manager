package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	Mysqlconnection "restApi/Mysql_connection"
	"restApi/Users"
	"restApi/model"
)

func SignUp(context *gin.Context) {
	var user Users.User
	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to obtain request body"})
		return
	}

	query := "INSERT INTO `financedbschema`.`userdata` (`FirstName`, `LastName`, `userID`, `email`, `maritalStatus`) VALUES ('Hugh', 'Jackman', '1', 'GoVikes', 'Single')"
	_, err = Mysqlconnection.DbDriver.Exec(query)

	if err != nil {
		fmt.Println("Bro: ", err)
		context.JSON(http.StatusInternalServerError, gin.H{"error:": "Unable to save data!"})
		return
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
