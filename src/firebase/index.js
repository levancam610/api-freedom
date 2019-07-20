import firebase from 'firebase';
import {firebaseConfig} from '../constants/defaultValues'

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {
    auth,
    database,
    firebase
};
