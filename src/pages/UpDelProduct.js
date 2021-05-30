import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import UpdateComponent from "./UpdateComponent";

function UpDelProduct() {
  const [selectCategory, setSelectCategory] = useState([]);
  const [shown, setShown] = useState(true);
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([]);

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

  const handleUpdate = () => {
    db.collection("Products")
      .doc(category)
      .set({ subCategory: data }, { merge: true });
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
          <div>
            {data !== [] ? (
              <div>
                {" "}
                {data.map((item, index) => {
                  return (
                    <UpdateComponent
                      key={index}
                      item={item}
                      category={category}
                      data={data}
                      index={index}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpDelProduct;
