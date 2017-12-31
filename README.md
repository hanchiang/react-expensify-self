This is an expense manager application that allows you to login via email, facebook, or google,  
and manage your own expenses.

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
* __moment__ - For displaying and manipulating time.   
* __react-dates__ - To display date pickers, with moment as dependency  
* __numeral__ - To store and format currency    
* __firebase__ - Provides user authentication and data persistence  
* __redux-saga__ - To handle side effects such as authentication, and interactions with the database  
* __react-router__ - Handles routing between pages  
* __express__ - To serve the app live  
* __formik__ - A painless React way to do form validation and submission  
* __yup__ - Client sided form fields validation  
* __react-burger-menu__ - Sidebar navigation  
* __react-tabs__ - For tabbed login and signup form  
* __jwt-decode__ - To decode token


## Demo
[Live demo](https://han-expensify.herokuapp.com/)



## TO DO
* IMPT?: Unset the variables used for async error and success handling after success
* Organise components into their own folders  
* Look at nested routes.(not so important?)  


This project is created using the react boilerplate by [Andrew Mead](https://github.com/andrewjmead)