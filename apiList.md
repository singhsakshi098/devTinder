# DEVTINDER APIS

#autRouter
-POST /signup
-POST /login 
-POST /logout

#profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

#connctionRequestRouter
-POST /request/send/intrested/:userId
-Post /request/send/ignores/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

#user
-GET /user/connections
-GET /user/requests/recieved
-GET /user/feed -Gets you the profiles of other users on platforms


-Status: ignore,intrested,accepted,rejected


