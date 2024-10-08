import fs from "fs/promises";

// imagesArr  ===  [ { img: '3cd48745-8450-487b-8d14-015f73a00574.png' } ] მაგალითი 

async function DeleteItem(imagesArr, filePath) {
  try {
    console.log(imagesArr);
    if (imagesArr && Array.isArray(imagesArr) && imagesArr.length > 0) {
      for (let i = 0; i < Math.min(imagesArr.length, 4); i++) {
        const image = imagesArr[i].img; 
        if (image) {
          const file = filePath + image;
          try {
            await fs.unlink(file);
          } catch (unlinkErr) {
            console.log("Error deleting file:", unlinkErr);
          }
        } else {
          console.log("Image property not found:", imagesArr[i]);
        }
      }
    }
    console.log("Item deleted");

  } catch (err) {
    console.log("Error:", err);
  }
}

export default DeleteItem;
