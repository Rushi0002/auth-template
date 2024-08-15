GET http://localhost:3000
Authorization: Bearer accessToken

###Login Route
POST http://localhost:3000/auth/login
Content-Type: application/json

{
"email":"test12@gmail.com",
"password":"1234567"
}

###Register Route
POST http://localhost:3000/auth/register
Content-Type: application/json

{
"email":"test14@gmail.com",
"password":"1234567"
}

###Refresh token Route
POST http://localhost:3000/auth/refresh-token
Content-Type: application/json

{
"refreshToken": "refreshToken"
}

###Logout Route
DELETE http://localhost:3000/auth/logout
