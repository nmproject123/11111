import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddUserComp({ addUser, id }) {
    const [user, setUser] = useState({});
     const handleChange = (e) => {
        let { name, value, type } = e.target;
        value = type === "number" ? +value : value;
        setUser({ ...user, id: id, [name]: value, isUpdet: false });
      };
    
      const handleSubmit = () => {
        addUser(user);
      }
      
      const cancel = () => {
        addUser(null);
      }
    
      return (
        <div>
          <div id="addUser">
            <form onSubmit={handleSubmit}>
              ID:{user.id}  <br />
              Name: <input type="text" onChange={handleChange} name="name" /><br />
              Email: <input type="text" onChange={handleChange} name="email" /><br />
              street:<input type="text" onChange={handleChange} name="street" /><br />
              city:<input type="text" onChange={handleChange} name="city" /> <br />
              zipcode:<input type="text" onChange={handleChange} name="zipcode" />
              <button id="canceAddUserlButton" onClick={cancel}>Cancel</button>
              <button id="addAddUserButton" type="submit">Add</button>
            </form>
          </div>
        </div>
      );
    }
    
    export default AddUserComp;
    
    