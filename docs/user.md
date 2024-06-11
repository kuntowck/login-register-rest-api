# User API Spec

## Register User API

method: POST

endpoint: /api/users

request body:

```json
{
  "username": "kuntowck",
  "password": "123",
  "name": "Kunto Wicaksono"
}
```

response body success:

```json
{
  "data": {
    "username": "kuntowck",
    "name": "Kunto Wicaksono"
  }
}
```

response body error:

```json
{
  "errors": "Username already registered."
}
```

## Login User API

method: POST

endpoint: /api/users/login

request body:

```json
{
  "username": "kuntowck",
  "password": "123"
}
```

response body success:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

response body failed:

```json
{
  "errors": "Username or Password wrong."
}
```

## Update User API

method: PATCH

endpoint: /api/users/id

headers:

- authorization: token

request body:

```json
{
  "name": "Kunto Wicaksono", // optional
  "password": "new password" // optional
}
```

response body success:

```json
{
  "data": {
    "username": "kuntowck",
    "name": "Kunto Wicaksono"
  }
}
```

response body error:

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

method: GET

endpoint: /api/users/id

headers:
- authorization: token

response body success:

```json
{
  "data": {
    "username": "kuntowck",
    "name": "Kunto Wicaksono"
  }
}
```

response body error:

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

method: DELETE

endpoint: /api/users/logout

headers:
- authorization: token

response body success:

```json
{
  "data": "OK!"
}
```

response body error:

```json
{
  "errors": "Unauthorized"
}
```
