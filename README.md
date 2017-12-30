
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
* __Firebase__ - Provides user authentication and data persistence  
* __Redux-saga__ - To handle side effects such as authentication, and interactions with the database  
* __React-router__ - Handles routing between pages  
* __Express__ - To serve the app live  
* __Formik__ - A painless React way to do form validation and submission
* __Yup__ - Client sided form fields validation


## Demo
[Live demo](https://han-expensify.herokuapp.com/)


## TO DO
* Link multiple auth providers(done)  
  * Need to store current sign in method, in order to reauthenticate with the same method
  * Complete unlink auth providers, modal
  * handleLinkEmailAuthProvider
  * handle errrors and success
  * IMPT?: Unset the variables used for async error and success handling after success
* Organise components into their own folders  
* Look at nested routes.(not so important?)  


## Note to self
* Login - Only handle error for logging in with password, but not google login, since it is not critical?
* Set auth user in redux store - For both login and when page refresh
* Get current signed in provider - So far there is only one way to do it, which is to get
the id token and parse it

## Account linking
* Common scenarios  
  * Use same email account(test@hotmail.com) and provider(e.g. facebook) with same email(test@hotmail.com)
  * Use email account(test@hotmail.com) and provider(e.g. facebook) with another email(myfacebook@hotmail.com)
* Allowed linking
  * Email to auth provider: Create an account with email and password, automatically logged in, manually link to auth provider
  * Auth provider to auth provider: e.g. Sign in with google, link with facebook
* Forbidden linking
  * Email to email
* IMPT: About unlinking account - Cannot unlink the current auth provider.  
  * E.g. If user hsa an account with email and facebook linked, and logs in using email, he cannot unlink the email.

* __Important__: Users must not have already been logged in using the auth providers, if not it will fail.

## References
* [Tabbed login form design](https://t02vt3ludlc288yi5365dsdi-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/tab-login-sign-up-forms.jpg)
