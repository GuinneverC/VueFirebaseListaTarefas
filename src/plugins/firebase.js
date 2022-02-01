import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCS8KAeq2vsn7WH8Jk_tcNCc516Y_TF1lA",
  authDomain: "listatarefasvue.firebaseapp.com",
  projectId: "listatarefasvue",
  storageBucket: "listatarefasvue.appspot.com",
  messagingSenderId: "197283952860",
  appId: "1:197283952860:web:e79df40df80493d3dedc19"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')
const googleProvider = new firebase.auth.GoogleAuthProvider()

export {
    db, auth, profileCollection, tasksCollection, googleProvider
}