# Exmaple Docs Api

## Users

| Method | Path          | Response Code | Body | Description         |
| ------ |---------------| ------------- | ---- |---------------------|
| POST   | /users        | 201 | JSON | Create new users |
| GET    | /users        | 200 | JSON | List data of users    |


POST data users structure:

```json
{
    "name": "user1",
    "email": "user@gmail.com",
    "password": "123123",
    "confPassword": "123123"
}
```

GET data users structure:

```json
{
    "userID": "12876c29-1749-42ad-85b7-0acd6d404fb6",
    "name": "user",
    "email": "user@gmail.com",
    "createdAt": "2023-11-16T09:51:14.000Z",
    "updatedAt": "2023-11-16T09:51:14.000Z"
}
```

## Login

| Method | Path          | Response Code | Body | Description         |
| ------ |---------------| ------------- | ---- |---------------------|
| POST   | /login        | 201 | JSON | access login|

POST data login structure:

```json
{
    "email": "user@gmail.com",
    "password": "123123"
}
```

## Logout

| Method | Path          | Response Code | Body | Description         |
| ------ |---------------| ------------- | ---- |---------------------|
| DELETE   | /logout     | 200 | JSON | delete token login|

DELETE data logout structure:

```json
{
   OK
}
```

Server options:
 - `port`: 8000
 - `host`: localhost
