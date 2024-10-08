"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Select from "react-select";
import url from "@/libs/url.config";

function AddProduct() {
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [brandsMenu, setBrandsMenu] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [stats, setStats] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${url}/api/ParentCategory`, {
          cache: "no-store",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.parentCategories);
          setCategoryMenu(data.parentCategories);
        } else {
          console.error("Failed to fetch category");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!category) return;
      try {
        const response = await fetch(`${url}/api/findCategory`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_id: category }),
        });
        if (response.ok) {
          const data = await response.json();
          setCategoryData(data.category.findcategorybyid);
        } else {
          alert("Cannot find category");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCategoryData();
  }, [category]);

  const fetchBrands = async (url2) => {
    try {
      const response = await fetch(
        `${url}/api/ParentCategory/Brands?url=${url2}`,
        {
          cache: "no-store",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBrandsMenu(data.brands ? data.brands : []);
      } else {
        alert("Failed to get brands");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (parentCategory?.url && brandsMenu.length === 0) {
    fetchBrands(parentCategory?.url);
  }
  const handleImageChange = useCallback((event) => {
    handleFiles(event.target.files);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  }, []);

  const handleFiles = (files) => {
    if (imageFiles.length + files.length > 4) {
      alert("Maximum of 4 images allowed");
      return;
    }
    setImageFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleAddSpec = useCallback((value, name, statId) => {
    setStats((prevStats) => {
      const newStats = [...prevStats];
      const existingIndex = newStats.findIndex((item) => item.name === name);
      if (existingIndex === -1) {
        newStats.push({ name, value, id: statId });
      } else {
        newStats[existingIndex].value = value;
      }
      return newStats;
    });
  }, []);

  const addProduct = async () => {
    const imageBase64Array = await Promise.all(
      imageFiles.map((imageFile) => convertImageToBase64(imageFile))
    );

    const requestBody = {
      name,
      brand: brand || null,
      price,
      images: imageBase64Array,
      category: {
        url: parentCategory.url,
        url2: categoryData.url,
        _id: categoryData._id,
      },
      stats,
    };

    try {
      const response = await fetch(`${url}/api/Products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (response.status === 200) {
        alert("Product added successfully");
        setImageFiles([]);
        setName("");
        setPrice("");
        setCategory(null);
        setStats([]);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const convertImageToBase64 = (imageFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

  const handleUnselect = (set) => {
    set(null);
  };

  const foundCategory = categoryMenu.find(
    (category) => category._id === parentCategory?._id
  );

  foundCategory?.categories.map((i) => ({ value: i._id, label: i.name }));

  const parentCategoryOptions = useMemo(
    () =>
      categoryMenu.map((i) => ({ value: i._id, label: i.name, url: i.url })),
    [categoryMenu]
  );
  const brandOptions = useMemo(
    () => brandsMenu.map((i) => ({ value: i.name, label: i.name })),
    [brandsMenu]
  );

  return (
    <>
      <div
        className="EditProductAdmin max-h-[250px] min-h-[200px]"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {imageFiles.map((file, index) => (
          <ImgPreview
            key={index}
            file={file}
            index={index}
            onRemove={handleRemoveImage}
          />
        ))}
      </div>
      <div className="inputpart">
        <div className="flex flex-col gap-3 pt-4">
          <h1 style={{ fontSize: "20px" }}>
            Images should be 1:1 and a maximum of 4
          </h1>
          <label style={{ cursor: "pointer" }} htmlFor="upload-photo">
            <h1 className="btn">Select or Drag & Drop images</h1>
          </label>
          <input
            multiple
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleImageChange}
            id="upload-photo"
          />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Input name"
            className="inp"
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Input price in ₾"
            className="inp"
          />
          <div className="bg p-2">
            <h1 className="p-1">Select parent category:</h1>
            <Select
              id="category"
              instanceId
              className="select"
              isLoading={!categoryMenu.length}
              isClearable
              isSearchable
              getOptionLabel={(option) =>
                `${option?.label?.en} - ${option?.label?.ge}`
              }
              options={parentCategoryOptions}
              onChange={(value) => {
                setParentCategory({
                  _id: value ? value.value : null,
                  url: value ? value.url : null,
                });
                setBrandsMenu([]);
                handleUnselect(setCategory);
              }}
            />
            <h1 className="p-1 pt-2">Select category:</h1>
            <Select
              id="category"
              instanceId
              className="select"
              isLoading={
                foundCategory?.categories.map((i) => ({
                  value: i.url,
                  label: i.name,
                })).length === 0
              }
              isClearable
              isSearchable
              getOptionLabel={(option) =>
                `${option.label.en} - ${option.label.ge}`
              }
              options={foundCategory?.categories.map((i) => ({
                value: i._id,
                label: i.name,
              }))}
              onChange={(value) => setCategory(value ? value.value : null)}
            />
          </div>{" "}
          <div className="bg p-2">
            <h1 className="p-1">Select brand:</h1>
            <Select
              id="brand"
              instanceId
              className="select"
              isLoading={!brandsMenu.length}
              isClearable
              isSearchable
              options={brandOptions}
              onChange={(value) => setBrand(value ? value.value : null)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4 items-center">
          {category && (
            <StatsPart selectedCategory={category} onAddSpec={handleAddSpec} />
          )}
          <button
            className="btn"
            onClick={addProduct}
            disabled={!name || !price || !imageFiles.length || !brand }
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
}

function StatsPart({ selectedCategory, onAddSpec }) {
  const [statsName, setStatsName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/findCategory`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_id: selectedCategory }),
        });
        if (response.ok) {
          const data = await response.json();
          setStatsName(data.category.findcategorybyid.stats);
        } else {
          alert("Cannot find category");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [selectedCategory]);
  return (
    <div className="w-full pb-4">
      <div className="flex text-lg flex-col pt-2 gap-1 w-full h-fit">
        <div className="w-full m-[0px,auto] justify-start">
          <div className="itemspec w-full h-fit p-3">
            <h1 className="p-2 pt-0">Additional Specifications:</h1>
            {statsName.length > 0 &&
              statsName.map((stat, index) => (
                <StatInput
                  key={index}
                  name={stat.name}
                  statId={stat.id}
                  options={stat.statOptions}
                  onAddSpec={onAddSpec}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatInput({ name, statId, options, onAddSpec }) {
  return (
    <div className="bg p-2">
      <h1 className="p-1">{`${name && name.en} - ${name && name.ge}`}:</h1>
      {options.length != 0 ? (
        <Select
          id="option bg"
          instanceId
          className="select"
          isLoading={!options.length}
          isClearable
          isSearchable
          options={options}
          getOptionLabel={(option) => `${option.option}`}
          onChange={(value) => {
            onAddSpec(value != null ? value.option : "", name, statId);
          }}
        />
      ) : (
        <input
          onChange={(e) => onAddSpec(e.target.value, name, statId)}
          type="text"
          placeholder="stat name"
          className="inp"
        />
      )}
    </div>
  );
}

function ImgPreview({ file, index, onRemove }) {
  return (
    <div className="imgs" key={index}>
      <img src={URL.createObjectURL(file)} alt={`Image Preview ${index}`} />
      <button
        className="absolute bottom-5 right-6"
        onClick={() => onRemove(index)}
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
    </div>
  );
}

export default AddProduct;
