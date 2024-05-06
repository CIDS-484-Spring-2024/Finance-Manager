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

	if err != nil || user.Email == "" || user.Password == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to obtain request body"})
		return
	}

	err = model.GetConnectionDetails()
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"err:": "Failure to get connection info"})
		return
	}

	err = model.SignUserUp(user)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error:": "Unable to signup user"})
		return
	}
	//format for the frontend to be able to parse the info correctly
	//Since the user is new, it's impossible that they completed the form.
	retStruct := Users.UserReturn{Email: user.Email, HasCompletedForm: 0}

	//upon successful operation
	context.JSON(http.StatusOK, gin.H{"data": retStruct})

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
	//TODO add logic to call database and check if user completed form

	if err != nil || user.Email == "" || user.Password == "" {
		context.JSON(http.StatusBadRequest, gin.H{"err": "unable to parse input"})
		return
	}

	err = model.GetConnectionDetails()
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"err:": "Failure to get connection info"})
		return
	}

	err = model.AuthenticateUser(user)

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"err:": "Invalid login credentials"})
		return
	}
	//check if the user completed the form
	formStatus := model.HasCompletedForm(user.Email)
	//return as a struct so it can easily be converted to a JSON object
	retStruct := Users.UserReturn{Email: user.Email, HasCompletedForm: formStatus}

	context.JSON(http.StatusOK, gin.H{"data": retStruct})
}
