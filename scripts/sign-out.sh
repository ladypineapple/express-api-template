#!/bin/bash
TOKEN="Bw2xPxNF6QzJvhY7HrlBWKl4r5DtSahdHjGnpAZ+O2c=--uu7Z8qSr9OD45lwEScSjdvPS8EyVU4E6KQhPC2Dmh2E="
ID="40"
curl --include --request DELETE http://localhost:3000/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
