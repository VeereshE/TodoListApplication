import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { addUser, delectUser, getUser, updateUser } from "../redux/useSlice";

export default function Todo() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const { data } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("todos"));
    if (storedData) {
      dispatch(getUser(storedData));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  };

  return (
    <div className="App">
      <h1 className="heading">TodoList Application</h1>
      <hr />
      <div className="text_input_container">
        <p className="paragraph">List for all Todo Activities</p>
        <div className="input_button">
          <input
            type="text"
            className="input_container"
            placeholder="Enter your todo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              if (userId) {
                dispatch(
                  updateUser({
                    id: userId,
                    name,
                  })
                );
                setName("");
              } else {
                dispatch(addUser({ name, timestamp: getCurrentDateTime() }));
                setName("");
              }
            }}
          >
            {userId ? "Update" : "Save"}
          </button>
          <button onClick={() => dispatch(getUser())}>All Todo</button>
        </div>
        <div className="list_container_todo">
          {data.length === 0 ? (
            <h2>Empty Todo List, please enter your todo</h2>
          ) : (
            data.map((user, index) => (
              <div className="text_edit_container" key={index}>
                <p>{user.name}</p>
                <div className="deleet_edit_container">
                  <button onClick={() => dispatch(delectUser(user.id))}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setUserId(user.id);
                      setName(user.name);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
