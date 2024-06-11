# Contact API Spec

## Create Contact API

method: POST

endpoint: /api/contacts

Headers:

- authorization: token

request body:

```json
{
  "firstName": "Kunto",
  "lastName": "Wicaksono",
  "email": "kuntowck@gmail.com",
  "phone": "085156655677"
}
```

response body success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Kunto",
    "lastName": "Wicaksono",
    "email": "kuntowck@gmail.com",
    "phone": "085156655677"
  }
}
```

response body error:

```json
{
  "errors": "Email is not valid format."
}
```

## Update Contact API

method: PUT

endpoint: /api/contacts/:id

Headers:

- authorization: token

request body:

```json
{
  "firstName": "Kunto",
  "lastName": "Wicaksono",
  "email": "kuntowck@gmail.com",
  "phone": "085156655677"
}
```

response body success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Kunto",
    "lastName": "Wicaksono",
    "email": "kuntowck@gmail.com",
    "phone": "085156655677"
  }
}
```

response body error:

```json
{
  "errors": "Email is not valid format."
}
```

## Get Contact API

method: GET

endpoint: /api/contacts/:id

Headers:

- authorization: token

response body success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Kunto",
    "lastName": "Wicaksono",
    "email": "kuntowck@gmail.com",
    "phone": "085156655677"
  }
}
```

response body error:

```json
{
  "errors": "Contact is not found."
}
```

## Remove Contact API

method: DELETE

endpoint: /api/contacts/:id

Headers:

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
  "erros": "Contact is not found."
}
```

## Search Contact API

method: GET

endpoint: /api/contact

Headers:

- authorization

Query Params:

- name: search by firstName or lastName, using LIKE, optional
- email: search by email, using LIKE, optional
- phone: search by phone, using LIKE, optional
- page: number of page, default 1
- size: size per page, default 10

response body success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Kunto",
    "lastName": "Wicaksono",
    "email": "kuntowck@gmail.com",
    "phone": "085156655677"
  },
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```
