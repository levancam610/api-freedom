
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
//import { auth } from '../../firebase';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER
} from '../../constants/actionTypes';
import {apiLogin} from "./api"
import {
    loginUserSuccess,
    registerUserSuccess
} from './actions';

/*const loginWithEmailPasswordAsync = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);

*/

function* loginWithEmailPassword({ payload }) {
    const { user, history  } = payload;
    console.log(user.email+"-"+user.password);
    try {
        const loginUser = yield call(apiLogin, user.email, user.password);
        console.log(loginUser);
        if (loginUser.Success) {
            localStorage.setItem('token', loginUser.token);
            localStorage.setItem('username', user.email);
            console.log(localStorage.getItem('token'));
            //history.push("/admin/product/list");
            window.location = "/admin/product/list";
        } else {
            // catch throw
            console.log('login failed :', loginUser.message)
        }
    } catch (error) {
        // catch throw
        console.log('login error : ', error)
    }
}

/*const registerWithEmailPasswordAsync = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);
*/
/*
function* registerWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        console.log("hihi")
        console.log(email)
        console.log(password)
        if (!registerUser.message) {
            localStorage.setItem('user_id', registerUser.user.uid);
            yield put(registerUserSuccess(registerUser));
            history.push('/')
        } else {
            // catch throw
            console.log('register failed :', registerUser.message)
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}
*/


const logoutAsync = async (history) => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        //history.push("/login");
        window.location = "/"
    } catch (error) {
    }
}


function* logout({payload}) {

    console.log(payload)
    const history = payload.history;
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        //history.push("/login");
        //window.location = "/index"
    } catch (error) {
    }
}



export function* api() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
    yield takeEvery(LOGOUT_USER, logout);

}


export default function* rootSaga() {
    yield all([
        fork(api),
    ]);
}
