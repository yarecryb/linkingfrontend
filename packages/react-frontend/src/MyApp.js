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
        const promise = fetch("http://localhost:8000/users", {
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

    function deleteUser(id){
        let link = "http://localhost:8000/users/" + id;
        const promise = fetch(link, {
            method: "DELETE",
        });
        return promise;
    }

    function removeOneCharacter (index) {
        let id = characters.at(index).id;
        deleteUser(id).then((response) =>{
            if (response.status === 204){
                const updated = characters.filter((character, i) => {
                    return i !== index
                });
                setCharacters(updated);
            }else{
                console.log("Unable to delete user");
            }
        });
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