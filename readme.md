
# Mini Scheduling API
Hello! This is a mini RESTful API coding challenge, with the intention of creating employees in a database and scheduling work shifts for them. You can create, remove, update, and delete `Users` and `Shifts` using the endpoints

## Note 
All times are in UTC for simplicity's sake

## Installation
1. Clone repo
2. `cd` into root dir
3. `npm i` to get necessary packages
4. Ensure you have MySQL (version 8+) installed.  For Macs, you can run `brew install mysql`
5. Run `mysql.server start` to start up the database
6. Run `mysql -u root < sql/run.sql` which will build the database schema and insert some test data (if it asks for a root password, it should be `password`)
7. If you want to access the databse directly the user is `scheduling` and the password is `pw`
8. run `npm run start` to start the application
9. you can hit the api at `localhost:5000/api/v1`

## Endpoints
There is currently one example `user` in the databse (`id = 1`) and one example `shift` (`id=1`)

Users:
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

```
GET /api/v1/users
GET /api/v1/users/:id
POST /api/v1/users
PUT /api/v1/users/:id
DELETE /api/v1/users/:id
```

Shifts:
You can only `GET` or `POST` to shifts by specifying the userID in the URL
You cannot `POST` or `PUT` a shift that conflicts with an existing shift!
```
{
	"id": 3,
	"user": 4, // id of user
	"startTime": "09-01-2019 08:00:00",
	"endTime": "09-01-2019 13:00:00"
}
```

```
GET /api/v1/shifts/user/:userID
GET /api/v1/shifts/:id
POST /api/v1/shifts/user/:userID
PUT /api/v1/shifts/:id
DELETE /api/v1/shifts/:id
```