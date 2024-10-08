"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import PopOut from "../../components/mini/Popout";
import Navbar from "../../components/mini/Navbar";
import { useParams } from "next/navigation";
import EditButton from "../../components/mini/EditButton";
import url from "@/libs/url.config";
const findStatByID = (category, id) => {
  const items = category ? category.find((i) => i.id === id) : undefined;
  return items?.statOptions ?  items?.statOptions : undefined
};
function EditProductPage() {
  const router = useParams();
  const { EditProduct: id } = router;
  const [EditPopOut, setEditPopOut] = useState(false);
  const [EditPopOutImg, setEditPopOutImg] = useState(false);
  const [change, setChange] = useState({});
  const [product, setProduct] = useState([]);
  const [Category, setCategory] = useState();
  const [CategoryMenu, setCategoryMenu] = useState([]);
  const [BrandsMenu, setBrandsMenu] = useState([]);
  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const response = await fetch(`${url}/api/Category`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }

        const data = await response.json();
        setCategoryMenu(data.category);
      } catch (error) {
        console.log("Error loading category: ", error);
      }
    };
    findproduct();
    if (CategoryMenu.length === 0) {
      fetchcategory();
    }
  }, [CategoryMenu]);

  async function findproduct() {
    if (id && id !== undefined) {
      const response = await fetch(`${url}/api/Products?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
        GetCategories();
      } else {
        throw new Error("Failed to find product");
      }
    }
  }
  const GetCategories = async () => {
    try {
      const categoryResponse = await fetch(`${url}/api/Category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (categoryResponse.ok) {
        const data = await categoryResponse.json();
        const stats = data.category.find(
          (i) => i._id === product?.category?._id
        );
        setCategory(stats);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const GetParentCategories = async () => {
    try {
      const categoryResponse = await fetch(
        `${url}/api/ParentCategory/Brands/?url=${product?.category?.url}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (categoryResponse.ok) {
        const data = await categoryResponse.json();
        setBrandsMenu(data.brands);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  function PopOutImg() {
    const [imageFiles, setImageFiles] = useState([]);
    const handleImageChange = (event) => {
      const files = event.target.files;
      handleFiles(files);
    };

    const handleDrop = (event) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      handleFiles(files);
    };

    const handleFiles = (files) => {
      const newFiles = [];
      if (imageFiles.length + files.length > 4 - product.images.length) {
        alert("Maximum of 4 images allowed");
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newFiles.push(file);
      }
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveImage = (index) => {
      setImageFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles.splice(index, 1);
        return newFiles;
      });
    };

    async function convertImageToBase64(imageFile) {
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    }
    const imageBase64Array = [];
    useEffect(() => {
      async function imgs(imageBase64Array) {
        for (const imageFile of imageFiles) {
          const base64String = await convertImageToBase64(imageFile);
          imageBase64Array.push(base64String);
        }
      }
      imgs(imageBase64Array);
    }, [imageFiles]);
    async function EDIT() {
      const Data = {
        productId: id,
        change: "images",
        images: imageBase64Array,
      };
      try {
        const response = await fetch(`${url}/api/Products`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        if (response.status == 200) {
          alert("successfully");
          setEditPopOutImg(false);
          setEditPopOut(false);
          findproduct();
        } else if (response.status == 400) {
          const data = await response.json();
          alert(data.message);
          setEditPopOut(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    return (
      <>
        <div className="popOut  xl:right-[30%] xl:left-[30%] md:right-[20%] md:left-[20%] left-[10%] right-[10%] top-28">
          <div className="flex flex-row-reverse">
            <button
              className="btn"
              onClick={() => {
                setEditPopOutImg(false);
                setChange({});
              }}
            >
              &#x2715;
            </button>
          </div>
          <div className="m-2">
            <div
              className="EditProductAdmin !gap-0 max-h-[140px] min-h-[140px] pt-1"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {imageFiles.map((file, index) => (
                <Imgs
                  className="!max-w-28 "
                  key={index}
                  src={URL.createObjectURL(file)}
                  index={index}
                  OnClick={() => handleRemoveImage(index)}
                />
              ))}
            </div>
            <h1 style={{ fontSize: "20px" }}>
              Images should be 1:1 and a maximum of 4
            </h1>
            <div className="flex justify-between">
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
              <button className="btn" onClick={EDIT}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  function PopOutEdit() {
    const [value, setValue] = useState("");
    const statOptions = BrandsMenu.map((manufacturer) => ({
      option: manufacturer.name,
      _id: manufacturer._id,
    }));

    const options =
      findStatByID(Category?.stats, change.id) !== undefined
        ? findStatByID(Category?.stats, change.id)
        : statOptions;

    console.log(options , findStatByID(Category?.stats, change.id) );
    const Data = {
      productId: id,
      changeId: change.id,
      value: value,
      change: change.change ? change.change : null,
    };
    async function EDIT() {
      if (value !== "" || undefined || null) {
        try {
          const response = await fetch(`${url}/api/Products`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Data),
          });
          if (response.status == 200) {
            alert("Edited successfully");
            setEditPopOut(false);
            findproduct();
          } else if (response.status == 400) {
            const data = await response.json();
            alert(data.message);
            findproduct();
            setEditPopOut(false);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        alert("input value");
      }
    }

    return (
      <PopOut
        text="Edit:"
        Close={() => {
          setEditPopOut(false);
          setChange({});
          setBrandsMenu([])
        }}
      >
        <div className="bg flex flex-col gap-2 max-w-[98%]">
          <h2 className="p-1">
            {`${change.name.en ? change.name.en : change.name} ${
              change.name.ge ? "-" : ""
            }
            ${change.name.ge ? change.name.ge : ""}`}
            :
          </h2>
          {options && options.length > 0 ? (
            <Select
              id="option-bg"
              instanceId
              className="select p-1"
              isClearable
              isSearchable
              options={options}
              getOptionLabel={(option) => `${option.option}`}
              onChange={(selectedOption) => {
                setValue(selectedOption ? selectedOption.option : "");
              }}
            />
          ) : (
            <input
              onChange={(e) => setValue(e.target.value)}
              className="inp p-1"
            />
          )}
          <button className="btn m-1" onClick={EDIT}>
            SAVE
          </button>
        </div>
      </PopOut>
    );
  }

  function StatsPart({ stats }) {
    return (
      <div className="w-full pb-4">
        <div className="flex text-lg flex-col pt-2 gap-1  w-full h-fit">
          <div className="w-full m-[0px,auto]  justify-start">
            <div className="itemspec w-full h-fit p-3">
              <h1 className="p-2 pt-0">დამატებითი მახასიათებლები შეცვლა:</h1>
              {stats &&
                stats.length > 0 &&
                stats.map((stat, index) => (
                  <Stats
                    name={stat.name}
                    key={index}
                    value={stat.value}
                    id={stat.id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Stats(props) {
    return (
      <div className="stats">
        <div className="min-w-56 max-w-44">
          <h1>{`${props.name.en} - ${props.name.ge}`}:</h1>
        </div>
        <h1>{props.value}</h1>
        <EditButton
          click={() => {
            setEditPopOut(true);
            setChange({ id: props.id, name: props.name, change: "stat" });
            setBrandsMenu([])
          }}
        />
      </div>
    );
  }

  async function deleteimg(imgId) {
    const Data = {
      productId: id,
      imgId: imgId,
      change: "DeleteImg",
    };
    if (confirm("Delete image?") == true) {
      try {
        const response = await fetch(`${url}/api/Products`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        if (response.status == 200) {
          alert("edited successfully");
          findproduct();
        } else if (response.status == 400) {
          const data = await response.json();
          alert(data.message);
          findproduct();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  function Imgs({ src, index, OnClick, className }) {
    return (
      <div className={`imgs`} key={index}>
        <img
          src={src}
          className={`${className}`}
          alt={`Image Preview ${index}`}
        />
        <button className="absolute bottom-5 right-6" onClick={() => OnClick()}>
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

  return (
    <>
      <Navbar />
      <div className="min-h-[1000px] pt-16">
        <div className="items-center top-auto w-full h-fit">
          <div className="main  w-full m-[0px,auto] max-w-7xl ">
            <div className="EditProductAdmin max-h-[250px] min-h-[200px]">
              {product.images &&
                product.images.map((i, index) => (
                  <Imgs
                    OnClick={() => deleteimg(i._id)}
                    src={`/images/${i.img}`}
                    key={index}
                    index={index}
                  />
                ))}
            </div>
            <button
              className="btn mt-3"
              onClick={() => {
                setEditPopOutImg(true);
                setEditPopOut(false);
              }}
            >
              add images
            </button>
            <div className="inputpart">
              {EditPopOut ? <PopOutEdit /> : null}
              {EditPopOutImg ? <PopOutImg /> : null}
              <div className="flex flex-col gap-3 pt-4">
                <div className="stats">
                  <h1>name - სახელი:</h1>
                  <h1>{product.name}</h1>
                  <EditButton
                    click={() => {
                      setEditPopOut(true);
                      setChange({
                        _id: product._id,
                        name: "name - სახელი",
                        change: "name",
                      });
                      setBrandsMenu([])
                    }}
                  />
                </div>
                <div className="stats">
                  <h1>price - ფასი:</h1>
                  <h1>{product.price} ₾</h1>
                  <EditButton
                    click={() => {
                      setEditPopOut(true);
                      setChange({
                        _id: product._id,
                        name: "price - ფასი",
                        change: "price",
                      });
                      setBrandsMenu([])
                    }}
                  />
                </div>
                <div className="stats">
                  <h1>brand - ბრენდი:</h1>
                  <h1>{product.brand}</h1>
                  <EditButton
                    click={() => {
                      setEditPopOut(true);
                      setChange({
                        _id: product._id,
                        name: "brand - ბრენდი",
                        change: "brand",
                      });
                      GetParentCategories();
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4 items-center">
                <StatsPart stats={product.stats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProductPage;
