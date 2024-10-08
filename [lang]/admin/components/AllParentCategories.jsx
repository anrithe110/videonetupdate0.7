"use client"
import React, { useState, useEffect } from "react";
import url from "@/libs/url.config";
function AllParentCategories() {
  const [categories, setCategories] = useState([]);
  const findParentCategories = async () => {
    try {
      const response = await fetch(`${url}/api/ParentCategory`);
      if (response.ok) {
        const data = await response.json();
        const categoriesArray = data.parentCategories;
        setCategories(categoriesArray);
      } else {
        console.error("Failed to fetch parent categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function Actions(props) {
    async function Delete(id) {
      if (confirm("Delete Category ?") == true) {
        try {
          const response = await fetch(`${url}/api/ParentCategory`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          });
          if (response.ok) {
          } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
          }
        } catch (error) {
          console.error('Network error or unexpected error:', error);
        }
        findParentCategories();
      }
    }

    return (
      <div className='flex justify-center gap-5 items-center'>
        <a href={`admin/editCategory/${props.editID}`}>
          <svg className='main-svg dark:stroke-[#02ab02] stroke-[#02ab02]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <button onClick={() => Delete(props.deleteID)}>
          <svg className='main-svg dark:stroke-[red] stroke-[red]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    )
  }
  function Item(props) {
    return (
      <tr>
        <td className='thname'>{props.name && `${props.name.en} - ${props.name.ge}`}</td>
        <td className='thactions'>
          <Actions editID={props.edit} deleteID={props.delete} />
        </td>
      </tr>
    )
  }

  useEffect(() => {
    findParentCategories();
  }, []);

  return (
    <>
      <table className="table">
        <thead className='w-full'>
          <tr>
            <th className='thname' scope="col">Name</th>
            <th className='thactions' scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <Item
              key={index}
              name={category.name}
              edit={category._id}
              delete={category._id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllParentCategories;