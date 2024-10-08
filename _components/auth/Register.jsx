import url from "@/libs/url.config";
import { useState } from "react";

async function createUser(e, credentials , Switch , display , close) {
  e.preventDefault();
  const response = await fetch(`${url}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      name: credentials.name,
      lastName: credentials.lastName,
      password: credentials.password1,
      code: credentials.code,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    alert(data.message || "Something went wrong");
    return;
  }else{
    Switch(!display)
  }
  
}
async function getcode(credentials, e) {
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const isLongEnough = /^.{8,}$/;

  if (!credentials.email) {
    alert("Enter email");
    return;
  }
  if (!validEmail.test(credentials.email)) {
    alert("Enter a correct email");
    return;
  }
  
  if (credentials.password1 !== credentials.password2) {
    alert("Passwords do not match");
    return;
  }

  if (!isLongEnough.test(credentials.password1) || !isLongEnough.test(credentials.password2)) {
    alert("Password should be more than 8 characters");
    return;
  }
  e.preventDefault();
  const response = await fetch(`${url}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email:credentials.email}),
  });
  const data = await response.json();
  if (!response.ok) {
    alert(data.message || "Something went wrong");
    return;
  }
    
  
}

function Auth({ credentials, setCredentials, register, createUser , Switch }) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="justify-center">
        <div className="flex justify-between">
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, code: e.target.value })
            }
            placeholder="CODE"
            autoComplete="one-time-code"
            type="number"
            className="inp w-[90%]  mr-[0.5rem]"
          />
          <button
            onClick={(e) => createUser(e, credentials , Switch )}
            className="btn"
          >
            {register}
          </button>
        </div>
      </div>
    </div>
  );
}

function Credentials({
  credentials,
  setCredentials,
  placeholder_E,
  placeholder_P,
  code,
  Signin,
  Display,
  display,
  Switch,
  setDisplay,
  Toggle,
  SetToggle,
  getcode,
}) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex justify-center">
        <input
          type="email"
          autoComplete="email"
          className="inp w-full"
          placeholder={placeholder_E}
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </div>
      <div className="flex justify-center">
        <input
          autoComplete="new-password"
          type={Toggle ? "password" : "text"}
          className="inp w-full"
          placeholder={placeholder_P}
          value={credentials.password1}
          onChange={(e) =>
            setCredentials({ ...credentials, password1: e.target.value })
          }
        />
        <span
          className="flex justify-around items-center"
          onClick={() => SetToggle(!Toggle)}
        >
          {Toggle ? (
            <svg
              className="absolute mr-16 main-svg dark:fill-white fill-black"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path d="M45.3,22.1h0C43.2,19.5,35.4,11,24,11S4.8,19.5,2.7,22.1a3,3,0,0,0,0,3.8C4.8,28.5,12.6,37,24,37s19.2-8.5,21.3-11.1A3,3,0,0,0,45.3,22.1ZM24,33c-8.8,0-15.3-6.2-17.7-9,2.4-2.8,8.9-9,17.7-9s15.3,6.2,17.7,9C39.3,26.8,32.8,33,24,33Z" />
                  <circle cx="24" cy="24" r="6" />
                </g>
              </g>
            </svg>
          ) : (
            <svg
              className="absolute mr-16 main-svg dark:fill-white fill-black"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <g>
                    <path d="M45.3,22.1C43.2,19.5,35.4,11,24,11a23.4,23.4,0,0,0-3.8.3L23.8,15H24c8.8,0,15.3,6.2,17.7,9a33.7,33.7,0,0,1-4.6,4.3l2.8,2.8a30.1,30.1,0,0,0,5.4-5.2A3,3,0,0,0,45.3,22.1Z" />
                    <path d="M29.4,26.6A5.8,5.8,0,0,0,30,24a6,6,0,0,0-6-6,5.8,5.8,0,0,0-2.6.6L9.7,6.9A2,2,0,0,0,6.9,9.7l4.7,4.8a32.1,32.1,0,0,0-8.9,7.6,3,3,0,0,0,0,3.8C4.8,28.5,12.6,37,24,37a23,23,0,0,0,8.5-1.6l5.8,5.7a2,2,0,1,0,2.8-2.8ZM24,33c-8.8,0-15.3-6.2-17.7-9a29.7,29.7,0,0,1,8.3-6.6l4,4A5.8,5.8,0,0,0,18,24a6,6,0,0,0,6,6,5.8,5.8,0,0,0,2.6-.6l2.8,2.8A19.1,19.1,0,0,1,24,33Z" />
                  </g>
                </g>
              </g>
            </svg>
          )}
        </span>
      </div>
      <div className="flex justify-center">
        <input
          type={Toggle ? "password" : "text"}
          autoComplete="new-password"
          className="inp w-full"
          placeholder={placeholder_P}
          value={credentials.password2}
          onChange={(e) =>
            setCredentials({ ...credentials, password2: e.target.value })
          }
        />
        <span
          className="flex justify-around items-center"
          onClick={() => SetToggle(!Toggle)}
        >
          {Toggle ? (
            <svg
              className="absolute mr-16 main-svg dark:fill-white fill-black"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path d="M45.3,22.1h0C43.2,19.5,35.4,11,24,11S4.8,19.5,2.7,22.1a3,3,0,0,0,0,3.8C4.8,28.5,12.6,37,24,37s19.2-8.5,21.3-11.1A3,3,0,0,0,45.3,22.1ZM24,33c-8.8,0-15.3-6.2-17.7-9,2.4-2.8,8.9-9,17.7-9s15.3,6.2,17.7,9C39.3,26.8,32.8,33,24,33Z" />
                  <circle cx="24" cy="24" r="6" />
                </g>
              </g>
            </svg>
          ) : (
            <svg
              className="absolute mr-16 main-svg dark:fill-white fill-black"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <g>
                    <path d="M45.3,22.1C43.2,19.5,35.4,11,24,11a23.4,23.4,0,0,0-3.8.3L23.8,15H24c8.8,0,15.3,6.2,17.7,9a33.7,33.7,0,0,1-4.6,4.3l2.8,2.8a30.1,30.1,0,0,0,5.4-5.2A3,3,0,0,0,45.3,22.1Z" />
                    <path d="M29.4,26.6A5.8,5.8,0,0,0,30,24a6,6,0,0,0-6-6,5.8,5.8,0,0,0-2.6.6L9.7,6.9A2,2,0,0,0,6.9,9.7l4.7,4.8a32.1,32.1,0,0,0-8.9,7.6,3,3,0,0,0,0,3.8C4.8,28.5,12.6,37,24,37a23,23,0,0,0,8.5-1.6l5.8,5.7a2,2,0,1,0,2.8-2.8ZM24,33c-8.8,0-15.3-6.2-17.7-9a29.7,29.7,0,0,1,8.3-6.6l4,4A5.8,5.8,0,0,0,18,24a6,6,0,0,0,6,6,5.8,5.8,0,0,0,2.6-.6l2.8,2.8A19.1,19.1,0,0,1,24,33Z" />
                  </g>
                </g>
              </g>
            </svg>
          )}
        </span>
      </div>
      <div className="flex justify-between">
        <button
          className="btn mr-3"
          onClick={(e) => {
              getcode(credentials, e , setDisplay , Display , display );
          }}
        >
          {code}
        </button>
        <button className="m-2" onClick={() => Switch(!display)}>
          {Signin}
        </button>
      </div>
    </div>
  );
}

function Register({
  placeholder_E,
  placeholder_P,
  Signin,
  Switch,
  display,
  register,
  code,
}) {

  const [Display, setDisplay] = useState(true);
  const [Toggle, SetToggle] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    code: "",
    password1: "",
    password2: "",
  });
  return (
    <>
      {Display ? (
          <Credentials
            credentials={credentials}
            setCredentials={setCredentials}
            placeholder_E={placeholder_E}
            placeholder_P={placeholder_P}
            Signin={Signin}
            Switch={Switch}
            display={display}
            Display={Display}
            code={code}
            Toggle={Toggle}
            SetToggle={SetToggle}
            setDisplay={setDisplay}
            getcode={getcode}
          />
      ) : (
          <Auth
            credentials={credentials}
            Switch={Switch}
            register={register}
            setCredentials={setCredentials}
            code={code}
            createUser={createUser}
          />
      )}
    </>
  );
}
export default Register;
