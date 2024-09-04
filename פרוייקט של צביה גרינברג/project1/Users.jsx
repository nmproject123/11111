import React, { useState, useEffect } from "react";
import { getAll, addItem, deleteItem } from "./utils";
import User from "./User";
import Task from "./Task";
import AddUserComp from "./AddUserComp";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { InputText } from 'primereact/inputtext';


const usersURL = "https://jsonplaceholder.typicode.com/users";
const tasksURL = "https://jsonplaceholder.typicode.com/todos";

function Users() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [isAdd, setIsAdd] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [searchText, setSearchText] = useState('');
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getAll(usersURL);
        const tasksResponse = await getAll(tasksURL);
        setUsers(usersResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // סינון עפי הכתוב בחיפוש
  const filteredData = users.filter((user) => {
    return (
      (user.name && user.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.address && user.address.city && user.address.city.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.address && user.address.street && user.address.street.toLowerCase().includes(searchText.toLowerCase())) ||
      (user.address && user.address.zipcode && user.address.zipcode.toLowerCase().includes(searchText.toLowerCase()))
    );
  });
  const addUser = async () => {

    const resp = await addItem(usersURL, { name: newUser.name, email: newUser.email });
    const data = resp.data;
    setUsers((prevState) => [...prevState, data]);
    setNewUser("");
    setIsAdd(false);
  }

  const addNewUser = (user) => {
    setIsVisible(false)
    if (user) {
      setUsers([...users, user]);
      setSearchText([...searchText, user]);
    }
  }
  // const divClassName = {
  //   // display: "flex",
  //   alignItems: "center",
  //   width: '300px',
  //   high:'300px',
  //   textAline:'center',
  //  border:"yellow"

  // };
  // const handleDataReceived =(respChanger)=>{
  // console.log(respChanger)
  // setUsers(users.filter((u) => u.id !== respChanger))
  // };
  const deleteUser = (userId) => {
    const resp = deleteItem(
      "https://jsonplaceholder.typicode.com/users",
      userId
    );
    console.log(resp.data);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    console.log(users);
  };

  return (

    <>
      {/* <User/> */}
      <Row className="p-3">
        <Col>
          <Row>


            <Col xs={12}>





              <Row className="d-flex justify-content-center text-center">
                <Col xs={3}>
                  <InputText type="text" placeholder="Search" value={searchText} onChange={handleSearch} />
                </Col>

                <Col xs={2}><Button label="Add" raised size="small" severity="secondary" onClick={() => setIsAdd(true)} /></Col>
              </Row>

              {isAdd && (
                <div>


                  <InputText type="text" className="p-inputtext-sm" placeholder="Name" onChange={(e) => setNewUser(e.target.value)} />

                  <Row> <InputText type='text' className="p-inputtext-sm" placeholder="Email" onChange={(e) => setNewUser(e.target.value)} /></Row><br />

                  <Row className="nl-3">
                    {/* <Col xs={8}><Button label="ADD" raised size="small"  severity="secondary"onClick={addUser}/></Col> */}
                    <Col xs={8}><Button label="ADD" raised size="small" severity="secondary" onClick={() => setIsVisible(true)} /></Col>
                    {isVisible ? <AddUserComp id={users[users.length - 1].id + 1} addUser={addNewUser} /> : null}
                    <Col xs={4}><Button label="Cancle" raised size="small" severity="danger" onClick={() => setIsAdd(false)} /></Col>
                  </Row>

                </div>

              )}



            </Col>


            <Col xs={12}>


              {filteredData.map((user) => (
                <Card role="region" style={{ backgroundColor: '#F2F2F2', border: '1px soild black' }} >

                  <User key={user.id} user={user} deleteUser={deleteUser} />
                </Card>

              ))}
            </Col>
          </Row></Col>
      </Row>
    </>

  );
}

export default Users;