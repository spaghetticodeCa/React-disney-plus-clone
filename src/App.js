import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Login from "./components/Login";
import "./App.css";
import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  // const usersCollectionRef = collection(db, "users");
  // const imagesCollectionRef = collection(db, "images");

  // const [newName, setNewName] = useState("");
  // const [newAge, setNewAge] = useState(0);

  // const [users, setUsers] = useState([]);
  // const [images, setImages] = useState([]);

  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  // };

  // const updateUser = async (id, age) => {
  //   const userDoc = doc(db, "users", id);
  //   const newFields = { age: age + 1 };
  //   await updateDoc(userDoc, newFields);
  //   setNewAge(age + 1);
  // };

  // const deleteUser = async (id) => {
  //   const userDoc = doc(db, "users", id);
  //   await deleteDoc(userDoc);
  // };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     console.log(users);
  //   };

  //   const getImages = async () => {
  //     const data = await getDocs(imagesCollectionRef);
  //     setImages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getImages();
  //   getUsers();
  // }, []);

  return (
    <div className="App">
      {/* <input
        placeholder="Name..."
        onChange={(event) => setNewName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => setNewAge(event.target.value)}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div>
            <h1>ID: {user.id} </h1>
            <h1>Name: {user.name} </h1>
            <h1>AGE: {user.age} </h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      })}
      {images.map((image) => {
        return <img src={image.image1} width="140px" height="140px" />;
      })} */}

      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
