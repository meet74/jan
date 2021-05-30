import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";

function AddProduct() {
  const [selectCategory, setSelectCategory] = useState([]);
  const [shown, setShown] = useState(true);
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [uploadingImage, setUploadingImage] = useState(null);
  useEffect(() => {
    var select = db
      .collection("Categories")
      .doc("medicine")
      .onSnapshot(function (doc) {
        if (doc.exists) {
          setSelectCategory(doc.data().patna);
        }
      });
    return () => {
      select();
    };
  }, []);

  useEffect(() => {
    if (category !== null) {
      db.collection("Products")
        .doc(category)
        .onSnapshot(function (doc) {
          if (doc.exists) {
            console.log(doc.data().subCategory);
            setData(doc.data().subCategory);
          }
        });
    }
  }, [category]);

  const handleUpload = async ({ index }) => {
    // Create the file metadata
    console.log(index);
    if (file[0] !== undefined) {
      var metadata = {
        contentType: "image/jpeg",
      };
      var storageRef = firebase.storage().ref();
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef
        .child("product" + category + file[0].name)
        .put(file[0], metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUploadingImage(downloadURL);
          });
        }
      );
    }
  };

  const handleAddItems = () => {
    let x = {
      description: description,
      id: id,
      image: uploadingImage,
      pills: quantity,
      price: price,
      title: title,
    };
    data.push(x);
    db.collection("Products")
      .doc(category)
      .set({ subCategory: data }, { merge: true })
      .then(() => alert("Product Added"));
  };
  return (
    <div>
      <div>
        {shown ? (
          selectCategory !== [] ? (
            selectCategory.map((item) => {
              return (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    onClick={() => {
                      setShown(false);
                      setCategory(item.id);
                    }}
                  >
                    {item.title}
                  </button>
                </div>
              );
            })
          ) : (
            "nothing"
          )
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <input
              type="text"
              placeholder="Id"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
            Image
            <input type="file" onChange={(e) => setFile(e.target.files)} />
            <button onClick={handleUpload}>Upload</button>
            <input
              type="text"
              placeholder="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
            <input
              type="text"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <button onClick={handleAddItems}>Add Product</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
