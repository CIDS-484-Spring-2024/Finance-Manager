package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"restApi/Forms"
	"restApi/model"
)

func GetFormDetails(context *gin.Context) {
	email := context.Param("email")

	if email == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error:": "Unable to parse email"})
		return
	}
	userFormData := model.GetFormData(email)

	if userFormData.FirstName == "" || userFormData.State == "" {
		context.JSON(http.StatusInternalServerError, gin.H{"error:": "Unable to retrieve user form info"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": userFormData})
}

func StoreUserFormDetails(context *gin.Context) {
	//create reference to forms struct and populate accordingly
	var form Forms.Forms
	err := context.ShouldBindJSON(&form)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusBadRequest, gin.H{"Error:": "unable to parse data"})
		return
	}

	err = model.StoreForm(form)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"err:": "unable to store info "})
		return
	}

	context.JSON(http.StatusOK, gin.H{"Success": "Form data saved!"})

}
