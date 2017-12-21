import { auth } from '../firebase/firebase';

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

export { createUser, verifyEmail };