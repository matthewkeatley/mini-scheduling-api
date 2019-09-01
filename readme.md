
# Mini Scheduling API
A mini RESTful API with the intention of creating employees in a database and scheduling work shifts for them.

## Note 
All times are in UTC for simplicity's sake

## Installation
*  Clone repo
*  `cd` into _root_ dir
*  `npm i` to get necessary packages
*  Ensure you have MySQL (version 8+) installed.  
	*  For Macs, you can run `brew install mysql`
*  Run `mysql.server start` to start up the database
*  Build the databse schema and example data
	* If you **DO NOT** have any previous installs of mysql:
		* run `mysql -u root < sql/run.sql`
	* If you **DO** have mysql previously set up:
		* run `mysql -u root -p < sql/run.sql` and enter your _root_ password.
	* If you are having password issues, please refer to [this article](https://medium.com/@benmorel/remove-the-mysql-root-password-ba3fcbe29870)
*  run `npm run start` to start the application
*  you can hit the api at `localhost:5000/api/v1`

## Endpoints
There is currently an example `user` in the databse (`id = 1`) and an example `shift` (`id=1`)

### Users:
#### Users Object:
```
{
   "id": 445
   "firstName": "John",
   "lastName": "Doe",
   "email": "john.doe@johndoe.com"
   "phone": "123-456-7890",
   "isManager": true,  
   "contactMethod": "phone"
}
```

#### Users Endpoints:
```
GET /api/v1/users
GET /api/v1/users/:id
POST /api/v1/users
PUT /api/v1/users/:id
DELETE /api/v1/users/:id
```

### Shifts:
* You can only `GET` or `POST` to shifts by specifying the userID in the URL
* You cannot `POST` or `PUT` a shift that conflicts with an existing shift!

#### Shifts Object:
```
{
	"id": 3,
	"user": 4, // id of user
	"startTime": "09-01-2019 08:00:00",
	"endTime": "09-01-2019 13:00:00"
}
```

#### Shifts Endpoints:
```
GET /api/v1/shifts/user/:userID
GET /api/v1/shifts/:id
POST /api/v1/shifts/user/:userID
PUT /api/v1/shifts/:id
DELETE /api/v1/shifts/:id
```
