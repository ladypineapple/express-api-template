#!/bin/bash
TOKEN="aq8hFHJMRs4slC+kh7tpII5sCl2MVTyzUATbrPw72os=--f2e3hrYsWr0T0j8ZcK2kkXHn5Cw+/m8wWavuzDi6t9M="
ID="42"
curl --include --request GET http://localhost:3000/users/$ID \
  --header "Authorization: Token token=$TOKEN"
