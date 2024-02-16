package model

import (
	"database/sql"
	"restApi/Users"
)

func UserSearch(rows *sql.Rows) ([]Users.User, error) {
	var userSearchList []Users.User
	for rows.Next() {
		var user Users.User //reference to data at current row returned
		err := rows.Scan(&user.Email, &user.Password, &user.Salt)
		if err != nil {
			return nil, err
		}
		userSearchList = append(userSearchList, user)
	}
	return userSearchList, nil
}
