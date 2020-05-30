CLIENTID="newClient"
CLIENTSECRET="5eb77bb1-f499-4cd5-bc30-540f7fe50a96"

TOKEN=$(curl -k -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic $(echo -n ${CLIENTID}:${CLIENTSECRET} | base64 -w 0)" --data "grant_type=client_credentials" "http://localhost:8080/auth/realms/zdslogic/protocol/openid-connect/token" -s | jq -r .access_token)

echo $TOKEN