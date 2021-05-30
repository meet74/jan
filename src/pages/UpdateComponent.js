import React, { useState } from "react";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
import { db } from "../firebase";

function UpdateComponent({ index, item, category, data }) {
  const [description, setDescription] = useState(item.description);
  const [id, setId] = useState(item.id);
  const [quantity, setQuantity] = useState(item.pills);
  const [price, setPrice] = useState(item.price);
  const [title, setTitle] = useState(item.title);
  const [image, setImage] = useState(item.image);
  const [ind, setInd] = useState(index);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState(category);
  const handleUpload = () => {
    console.log(index);
    if (file[0] !== undefined) {
      var metadata = {
        contentType: "image/jpeg",
      };
      var storageRef = firebase.storage().ref();
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef
        .child("product" + categories + file[0].name)
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
            setImage(downloadURL);
          });
        }
      );
    }
  };
  const handleUpdate = () => {
    let x = {
      description: description,
      id: id,
      image: image,
      price: price,
      title: title,
    };
    console.log(index);
    data[index] = x;
    db.collection("Products")
      .doc(categories)
      .set({ subCategory: data }, { merge: true })
      .then(() => alert("updated"));
  };

  const handleDelete = () => {
    //const x = data.filter((it) => it !== data[index]);
    console.log(index);
    if (index > -1) {
      data.splice(index, 1);
      db.collection("Products").doc(categories).set({ subCategory: data });
    }
  };
  return (
    <div>
      <div key={index}>
        <img src={image} style={{ width: 200 }} />
        <input type="file" onChange={(e) => setFile(e.target.files)} />
        <button onClick={() => handleUpload(index)}>Upload</button>
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
      </div>
      <Button onClick={handleUpdate} variant="outlined" color="primary">
        Update
      </Button>
      <Button onClick={handleDelete} variant="outlined" color="primary">
        Delete
      </Button>
    </div>
  );
}

export default UpdateComponent;
