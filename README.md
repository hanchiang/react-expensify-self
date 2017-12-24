
This project is created using the react boilerplate by [Andrew Mead](https://github.com/andrewjmead)

## Design decisions
* Creation time for expenses is stored in milliseconds  
* Date filters are stored as moment objects  
* Currency is stored as integer(cents)  

## Sign out work flow
* Click on logout button
* Dispatch async action to trigger auth.signOut()
* auth.onAuthStateChanged() gets triggered
* Dispatch logout action to clear auth state
* isAuthentication in PrivateRoute becomes false, and redirects to login page

## Sign up work flow
* After creating an account, user will be logged in automatically

## Libraries used
* __Moment__ - For displaying and manipulating time.   
* __React-dates__ - To display date pickers, with moment as dependency  
* __Numeral__ - To store and format currency    
* __Firebase__ - Provides usrt authentication and data persistence  
* __Redux-saga__ - To handle side effects such as authentication, and interactions with the database  
* __React-router__ - Handles routing between pages  
* __Express__ - To serve the app live  


## Demo
[Live demo](https://han-expensify.herokuapp.com/)


## TO DO
* Fix Forgot password: Figure out how to fade in and slide up. Slide doesnt work
* Fix after sign up: user is set, but unable to retrieve properties
* Look at nested routes.
* Link multiple auth providers

## Note to self
* Login - Only handle error for logging in with password, but not google login, since it is not critical?
* Set auth user in redux store - For both login and when page refresh

## References
* [Tabbed login form design](https://t02vt3ludlc288yi5365dsdi-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/tab-login-sign-up-forms.jpg)
