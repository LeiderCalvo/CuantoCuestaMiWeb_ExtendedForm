var db = firebase.firestore();

function writeData(path, obj, callback) {
  db.doc(path).update(obj)
  .then( e => callback(true))
  .catch( e => callback(false));
}