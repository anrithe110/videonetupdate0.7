// import React, { useEffect, useState } from "react";
// import url from "@/libs/url.config";

// export const EditProfile = ({ e, user , session }) => {
//   const [credentials, setCredentials] = useState({
//     email: session?.user?.email || "",
//     name: session?.user?.name || "",
//     lastname: session?.user?.lastname || "",
//     tel: session?.user?.tel || "",
//   });
//   const [credentials2, setCredentials2] = useState({
//     email: session?.user?.email || "",
//     name: session?.user?.name || "",
//     lastname: session?.user?.lastname || "",
//     tel: session?.user?.tel || "",
//   });

//   setCredentials({
//     email: session.user.email || user?.email,
//     name: user?.name || "",
//     lastname: user?.lastName || "",
//     tel: user?.tel || "",
//   });
//   setCredentials2({
//     email: session.user.email || user?.email,
//     name: user?.name || "",
//     lastname: user?.lastName || "",
//     tel: user?.tel || "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   async function updateInfo() {
//     try {
//       const response = await fetch(`${url}/api/Users/updateInfo`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (response.ok) {
//         alert("Data changed successfully");
//       } else {
//         const errorData = await response.json();
//         const errorMessage =
//           errorData.message || "An unexpected error occurred";
//         alert(`Error: ${errorMessage}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         updateInfo();
//       }}
//     >
//       {" "}
//       <div className="flex flex-col max-w-[400px] gap-5">
//         <div className="p-3 pt-0 pb-0 pl-0">
//           <h1>{e("editProfile")}</h1>
//         </div>
//         <div className="flex flex-col">
//           <input
//             type="text"
//             name="name"
//             value={credentials.name}
//             onChange={handleChange}
//             placeholder={e("name")}
//             className="inp"
//           />
//         </div>
//         <div className="flex flex-col">
//           <input
//             type="text"
//             name="lastname"
//             value={credentials.lastname}
//             onChange={handleChange}
//             placeholder={e("lastName")}
//             className="inp"
//           />
//         </div>
//         <div className="flex flex-col">
//           <input
//             type="number"
//             name="tel"
//             value={credentials.tel}
//             onChange={handleChange}
//             placeholder={e("tel")}
//             className="inp"
//           />
//         </div>
//         <div className="p-3 pl-0 pr-0 pt-0">
//           <button
//             disabled={
//               !credentials.name ||
//               !credentials.lastname ||
//               !credentials.tel ||
//               (credentials.name === credentials2.name &&
//                 credentials.lastname === credentials2.lastname &&
//                 credentials.tel === credentials2.tel)
//             }
//            className=" !p-3 flex justify-around items-center btn !w-full"
//           >
//             <h1>{e("savechanges")}</h1>
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };
import React, { useEffect, useState } from "react";
import url from "@/libs/url.config";

export const EditProfile = ({ e, user, session }) => {
  const [credentials, setCredentials] = useState({
    email: session?.user?.email || "",
    name: session?.user?.name || "",
    lastname: session?.user?.lastname || "",
    tel: session?.user?.tel || "",
  });

  const [credentials2, setCredentials2] = useState(credentials);

  useEffect(() => {
    if (user) {
      const updatedCredentials = {
        email: session.user.email || user?.email,
        name: user?.name || "",
        lastname: user?.lastName || "",
        tel: user?.tel || "",
      };

      setCredentials(updatedCredentials);
      setCredentials2(updatedCredentials);
    }
  }, [user, session.user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  async function updateInfo() {
    try {
      const response = await fetch(`${url}/api/Users/updateInfo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        alert("Data changed successfully");
        setCredentials2(credentials); // Sync the credentials2 with the updated data
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "An unexpected error occurred";
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateInfo();
      }}
    >
      <div className="flex flex-col max-w-[400px] gap-5">
        <div className="p-3 pt-0 pb-0 pl-0">
          <h1>{e("editProfile")}</h1>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            placeholder={e("name")}
            className="inp"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            name="lastname"
            value={credentials.lastname}
            onChange={handleChange}
            placeholder={e("lastName")}
            className="inp"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="number"
            name="tel"
            value={credentials.tel}
            onChange={handleChange}
            placeholder={e("tel")}
            className="inp"
          />
        </div>
        <div className="p-3 pl-0 pr-0 pt-0">
          <button
            disabled={
              !credentials.name ||
              !credentials.lastname ||
              !credentials.tel ||
              (credentials.name === credentials2.name &&
                credentials.lastname === credentials2.lastname &&
                credentials.tel === credentials2.tel)
            }
            className="!p-3 flex justify-around items-center btn !w-full"
          >
            <h1>{e("savechanges")}</h1>
          </button>
        </div>
      </div>
    </form>
  );
};
