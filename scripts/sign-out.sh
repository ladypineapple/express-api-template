#!/bin/bash
TOKEN="YEj9cWkwo4sUSsS71DnTN4y+CqtjRUgM3dyUwS7PvGs=--z3jHaRL28XZUQCJIJDKikJLYcNWHtB61II3HConP0SA="
ID="39"
curl --include --request DELETE http://localhost:3000/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
