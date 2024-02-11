package Middleware

import "github.com/gin-gonic/gin"

func CorsMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		//set the correct headers, so they don't get blocked by CORS
		context.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		context.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		context.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		context.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		//avoid allowing options as this could cause unexpected behavior
		if context.Request.Method == "OPTIONS" {
			context.AbortWithStatus(204)
			return
		}

		context.Next()
	}
}
