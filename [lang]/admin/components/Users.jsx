"use client";
import React, { useState, useEffect, useRef } from "react";
import url from "@/libs/url.config";
import PopOut from "./mini/Popout";
import { useSession } from "next-auth/react";
function Users() {
  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState(false);
  const [role, setRole] = useState("");
  const [email, SetEmail] = useState("");
  const { data: session } = useSession();
  const find = useRef();
  const getUsers = async () => {
    const inputValue = find.current.value;
    if(inputValue.length == ""){
      setUser([]);
    }
    if (inputValue.length >= 2) {
      try {
        const res = await fetch(`${url}/api/Users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ find: inputValue }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUser(data.user);

      } catch (error) {
        console.log("Error loading users: ", error);
      }
    }
  };

  async function EditUser(email, role) {
    if (session.user.email === email) {
      alert("you cant change your role");
    } else {
      try {
        const res = await fetch(`${url}/api/Users`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, role }),
        });

        if (!res.ok) {
          throw new Error("faild");
        }
        setEdit(false);
        getUsers();
      } catch (error) {
        console.log("Error loading products: ", error);
      }
    }
  }

  function Item(props) {
    return (
      <tr>
        <td className="thname">
          <h1>{props.email}</h1>
        </td>
        <td className="thname">
          <h1>{props.name}</h1>
        </td>
        <td className="thname">
          <h1>{props.lastName}</h1>
        </td>
        <td className="thname">
          <h1>{props.role}</h1>
        </td>
        <td className="thname">
          <h1>{props.tel}</h1>
        </td>
        <td className="thactions">
          <button
            onClick={() => {
              setRole(props.role);
              SetEmail(props.email);
              setEdit(true);
            }}
          >
            <svg
              className="main-svg dark:stroke-[#02ab02] stroke-[#02ab02]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  }

  return (
    <>
      {edit ? (
        <PopOut text={"Edit user"} Close={() => setEdit(false)}>
          <div className="flex gap-7">
            <h1 className="p-3 text-xl">Select user type:</h1>
            <select
              defaultValue={role}
              className="btn"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </select>
            <button className="btn" onClick={() => EditUser(email, role)}>
              SAVE
            </button>
          </div>
        </PopOut>
      ) : null}
      <div className="flex">
        <h1 className="p-2  pr-5 text-lg">find users</h1>
        <input
          ref={find}
          onChange={() => {
            getUsers();
          }}
          type="text"
          className="inp"
          placeholder="Find by email"
        />
      </div>
      <div className="table-container">
        <table className="table">
          <thead className="w-full">
            <tr>
              <th className="thname" scope="col">
                email
              </th>
              <th className="thname" scope="col">
                Name
              </th>
              <th className="thname" scope="col">
                last name
              </th>
              <th className="thname" scope="col">
                role
              </th>
              <th className="thname" scope="col">
          tel
              </th>
              <th className="thname" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.map((i, index) => (
                <Item
                  key={index}
                  name={i.name}
                  lastName={i.lastName}
                  email={i.email}
                  tel={i.tel || "no info"}
                  role={i.role}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
