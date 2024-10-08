"use client"
import React, { useState, useEffect } from 'react';
import url from "@/libs/url.config";
function AddBrands() {
    const [name, setName] = useState("");
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
    }, [imageFiles]);

    const handleImageChange = ({ target: { files } }) => {
        handleFiles(files);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const newFiles = [];
        if (imageFiles.length + files.length > 1) {
            alert("Only one image allowed");
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            newFiles.push(file);
        }
        setImageFiles((prevFiles) => [...newFiles]);
    };

    function Imgs({ file, index, onRemove }) {
        return (
            <div className="imgs max-h-14" key={index}>
                <img src={URL.createObjectURL(file)} alt={`Image Preview ${index}`} />
                <button
                    className="absolute bottom-[-3.75rem] right-[-0.5rem]"
                    onClick={() => onRemove(index)} >
                    <svg className='main-svg dark:stroke-[red] stroke-[red]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        );
    }
    const handleRemoveImage = () => {
        setImageFiles([]);
    };

    async function addBrands() {
        const imageBase64Array = [];
        for (const imageFile of imageFiles) {
            const base64String = await convertImageToBase64(imageFile);
            imageBase64Array.push(base64String);
        }

        const requestBody = {
            images: imageBase64Array,
            name: name,
        };
        try {
            const response = await fetch(`${url}/api/Brands`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                alert("brand added successfully");
            } else {
                alert("Failed to add barnd");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function convertImageToBase64(imageFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
        });
    }
    return (
        <>
            <div
                className="EditProductAdmin max-h-[160px] min-h-[140px]"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {imageFiles.length > 0 && <Imgs file={imageFiles[0]} index={0} onRemove={handleRemoveImage} />}

            </div>
            <div className="inputpart">
                <div className="flex flex-col gap-3 pt-4">
                    <h1 style={{ fontSize: "20px" }}>Image should be 1000:500 PX </h1>
                    <label style={{ cursor: "pointer" }} htmlFor="upload-photo">
                        <h1 className="btn">Select or Drag & Drop an image</h1>
                    </label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleImageChange}
                        id="upload-photo"
                    />
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text" placeholder="Input name" className="inp" />
                </div>
                <div className="flex flex-col gap-3 pt-4 items-center">
                    <button className="btn" onClick={addBrands} disabled={!name || imageFiles.length !== 1}>
                        Add Brand
                    </button>
                </div>
            </div>
        </>
    );
}

export default AddBrands;