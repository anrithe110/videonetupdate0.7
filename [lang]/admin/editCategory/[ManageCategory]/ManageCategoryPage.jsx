"use client";
import Navbar from "../../components/mini/Navbar";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import url from "@/libs/url.config";

function ManageCategoryPage() {
  const router = useParams();
  const { ManageCategory: id } = router;
  const [Categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [maincategory, setMainCategory] = useState();
  const [categories1, setCategories1] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptions2, setSelectedOptions2] = useState([]);
  const [brands, setBrands] = useState([]);
  const [BrandsInCategory, setBrandsInCategory] = useState([]);
  const findCategoryBrands = async () => {
    try {
      const response = await fetch(
        `${url}/api/ParentCategory/Brands?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBrandsInCategory(
          data.brands.map((i) => ({
            _id: i._id,
            name: i.name,
          }))
        );
      } else {
        console.error(
          "Failed to fetch parent categories:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    findCategoryBrands();
  }, []);

  useEffect(() => {
    const findBrands = async () => {
      try {
        const response = await fetch(`${url}/api/Brands`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBrands(
            data.brands.map((i) => ({
              value: i._id,
              label: i.name,
              url: i.url,
            }))
          );
        } else {
          console.error(
            "Failed to fetch parent categories:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    findBrands();
  }, []);

  async function Deletebrand(id2) {
    if (confirm("Delete Brand ?")) {
      try {
        const response = await fetch(`${url}/api/ParentCategory/Brands`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            stats_id: id2,
            forwhat: "removeBrand",
            newStats: [],
          }),
        });
        if (response.ok) {
          findCategoryBrands();
        } else {
          alert("Failed to update Parent Category");
          findCategoryBrands();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
  async function addBrands() {
    const selected = selectedOptions2.map((option) => ({
      _id: option.value,
      name: option.label,
    }));
    try {
      const response = await fetch(`${url}/api/ParentCategory/Brands`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          stats_id: 1,
          forwhat: "addBrand",
          newStats: selected,
        }),
      });

      if (response.ok) {
        findCategoryBrands();
      } else if (response.status === 409) {
        console.log(response);
        alert("it already exixts");
      } else {
        alert("idk");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const findCategoriesToAdd = async () => {
    try {
      const response = await fetch(`${url}/api/Category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories1(
          data.category.map((i) => ({
            value: i._id,
            label: {
              en: i.name.en,
              ge: i.name.ge,
            },
            url: i.url,
          }))
        );
      } else {
        console.error(
          "Failed to fetch parent categories:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const findParentCategories = async () => {
    if (id !== undefined && id !== null) {
      try {
        const response = await fetch(`${url}/api/findCategoryId?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data.findcategory.categories);
          setName(data.findcategory.name);
          setMainCategory(data.findcategory._id);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  async function deleteAndRemoveCategory(id, id2) {
    if (confirm("Remove Category?") === true) {
      try {
        const patchResponse = await fetch(`${url}/api/ParentCategory`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, id2 }),
        });
        if (patchResponse.ok) {
          alert("Parent category updated successfully");
          findParentCategories();
          findCategoriesToAdd();
        } else {
          const patchErrorData = await patchResponse.json();
          console.error(
            "Error updating parent category:",
            patchErrorData.message
          );
          findParentCategories();
          findCategoriesToAdd();
        }
      } catch (error) {
        console.error("Network error or unexpected error:", error);
      }
    }
  }

  async function PatchCategory() {
    const selected = selectedOptions.map((option) => ({
      _id: option.value,
      name: option.label,
      url: option.url,
    }));
    console.log(selected)
    try {
      const response = await fetch(`${url}/api/ParentCategory`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          categories: selected,
        }),
      });
      if (response.ok) {
      } else {
        const error = await response.json()
        alert(error.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    findParentCategories();
    findCategoriesToAdd();
  }

  useEffect(() => {
    findParentCategories();
    findCategoriesToAdd();
  }, [id]);

  const handleFeatureChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  const handleFeatureChange2 = (selectedOptions) => {
    setSelectedOptions2(selectedOptions);
  };
  function Actions({ deleteID }) {
    return (
      <div className="flex justify-center gap-5 items-center">
        {deleteID && (
          <button
            onClick={() => deleteAndRemoveCategory(deleteID, maincategory)}
          >
            <svg
              className="main-svg dark:stroke-[red] stroke-[red]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }

  function Item({ name, deleteID }) {
 
    return (
      <tr>
        <td className="thname">{name && `${name.en} - ${name.ge}`}</td>
        <td className="thactions">
          <Actions deleteID={deleteID} />
        </td>
      </tr>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[1000px]">
        <div className="items-center top-auto w-full h-fit">
          <div className="main w-full m-[0px,auto] max-w-7xl ">
            <div className="w-full adminContent">
              <h1 className="p-2">
                Category Name: {name && `${name.en} - ${name.ge}`}
              </h1>
              <hr className="m-3 ml-0 mr-0" />
              <h1 className="p-2">brands</h1>
              <div className="flex gap-3 w-full">
                <div className="w-full grid pt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  {   console.log(BrandsInCategory)}
                  {BrandsInCategory?.map((i, Index) => (
                    <div
                      key={Index}
                      className="flex h-12 bg2 items-center justify-between"
                    >
                      <h1 className="w-full">{i.name}</h1>
                      <button onClick={() => Deletebrand(i._id)}>
                        <svg
                          className="main-svg !w-5 dark:stroke-[red] stroke-[red]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg p-2">
                  <h1 className="p-2 pl-0">Select Brands to add</h1>
                  <Select
                    options={brands}
                    isMulti
                    instanceId
                    isSearchable={true}
                    className="select  pb-3 w-[400px]"
                    onChange={handleFeatureChange2}
                    placeholder="Select Brands"
                  />
                  <button
                    className="btn"
                    disabled={selectedOptions2.length === 0}
                    onClick={addBrands}
                  >
                    add brands
                  </button>
                </div>
              </div>
              <hr className="m-7 ml-0 mr-0" />
              <div className="editCategory">
                <table className="table">
                  <thead className="w-full">
                    <tr>
                      <th className="thname" scope="col">
                        Name
                      </th>
                      <th className="thactions" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Categories.map((category, index) => (
                      <Item
                        key={index}
                        name={category.name}
                        deleteID={category._id}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="bg p-2">
                  <h1 className="p-2 pl-0">Select Categories to add</h1>
                  <Select
                    options={categories1}
                    isMulti
                    className="select"
                    onChange={handleFeatureChange}
                    getOptionLabel={(option) =>
                      `${option.label.en} - ${option.label.ge}`
                    }
                    placeholder="Select Subcategories"
                    instanceId
                  />
                  <button
                    disabled={selectedOptions.length === 0}
                    onClick={() => PatchCategory()}
                    className="btn mt-3"
                  >
                    ADD categories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageCategoryPage;
