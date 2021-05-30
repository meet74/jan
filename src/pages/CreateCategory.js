import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase";

function CreateCategory() {
  const [allCategory, setAllCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [file, setFile] = useState();
  const [uploadingImage, setUploadingImage] = useState();

  useEffect(() => {
    var select = db
      .collection("Categories")
      .doc("medicine")
      .onSnapshot(function (doc) {
        if (doc.exists) {
          setAllCategory(doc.data().patna);
          console.log(doc.data().patna);
        }
      });
    return () => {
      select();
    };
  }, []);

  const handleUpload = () => {
    // Create the file metadata
    if (file[0] !== undefined) {
      var metadata = {
        contentType: "image/jpeg",
      };
      var storageRef = firebase.storage().ref();
      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef
        .child("Category/" + file[0].name)
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

  const handleCreate = () => {
    let x = {
      id: id,
      title: category,
      image: uploadingImage,
    };

    allCategory.push(x);
    db.collection("Categories")
      .doc("medicine")
      .set({ patna: allCategory }, { merge: true })
      .then(() => {
        db.collection("Products")
          .doc(id)
          .set({ subCategory: [] }, { merge: true });
      });
  };
  return (
    <div>
      Image
      <input type="file" onChange={(e) => setFile(e.target.files)} />
      <button onClick={handleUpload}>upload</button>
      <input type="text" onChange={(e) => setCategory(e.target.value)} />
      <input type="text" onChange={(e) => setId(e.target.value)} />
      <button onClick={handleCreate}>create</button>
    </div>
  );
}

export default CreateCategory;
