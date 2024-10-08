"use client"
import React, { useState, useEffect } from "react";
import url from "@/libs/url.config";
function AllBanners() {
  const [Banners, setBanners] = useState([]);
  const findBanners = async () => {
    try {
      const response = await fetch(`${url}/api/Banner`);
      if (response.ok) {
        const data = await response.json();
        const BannersArr = data.banner;
        setBanners(BannersArr);
      } else {
        console.error("Failed to fetch parent categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function Actions(props) {
    async function Delete(id) {
      if (confirm("Delete Banner ?") == true) {
        try {
          const response = await fetch(`${url}/api/Banner`, {
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
        findBanners();
      }
    }

    return (
      <div className='flex justify-center gap-5 items-center'>
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
      <tr >
        <td className="!p-0">
          <a className='bg-white flex items-center justify-center' href={props.item}>
            <img className="h-[50px]" src={`/banner/${props.img}`} />
          </a>
        </td>
        <td className='thname'>{props.name}</td>
        <td className='thactions'>
          <Actions editID={props.edit} deleteID={props.delete} />
        </td>
      </tr>
    )
  }

  useEffect(() => {
    findBanners();
  }, []);

  return (
    <>
      <table className="table max-w-2xl">
        <thead className='w-full'>
          <tr>
            <th className='thimg' scope="col">img</th>
            <th className='thname' scope="col">Name</th>
            <th className='thactions' scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Banners && Banners.map((category, index) => (
            <Item
              key={index}
              img={category.image[0]}
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

export default AllBanners;