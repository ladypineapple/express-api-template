#!/bin/bash
TOKEN="YEj9cWkwo4sUSsS71DnTN4y+CqtjRUgM3dyUwS7PvGs=--z3jHaRL28XZUQCJIJDKikJLYcNWHtB61II3HConP0SA="
curl --include --request GET http://localhost:3000/users \
  --header "Authorization: Token token=$TOKEN"
