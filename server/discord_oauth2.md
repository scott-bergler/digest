# Setup Steps for Discord OAuth2 Application
## Source
- https://youtu.be/RP0P_zGdvj8?si=FsGn-2F_Id_l02KG
- https://youtu.be/NtS5BkqS6M0?si=iir0TPZ-UkavnwKn
# ChatGPT breakdown of Oauth2 terminology 
- https://chatgpt.com/share/ac142de1-7a5c-45b8-933c-ccf781fe2b4c
- Authorization server: discord's own server aka the middle person
- Resource owner: this is the client who is giving us access to their data 

## Steps
1. Discord Application (done)
2. Get Client ID & Client Secret (done)
3. Set redirect URL (done)
4. Get OAuth2 URL from Discord generator (done)
 - This is the Discord URL our users will visit. Discord will tell the user the scopes we are requesting & ask them to either authorize or deny the application.
 - When the user clicks "Authorize" Discord redirects to our redirect URL including the Access Code as a query parameter.
 - Our server will take this code and exchange it for an Access Token. Discord will respond with the Access Token & a Refresh Token.
 - Our server will then use the Access Token & Refresh Tokens to get the user's data according to the scopes we requested.

 
### Tuesday's Next Steps 
1. Save the access token to our dummy database 
2. Save the refresh token to our dummy database
3. Write an endpoint to get the users data from discord 
   - This would require the access token 
4. Write an endpoint to refresh the access token 