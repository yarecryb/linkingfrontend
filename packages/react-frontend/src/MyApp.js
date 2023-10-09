import React, {useState, useEffect} from "react";
import "./index.css";
import Table from "./Table";
import Form from './Form';

function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );
    
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function removeOneCharacter (index) {
        const updated = characters.filter((character, i) => {
            return i !== index
        });
        setCharacters(updated);
    }
    
    function updateList(person) { 
        postUser(person)
        .then((response) => {
            if (response.status === 201){
                response.json().then((data) => {
                    setCharacters([...characters, data]);
                })
            }else{
                console.log("Unable to add");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
      <div className="container">
            <Table characterData={characters} 
                removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList}/>
       </div>
    ) 
}

export default MyApp;