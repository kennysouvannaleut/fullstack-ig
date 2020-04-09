import firebase from 'firebase/app'
import 'firebase/storage'

const dotENV = require('dotenv')
dotENV.config()
const apiKey = process.env.API_KEY

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "image-bucket-4e572.firebaseapp.com",
    databaseURL: "https://image-bucket-4e572.firebaseio.com",
    projectId: "image-bucket-4e572",
    storageBucket: "image-bucket-4e572.appspot.com",
    messagingSenderId: "15521326526",
    appId: "1:15521326526:web:1e2fb596d1b954e7e7c5ef",
    measurementId: "G-QRZNJJGDP6"
}

firebase.initializeApp(firebaseConfig)

// firebase.analytics()

const storage = firebase.storage()

export {storage, firebase as default}

// const storageRef = storage.ref()
