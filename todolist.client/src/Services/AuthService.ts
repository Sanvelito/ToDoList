import axios from "axios";
import type RegistrationRequest from "../Models/Auth/RegistrationRequest";
import type LoginRequest from "../Models/Auth/LoginRequest";

export async function Login(req: LoginRequest) {

    if (!req.login || !req.password) {
        console.log("login or password is null")
        return false;
    }
    if (req.login.length <= 4 || req.password.length <= 4) {
        console.log("login or password lenght < 4");
        return false;
    }
    try {
        const response = await axios.post('/api/Auth/login', req)
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log(response.data);
    }
    catch (error) {
        console.error(error);
        console.log("Ошибка другалек")
        return false;
    }

    console.log("Вошел другалек")
    return true;
}

export async function Registration(req: RegistrationRequest) {
    if (!req.login || !req.password) {
        console.log("login or password is null")
        return false;
    }
    if (req.login.length <= 4 || req.password.length <= 4) {
        console.log("login or password lenght < 4");
        return false;
    }

        try {
            const response = await axios.post('/api/Auth/registration', req);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            console.log(response.data);
        }
        catch (error) {
            console.error(error);
            return false;
        }
    console.log("Зарегался другалек")
    return true;
}