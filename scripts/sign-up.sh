#!/bin/bash

curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "r@r.com",
      "password": "r",
      "password_confirmation": "r"
    }
  }'

# curl --include --request POST http://localhost:3000/sign-up \
#   --header "Content-Type: application/json" \
#   --data '{
#     "credentials": {
#       "email": "another@example.email",
#       "password": "an example password",
#       "password_confirmation": "an example password"
#     }
#   }'
