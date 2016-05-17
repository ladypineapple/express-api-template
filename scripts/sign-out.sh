#!/bin/bash
$TOKEN=rHfeNT6vlBHp5fDD3Ln2ipLmVojBAJ6kaNvmI6lJ5a0=--8t7FyNIbPgr9sNhKSjSQTnTKjgvXS+3uYmvD7A0jyj0=
$ID=39
curl --include --request DELETE http://localhost:3000/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
