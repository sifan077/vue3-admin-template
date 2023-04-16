import http from '../utils/http/http.js'

const login = (data) => {
    return http.post("/person/login", data);
};

const register = (data) => {
    return http.post("/person/register", data);
};

const updatePassword = (data) => {
    return http.put("/person/updatePass", data);
}

export default {
    login, register,updatePassword
}