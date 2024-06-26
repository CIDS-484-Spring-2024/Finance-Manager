# Finance-Manager

# Authors
 Randy Franzmeier and Colton Williams

 With Financial Advisory Help From John Fritzke

# Overview
 This application will take in user financial information, and display results based off of their needs.
 Ideally, the user will login or create an account, be able to manage their finances, and even recieve tips.

# Tech stack
 * Frontend: Angular
 * Backend: Go
 * Database: MySQL and Azure

# Setup Instructions
## Make sure Go, Node.js, and Angular CLI are installed
1. Navigate to the Backend folder and type "go run ."
2. This should then start the backend and connect to
   the database, we eventually plan on using Azure.
3. Navigate to Frontend/finance_manager, and type
   "ng serve --open"

# Project Reports:

# Current Progress as of 3/29/24
* Randy and Colton figured out how to store the form in the database
* Randy and Colton made working REST API's to store and get the form data
* Randy figured out how to style and insert data into a doughnut chart using Chart.js
* Randy implemented styling for the users finance graph/ projections page
* Colton created stored procedure for obtaining the finance data
* Colton set up the SQL database in Azure

# Current Progress as of 3/9/24
* Randy and Colton fixed the user form for the frontend with validation
* Randy created the post request to store form data in the database
* Randy filled out and styled the about us page from John's writing
* Colton created stored procedures and tables to hold form information
* Colton helped write logic for the user form POST API endpoint
* Colton created a backup for the database with an email account, as well
  as management through Percona.

# Current Progress as of 2/28/2024
* Randy enabled user login and signup through Angular components
* Randy and Colton enhanced authentication throughout the full stack
* Colton created stored procedures for use on the database and API
* Colton also enabled SSL on the database and increased security

# Current Progress as of 2/19/2024
*  Colton completed performance and logging updates in the database
*  Colton also updated the database to be more flexible with data and security
*  Randy styled the login, signup, account, and landing page while implementing routes
*  Randy also created rest api's that encrypt data and send and query data form the db
*  We both worked with the database to fix the api so the user can sign up and login successfully


# Current Progress as of 2/7/2024
*  So far Randy has completed a lot of the applications code and we are now onto the development of the network side of the program.
*  Randy has been working on setting up the application to be able to connect to the database in order to run queries and procedures.
*  Colton constructed and has been running the MySQL Database on a Local Server successfully connecting between 2 machines.
*  Colton has constructed a final procedural setup for easier input of data and is working on writing queries for the application to run when connected to the database.
*  Colton has worked on more security features and is focusing on a salt-hash password encrytion system in order to follow modern security standards for database and web development.
*  The two of them have decided on the finalized features and are now working on implementing them together in order for it to properly work. User account creation and data storage will be next after networking is successful.

# Current Progress as of 1-27-24
*  So far, we have decided on our technology stack, planned and researched tools, designed a boiler plate UI, and created a basic backend, frontend, and sqlite db template. We plan on adding Azure when the project is more developed.
*  Randy got the front and backend set up.
*  Colton constructed a plan for the database and some sample queries to run.
*  We both worked on the UI and DB design.




