import {getDataById, getJsonData, postJsonData, updateRequest} from "Constants/ultis"

export function* apiLogin(username, password) {
    const param = JSON.stringify({
        username: username,
        password: password,

    })
    const response = yield postJsonData("/api/login", param)
    return response;
}