# Address API Spec

## Create Address API

method: POST

endpoint: /api/contact/:contactId/addresses

headers:

- authorization: token

request body:

```json
{
  "street": "Jl. Asmaw H.M",
  "city": "Tangerang Selatan",
  "province": "Banten",
  "country": "Indonesia",
  "postalCode": "15413"
}
```

response body success:

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Asmaw H.M",
    "city": "Tangerang Selatan",
    "province": "Banten",
    "country": "Indonesia",
    "postalCode": "15413"
  }
}
```

response body error:

```json
{
  "errors": "Country is required"
}
```

## Update Address API

method: PUT

endpoint: /api/contact/:contactId/addresses/:addressId

headers:

- authorization: token

request body:

```json
{
  "street": "Jl. Asmaw H.M",
  "city": "Tangerang Selatan",
  "province": "Banten",
  "country": "Indonesia",
  "postalCode": "15413"
}
```

response body success:

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Asmaw H.M",
    "city": "Tangerang Selatan",
    "province": "Banten",
    "country": "Indonesia",
    "postalCode": "15413"
  }
}
```

response body error:

```json
{
  "errors": ""
}
```

## Get Address API

method: GET

endpoint: /api/contact/:contactId/addresses/:addressId

headers:

- authorization: token

response body success:

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Asmaw H.M",
    "city": "Tangerang Selatan",
    "province": "Banten",
    "country": "Indonesia",
    "postalCode": "15413"
  }
}
```

response body error:

```json
{
  "errors": ""
}
```

## Remove Address API

method: DELETE

endpoint: /api/contact/:contactId/addresses/:addressId

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
  "errors": ""
}
```

## List Address API

method: GET

endpoint: /api/contact/:contactId/addresses/

headers:

- authorization: token

response body success:

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Asmaw H.M",
    "city": "Tangerang Selatan",
    "province": "Banten",
    "country": "Indonesia",
    "postalCode": "15413"
  }
}
```

response body error:

```json
{
  "errors": ""
}
```
