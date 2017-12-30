import firebase, { auth } from '../firebase/firebase';
import jwtDecode from 'jwt-decode';

const AUTH_PROVIDERS = {
  'facebook.com': new firebase.auth.FacebookAuthProvider,
  'google.com': new firebase.auth.GoogleAuthProvider,
  'password': new firebase.auth.EmailAuthProvider
};

// getter helper api
const getEmailCredential = (email, password) =>
  firebase.auth.EmailAuthProvider.credential(email, password);

const getGoogleCredential = (idToken) =>
  firebase.auth.GoogleAuthProvider.credential(idToken);

const getIdToken = () => auth.currentUser.getIdToken(true).then(idToken => idToken);

const getSignInProvider = () => 
  getIdToken().then(idToken => jwtDecode(idToken).firebase.sign_in_provider);


// firebase api
const signInWithPopup = (provider) => {
  return auth.signInWithPopup(provider)
  .then(userCredential => {
    return {user: userCredential.user}
  }).catch(error => ({error}));
}

const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password)
  .then(user => ({user}))
  .catch(error => ({error}));
}

const signInWithCredential = (credential) =>
  auth.signInWithCredential(credential)
  .then(user => ({ user }))
  .catch(error => ({ error }));


const reauthenticateWithCredential = (credential) => 
  auth.currentUser.reauthenticateWithCredential(credential)
  .then(() => ({}))
  .catch(error => ({error}));

const createUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
  .then(user => ({user}))
  .catch(error => ({ error }));
}

// updates is an object of displayName and photoURL
const updateUserProfile = (user, updates) => {
  return user.updateProfile(updates)
  .then(() => ({}))
  .catch(error => {error});
}

const updateEmail = (newEmail) => {
  return auth.currentUser.updateEmail(newEmail)
  .then(() => ({}))
  .catch(error => ({error}));
}

const verifyEmail = () => {
  const user = auth.currentUser;
  const actionCodeSettings = { url: 'https://han-expensify.herokuapp.com' };

  return user.sendEmailVerification(actionCodeSettings)
  .then(() => ({}))
  .catch(error => ({error}));
}

const sendPasswordResetEmail = (email) => {
  const actionCodeSettings = { url: 'https://han-expensify.herokuapp.com' };
  return auth.sendPasswordResetEmail(email, actionCodeSettings)
  .then(() => ({}))
  .catch(error => ({error}));
};


// account linking
const linkEmailAuthProvider = (user) => {
  const { email, password, firstName, lastName } = user;
  const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  return auth.currentUser.linkWithCredential(credential)
  .then(user => ({user}))
  .catch(error => ({error}));
}

const linkAuthProvider = (provider) => {
  return auth.currentUser.linkWithPopup(provider)
  .then(userCredential => ({ userCredential}))
  .catch(error => ({error}));
}

const unlinkAuthProvider = (providerId) => {
  return auth.currentUser.unlink(providerId)
  .then(user => ({user}))
  .catch(error => ({error}));
}

const reauthenticateWithPopup = (signInProvider) => {
  return auth.currentUser.reauthenticateWithPopup(AUTH_PROVIDERS[signInProvider])
  .then(userCredential => {
    console.log(userCredential);
    return { userCredential };
  })
  .catch(error => {
    console.log(error);
    return {error};
  });
}

export {
  createUser, verifyEmail, updateUserProfile, sendPasswordResetEmail, signInWithPopup, 
  getEmailCredential, signInWithCredential, reauthenticateWithCredential, reauthenticateWithPopup,
  signInWithEmailAndPassword, linkEmailAuthProvider, linkAuthProvider, unlinkAuthProvider,
  updateEmail, getSignInProvider
};