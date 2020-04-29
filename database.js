var db = firebase.firestore();

function writeData(path, obj, callback) {
  db.doc(path).update(obj)
  .then( e => callback(true))
  .catch( e => callback(false));
}

function getData(path, callback) {
  db.doc(path).get()
  .then( doc => doc.exists? callback(doc.data()) : callback(null) )
  .catch( err => callback(null));
}