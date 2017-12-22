import { auth } from '../firebase/firebase';

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

const createUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
  .then(user => ({user}))
  .catch(error => ({ error }));
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
  return auth.sendPasswordResetEmail(email)
  .then(() => ({}))
  .catch(error => ({error}));
};

export { createUser, verifyEmail, sendPasswordResetEmail, signInWithPopup, signInWithEmailAndPassword };