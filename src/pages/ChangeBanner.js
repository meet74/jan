import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase";

function ChangeBanner() {
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(null);
  useEffect(() => {
    var banner = db
      .collection("Banners")
      .doc("j0RWufOiTkBsVkcNdHuT")
      .onSnapshot(function (doc) {
        if (doc.exists) {
          setData(doc.data().banners);

          console.log(doc.data());
        }
      });
    return () => {
      banner();
    };
  }, []);

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
        .child("banners/" + file[0].name)
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
            let x = data;
            x[index] = downloadURL;
            setData(x);
            db.collection("Banners")
              .doc("j0RWufOiTkBsVkcNdHuT")
              .set({ banners: data }, { merge: true });
          });
        }
      );
    }
  };
  function handleDelete({ index }) {
    const x = data.filter((item) => item !== data[index]);
    db.collection("Banners").doc("j0RWufOiTkBsVkcNdHuT").set({ banners: x });
    setData(x);
  }
  const handleAdd = () => {
    data.push(null);
    db.collection("Banners")
      .doc("j0RWufOiTkBsVkcNdHuT")
      .set({ banners: data }, { merge: true });
  };
  return (
    <div>
      <div>
        {data !== []
          ? data.map((item, index) => {
              return (
                <div key={index}>
                  <img style={{ width: 626 }} src={item} />
                  <div>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files)}
                    />
                    <button onClick={() => handleUpload({ index })}>
                      Upload
                    </button>
                    <button onClick={() => handleDelete({ index })}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <button onClick={handleAdd}> Add Banner </button>
    </div>
  );
}

export default ChangeBanner;
