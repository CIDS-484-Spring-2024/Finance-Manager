package Users

type User struct {
	Email            string
	Password         string
	HasCompletedForm int
}

type UserReturn struct {
	Email            string
	HasCompletedForm int
}
