
# Mini Scheduling API
This is a very stripped down api allowing you to add emplouyees and schedule shifts for them

## Note 
all times are in UTC for simplicity's sake

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
```
{
	"id": 3,
	"user": 4, // userID
	"startTime": "09-01-2019 08:00:00",
	"endTime": "09-01-2019 13:00:00"
}
```

```
GET /api/v1/shifts/user/:userID //specify user to GET all shifts
GET /api/v1/shifts/:id
POST /api/v1/shifts/user/:userID //specify user in URL to POST to
PUT /api/v1/shifts/:id
DELETE /api/v1/shifts/:id
```