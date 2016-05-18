#!/bin/bash
TOKEN="gYwBefyb6jj1IvGOyNhQU69nmAT/nt5p3/tWrnov/h4=--JZmbAMLCcOW1k5qoa7p89v35ycOjfnuxm/gu4i8vZ+o="
ID="40"
curl --include --request DELETE http://localhost:3000/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
