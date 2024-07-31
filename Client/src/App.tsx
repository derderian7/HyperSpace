import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State to store the list of elements
  const [elements, setElements] = useState([]);
  // State to manage the visibility of the modal
  const [isOpen, setIsOpen] = useState(false);
  // State to manage the new element input
  const [newElement, setNewElement] = useState("");
  // State to manage the ID of the element being edited
  const [editElement, setEditElement] = useState<number | null>(null);
  // State to manage the name of the element being edited
  const [editElementName, setEditElementName] = useState("");

  // useEffect hook to fetch elements when the modal is opened
  useEffect(() => {
    if (isOpen) {
      fetchElements();
    }
  }, [isOpen]);

  // Function to fetch elements from the server
  const fetchElements = async () => {
    try {
      const response = await axios.get("http://localhost:3002/elements");
      setElements(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Function to add a new element to the server
  const addElement = async () => {
    try {
      await axios.post("http://localhost:3002/elements", { name: newElement });
      setNewElement("");
      fetchElements();
    } catch (error) {
      console.error("There was an error adding the data!", error);
    }
  };

  // Function to update an existing element on the server
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
          // Button to open the modal
          <button className="open-modal-button" onClick={() => setIsOpen(true)}>
            Open Modal
          </button>
        ) : (
          // Modal containing the list of elements and input fields
          <div className="modal">
            <h2>List of Elements</h2>
            <ul>
              {elements.map((element) => (
                <li key={element[0]}>
                  {editElement === element[0] ? (
                    // Input field and button for updating an element
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
                    // Display element name and edit button
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
            // Input field and button for adding a new element
            <input
              type="text"
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
              placeholder="Add new element"
            />
            <button onClick={addElement}>Add Element</button>
            // Button to close the modal
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
