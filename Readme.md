###create rest.http file and paste this to test api using REST Client extension

GET http://localhost:3000

###Login Route
POST http://localhost:3000/auth/login

###Register Route
POST http://localhost:3000/auth/register
Content-Type: application/json

{
"email":"test7@gmail.com",
"password":"1234567"
}

###Refresh token Route
POST http://localhost:3000/auth/refresh-token

###Logout Route
DELETE http://localhost:3000/auth/logout
