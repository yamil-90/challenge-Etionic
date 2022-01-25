# Laravel React challenge app

this is an app make with using the hackerNews api to get a list of the last news and it has the ability of saving it as favorites for every user.

the request to hackernews is made using Axios in the frontend and while laravel makes handles the users registration, login and database requests.

we use JWT to provide a bearer token so the request to Laravel's API cannot be made without authorization.

the controller, also was coded using a repository, service and interface in order to abstract the database requests 
