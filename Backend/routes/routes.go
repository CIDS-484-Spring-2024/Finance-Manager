package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"restApi/Forms"
	Mysqlconnection "restApi/Mysql_connection"
	"restApi/Users"
	"restApi/model"
)

func SignUp(context *gin.Context) {
	var user Users.User
	err := context.ShouldBindJSON(&user)

	if err != nil || user.Email == "" || user.Password == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to obtain request body"})
		return
	}

	err = model.SignUserUp(user)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error:": "Unable to signup user"})
		return
	}

	//upon successful operation
	context.JSON(http.StatusOK, gin.H{"msg:": "user created successfully!"})

}

func GetAllUsers(context *gin.Context) {
	//wrap all non-keywords in single quotes
	query := "SELECT * FROM financedbschema.userlogin"
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

	if err != nil || user.Email == "" || user.Password == "" {
		context.JSON(http.StatusBadRequest, gin.H{"err": "unable to parse input"})
		return
	}

	err = model.AuthenticateUser(user)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"err:": "Invalid login credentials"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"Success! logged in user:": user.Email})
}

func GetUserDetails(context *gin.Context) {
	userId := context.Param("id")

	if userId == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to parse userID"})
		return
	}
	//check if user is valid
	//call database to retrieve information
	//upon successful retrieval
	context.JSON(http.StatusOK, gin.H{"content:": "data will go here"})
}

func StoreUserFormDetails(context *gin.Context) {
	//create reference to forms struct and populate accordingly
	var form Forms.Forms
	err := context.ShouldBindJSON(&form)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"Error:": "unable to parse data"})
		return
	}

	err = model.StoreForm(form)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"err:": "unable to store info "})
		return
	}

	context.JSON(http.StatusOK, gin.H{"Success": "Form data saved!"})

}
