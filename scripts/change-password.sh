#!/bin/bash
TOKEN="Bw2xPxNF6QzJvhY7HrlBWKl4r5DtSahdHjGnpAZ+O2c=--uu7Z8qSr9OD45lwEScSjdvPS8EyVU4E6KQhPC2Dmh2E="
ID="40"
curl --include --request PATCH http://localhost:3000/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "c",
      "new": "r"
    }
  }'
