
# Mini Scheduling API
A mini RESTful API with the intention of creating employees in a database and scheduling work shifts for them.

## Note 
All times are in UTC for simplicity's sake

## Installation
*  Clone repo
*  `cd` into root dir
*  `npm i` to get necessary packages
*  Ensure you have MySQL (version 8+) installed.  
	*  For Macs, you can run `brew install mysql`
*  Run `mysql.server start` to start up the database
*  Run `mysql -u root < sql/run.sql` which will build the database schema and insert some test data 
	*  If it asks for a root password, it should be `password`
	*  If you want to access the databse directly the user is `scheduling` and the password is `pw`
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
