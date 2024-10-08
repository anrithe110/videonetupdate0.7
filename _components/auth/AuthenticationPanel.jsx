import { useState } from "react";
import Register from "./Register";
import Login from "./LogIn";

function AuthenticationPanel({
  placeholder_name,
  placeholder_lastName,
  Signin,
  register,
  onClick,
  placeholder_E,
  placeholder_P,
  code,
}) {
  const [display, setDisplay] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="fixed left-0 w-full h-full overflow-hidden items-center z-20">
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
      <div className="search fixed  xl:right-[35%] xl:left-[35%] md:right-[25%] md:left-[25%] left-[10%] right-[10%] top-28">
        <div className="flex items-center  w-full justify-between gap-2">
          <div className="p-1 rounded items-center h-auto w-full">
            <div className="pl-1 flex gap-2">
              <svg
                className="main-svg !w-[30px]"
                viewBox="1 1 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="svg"
                  cx="12"
                  cy="9"
                  r="3"
                  strokeWidth="1.5"
                />
                <circle
                  className="svg"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="1.5"
                />
                <path
                  className="svg"
                  d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h1 className="text-xl m-1">{display ? Signin : register}</h1>
            </div>
          </div>
          <button className="btn !p-1 m-1"  onClick={() => {
              onClick();
            }}>
            <svg
              className="main-svg  dark:fill-white fill-black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="svg"
                clip-rule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              />
            </svg>
          </button>
        </div>
        {display ? (
          <Login
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            placeholder_E={placeholder_E}
            placeholder_P={placeholder_P}
            Signin={Signin}
            Switch={setDisplay}
            display={display}
            register={register}
          />
        ) : (
          <Register
            placeholder_E={placeholder_E}
            placeholder_P={placeholder_P}
            placeholder_name={placeholder_name}
            placeholder_lastName={placeholder_lastName}
            code={code}
            Signin={Signin}
            close={onClick}
            Switch={setDisplay}
            display={display}
            register={register}
          />
        )}
      </div>
    </div>
  );
}
export default AuthenticationPanel;
