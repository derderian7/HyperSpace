import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [elements, setElements] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newElement, setNewElement] = useState("");
  const [editElement, setEditElement] = useState<number | null>(null);
  const [editElementName, setEditElementName] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchElements();
    }
  }, [isOpen]);

  const fetchElements = async () => {
    try {
      const response = await axios.get("http://localhost:3002/elements");
      setElements(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const addElement = async () => {
    try {
      await axios.post("http://localhost:3002/elements", { name: newElement });
      setNewElement("");
      fetchElements();
    } catch (error) {
      console.error("There was an error adding the data!", error);
    }
  };

  const updateElement = async (id: number) => {
    try {
      await axios.put(`http://localhost:3002/elements/${id}`, {
        name: editElementName,
      });
      setEditElement(null);
      setEditElementName("");
      fetchElements();
    } catch (error) {
      console.error("There was an error updating the data!", error);
    }
  };

  return (
    <div className="App">
      <div className="box">
        {!isOpen ? (
          <button className="open-modal-button" onClick={() => setIsOpen(true)}>
            Open Modal
          </button>
        ) : (
          <div className="modal">
            <h2>List of Elements</h2>
            <ul>
              {elements.map((element) => (
                <li key={element[0]}>
                  {editElement === element[0] ? (
                    <>
                      <input
                        type="text"
                        value={editElementName}
                        onChange={(e) => setEditElementName(e.target.value)}
                      />
                      <button onClick={() => updateElement(element[0])}>
                        Update
                      </button>
                    </>
                  ) : (
                    <>
                      {element[1]}
                      <button
                        onClick={() => {
                          setEditElement(element[0]);
                          setEditElementName(element[1]);
                        }}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
              placeholder="Add new element"
            />
            <button onClick={addElement}>Add Element</button>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
