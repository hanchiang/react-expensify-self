import { database } from '../firebase/firebase';

const addToDatabase = (path, expense) => {
  return database.ref(path).push(expense).then(ref => ({
    id: ref.key,
    ...expense
  }));
};

const fetchFromDatabase = (path) => {
  let expenses = [];

  return database.ref(path).once('value').then(snapshot => {
    let expenses = [];
    snapshot.forEach(childSnapshot => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    return expenses;
  });
}

const editToDataBase = (path, updates) => database.ref(path).update(updates);
const removeFromDatabase = (path) => database.ref(path).remove();

export { addToDatabase, fetchFromDatabase, editToDataBase, removeFromDatabase };