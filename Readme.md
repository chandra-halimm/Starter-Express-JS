# TemanTB-API

## Users

| Method | Path          | Response Code | Body | Description         |
| ------ |---------------| ------------- | ---- |---------------------|
| POST   | /users        | 201 | JSON | Create new contacts |
| GET    | /users        | 200 | JSON | List of contacts    |
| DELETE | /contacts/:id | 200 | JSON | Delete contacts     |


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
    "password": "$2b$10$a4eBT1.p2yAPJwd5qCsFDOJERyiRb7WG/OQwyQRuCRCf9SzJsS.DK",
    "refresh_token": "$2b$10$a4eBT1.p2yAPJwd5qCsF",
    "createdAt": "2023-11-16T09:51:14.000Z",
    "updatedAt": "2023-11-16T09:51:14.000Z"
}
```

## Users

| Method | Path          | Response Code | Body | Description         |
| ------ |---------------| ------------- | ---- |---------------------|
| POST   | /login        | 201 | JSON | access login|

```json
{
    "email": "user@gmail.com",
    "password": "123123"
}
```

Server options:
 - `port`: 8000
 - `host`: localhost
