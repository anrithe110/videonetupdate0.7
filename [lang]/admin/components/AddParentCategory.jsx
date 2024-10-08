import React, { useState, useEffect } from "react";
import Select from "react-select";
import url from "@/libs/url.config";

function AddParentCategory() {
  const [nameEN, setNameEN] = useState("");
  const [nameGE, setNameGE] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

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
          console.error("Failed to fetch brands:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const findParentCategories = async () => {
      try {
        const response = await fetch(`${url}/api/Category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategories(
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
        console.error("Error fetching categories:", error);
      }
    };

    findParentCategories();
    findBrands();
  }, []);

  const handleFeatureChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleFeatureChangeBrands = (selectedOptions) => {
    setSelectedBrands(selectedOptions);
  };

  async function addCategory() {
    const selectedCategories = selectedOptions.map((option) => ({
      url: option.url,
      name: option.label,
      _id: option.value,
    }));
    const selectedBrandData = selectedBrands.map((option) => ({
      _id: option.value,
      name: option.label,
    }));
    try {
      const response = await fetch(`${url}/api/ParentCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: { en: nameEN, ge: nameGE },
          categories: selectedCategories,
          brands: selectedBrandData,
        }),
      });

      if (response.ok) {
        alert("Parent Category added successfully");
        setNameEN("");
        setNameGE("");
        setSelectedOptions([]);
        setSelectedBrands([]);
      } else {
        alert("Failed to add Parent Category: " + response.statusText);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }

  return (
    <>
      <h1 className="m-5 mb-0">Add Parent Category</h1>
      <div className="inputpart">
        <div className="!flex !flex-col p-3 ">
          <input
            onChange={(e) => setNameEN(e.target.value)}
            value={nameEN}
            type="text"
            placeholder="Name In English"
            className="inp3 max-h-10 m-1"
          />
          <input
            onChange={(e) => setNameGE(e.target.value)}
            value={nameGE}
            type="text"
            placeholder="Name In Georgian"
            className="inp3 max-h-10 m-1"
          />
          <button
            className="btn mt-2"
            onClick={addCategory}
            disabled={
              !nameEN ||
              !nameGE ||
              selectedOptions.length === 0 ||
              selectedBrands.length === 0
            }
          >
            Save Parent Category
          </button>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <div className="bg m-2 p-3">
            <h1>Select Categories</h1>
            <div className="flex justify-center">
              <Select
                options={categories}
                isMulti
                isSearchable={true}
                className="select w-full"
                getOptionLabel={(option) =>
                  `${option.label.en} - ${option.label.ge}`
                }
                onChange={handleFeatureChange}
                placeholder="Select Subcategories"
              />
            </div>
          </div>
          <div className="bg m-2 p-3">
            <h1>Select Brands</h1>
            <div className="flex justify-center">
              <Select
                options={brands}
                isMulti
                isSearchable={true}
                className="select w-full"
                onChange={handleFeatureChangeBrands}
                placeholder="Select Brands"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddParentCategory;
