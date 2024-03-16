package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"restApi/Forms"
	Mysqlconnection "restApi/Mysql_connection"
	"restApi/Users"
	"restApi/model"
)

// SignUp accepts user info and stores it in the database
func SignUp(context *gin.Context) {
	var user Users.User
	//obtain user struct from json object
	err := context.ShouldBindJSON(&user)
	//make sure request is valid
	if err != nil || user.Email == "" || user.Password == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to obtain request body"})
		return
	}
	//sign the user up using logic in the model package
	err = model.SignUserUp(user)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error:": "Unable to signup user"})
		return
	}

	//upon successful operation
	context.JSON(http.StatusOK, gin.H{"msg:": "user created successfully!"})

}

// GetAllUsers simply returns a list of all the users in the database.
func GetAllUsers(context *gin.Context) {
	//wrap all non-keywords in single quotes
	query := "SELECT * FROM financedbschema.userlogin"
	rows, err := Mysqlconnection.DbDriver.Query(query)
	//If there's an error obtaining the rows
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"err: ": "Unable to retrieve user data!"})
		return
	}
	//get a list of the users from the database query
	userList, err := model.UserSearch(rows)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"err: ": "Unable to parse user data!"})
		return
	}
	//return the list of users
	context.JSON(http.StatusOK, gin.H{"users": userList})

}

// Login Logs the user in if they exist and have the right password
func Login(context *gin.Context) {
	var user Users.User
	//obtain user information
	err := context.ShouldBindJSON(&user)
	//user sent bad request
	if err != nil || user.Email == "" || user.Password == "" {
		context.JSON(http.StatusBadRequest, gin.H{"err": "unable to parse input"})
		return
	}
	//ensure the passwords match
	err = model.AuthenticateUser(user)
	//if they don't match
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"err:": "Invalid login credentials"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"Success! logged in user:": user.Email})
}

// GetFormDetails queries the form info using the specified email. This is sent as an object
func GetFormDetails(context *gin.Context) {
	//obtain email
	email := context.Param("email")
	//bad request/no email
	if email == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to parse email"})
		return
	}
	//obtain the form data as a struct
	userFormData := model.GetFormData(email)
	//check if everything in the struct is populated
	if userFormData.FirstName == "" || userFormData.State == "" {
		context.JSON(http.StatusInternalServerError, gin.H{"error:": "Unable to retrieve user form info"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": userFormData})
}

// StoreUserFormDetails takes in an object of info and stores it in the database
func StoreUserFormDetails(context *gin.Context) {
	//create reference to forms struct and populate accordingly
	var form Forms.Forms
	err := context.ShouldBindJSON(&form)
	//bad request
	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusBadRequest, gin.H{"Error:": "unable to parse data"})
		return
	}
	//store the form in the database and handle possible error
	err = model.StoreForm(form)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"err:": "unable to store info "})
		return
	}

	context.JSON(http.StatusOK, gin.H{"Success": "Form data saved!"})

}
