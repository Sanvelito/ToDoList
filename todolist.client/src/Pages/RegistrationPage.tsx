import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Registration } from "../Services/AuthService";

function RegistrationPage() {

    const [login, setLogin] = React.useState("");
    const [firstPassword, setFirstPassword] = React.useState("");
    const [secondPassword, setSecondPassword] = React.useState("");
    const navigator = useNavigate();

    const onRegistration = async (e: any) => {
        e.preventDefault();
        try {
            if (firstPassword !== secondPassword) {
                console.log("passwords are not same")
            }
            if (await Registration({login, password : firstPassword})) {
                navigator("/");
            }
            
        }
        catch (error: any) {
            console.log(error);
        }
    }

    const handleLoginChange = (e: any) => {
        if (/^[a-zA-Zа-яА-Я0-9]*$/.test(e.target.value)) {
            setLogin(e.target.value);
        }
    }
    const handleFirstPasswordChange = (e: any) => {
        setFirstPassword(e.target.value);
    }
    const handleSecondPasswordChange = (e: any) => {
        setSecondPassword(e.target.value);
    }

  return (
      <>
          <div className="flex flex-col items-center justify-center h-screen b bg-gradient-to-r from-violet-950 to-indigo-900">
              <form onSubmit={onRegistration} className="backdrop-blur-sm bg-white/10 rounded-xl drop-shadow-lg p-10 m-10 font-medium text-white">
                  <div className="flex justify-center text-2xl font-semibold italic text-center">
                      Registration
                      <h2 className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block mx-2">
                          <span className="relative text-white mx-1">
                              ToDo
                          </span>
                      </h2>
                      client!
                  </div>

                  <div className="mt-7">Логин</div>
                  <input type="text" value={login} onChange={handleLoginChange} className="w-full rounded-sm bg-gradient-to-r from-violet-950 to-indigo-900 focus:from-violet-800 focus:to-indigo-800 ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"></input>

                  <div className="mt-2">Пароль</div>
                  <input type="password" value={firstPassword} onChange={handleFirstPasswordChange} className="w-full rounded-sm bg-gradient-to-r from-violet-950 to-indigo-900 focus:from-violet-800 focus:to-indigo-800 ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"></input>

                  <div className="mt-2">Подтверждение пароля</div>
                  <input type="password" value={secondPassword} onChange={handleSecondPasswordChange} className="w-full rounded-sm bg-gradient-to-r from-violet-950 to-indigo-900 focus:from-violet-800 focus:to-indigo-800 ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"></input>

                  <div className="flex justify-center">
                      <button type="submit" className="text-center w-10/12 m-2 p-2 rounded-xl bg-gradient-to-r hover:from-indigo-600 to-pink-500 font-medium text-white mt-5"> Зарегистрироваться</button>
                  </div>
                  <div className="flex justify-center">
                      <Link to={"/login"} className="text-center w-10/12 p-2 rounded-xl font-medium text-white mt-2 bg-gradient-to-r from-violet-950 to-indigo-900 hover:from-violet-800 hover:to-indigo-800">
                          <button>На главную</button>
                      </Link>
                  </div>

              </form>

              <div className="flex justify-center text-l font-semibold italic text-center text-white p-3">
                  created by
                  <h2 className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block mx-2">
                      <span className="relative text-white mx-1">
                          Sanvel
                      </span>
                  </h2>
              </div>
          </div>
      </>
  );
}
 
export default RegistrationPage;