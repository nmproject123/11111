import React from 'react'
import Task from "./Task"
import Post from "./Post"
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';

import { useState, useEffect } from "react";
import { getAll, getById, getUserTasks, getUserPosts, deleteItem, addItem } from "./utils";
import { updateItem } from "./utils";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const usersURL = "https://jsonplaceholder.typicode.com/users";
const tasksURL = "https://jsonplaceholder.typicode.com/todos";
const postsURL = "https://jsonplaceholder.typicode.com/posts"

function User({ user, deleteUser }) {

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isTask, setIsTask] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [newTask, setNewTask] = useState();
  const [newPostT, setNewPostT] = useState();
  const [newPostB, setNewPostB] = useState();
  const [name, setName] = useState(user.name)
  const [showTodos, setShowTodos] = useState(false);
  const [completedUser, setCompletedUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    address: {
      street: user.address.street,
      city: user.address.city,
      zipcode: user.address.zipcode
    }
  })

  useEffect(() => {
    const fetchData = async () => {

      const tasks = await getById(tasksURL, user.id);
      if (tasks.userId === user.id && tasks.completed !== false) {
        setCompletedUser(true);
      }
      else {
        setCompletedUser(false);
      }
    };

    fetchData();
  }, [completedUser]);

  const updateUser = async (e) => {
    try {
      const resp = await updateItem(usersURL, user.id, userInfo);
      if (resp.status === 200) {
        const data = resp.data;
        // setUserInfo(data);
        setUserInfo(prevState => ({ ...prevState, user: data }));

      } else {
        console.log("unknown error: " + resp.status);
      }
    } catch (e) {
      console.log(e);
    }

  };

  const addTask = async () => {

    const resp = await addItem(tasksURL, { title: newTask, completed: false });
    const data = resp.data;
    setTasks((prevState) => [...prevState, data]);
    setNewTask("");
    setIsAdd(false);
  }
  const addPost = async () => {

    const resp = await addItem(postsURL, { title: newPostT, body: newPostB });
    const data = resp.data;
    setPosts((prevState) => [...prevState, data]);
    setNewPostT("");
    setNewPostB("");
    setIsAdd(false);
  }

  const showTasks = async () => {
    const topTodos = await getUserTasks(user.id, 20);
    if (topTodos) setTasks(topTodos);
    setIsTask(true);
    const topPosts = await getUserPosts(user.id, 20)
    if (topPosts) setPosts(topPosts);

    setIsPost(true);
    setIsClick(!isClick);
  };

  // const style = {
  //   border: tasks.some((task) => task.userId === user.id && !task.completed)
  //     ? '2px solid red'
  //     : '2px solid green',
  // backgroundColor:isClick? 'orange':'white'
  // };

  return (
    <Row><Col><Row className='d-flex'>
      <div style={{ border: '1px solid', borderColor: completedUser ? 'green' : 'red', padding: '10px', backgroundColor: isClick ? 'orange' : 'white' }}  >
        <Col xs={6}>

          <strong>  User id:  <Avatar label={user.id} onClick={showTasks} /></strong>
          <br />
          <div>


            {isTask && (

              <>

                <Button label="Add" raised size="small" severity="secondary" onClick={() => setIsAdd(true)} />

                {isAdd && (
                  <div>
                    <h3>new todos- user {user.id}</h3>
                    <br />
                    Title: <InputText type='text' className="p-inputtext-sm" onChange={(e) => setNewTask(e.target.value)} />
                    <Button label="ADD" raised size="small" severity="secondary" onClick={addTask} />
                    <Button label="cancle" raised size="small" severity="danger" onClick={() => setIsAdd(false)} />
                  </div>
                )}



                {tasks.map((task) => (

                  <Task key={task.id} task={task}>
                  </Task>

                )
                )}


                <button onClick={() => setIsAdd(true)}>
                  Add
                </button>
                {isAdd && (
                  <div>
                    <h3>new Posts- user {user.id}</h3>
                    <br />
                    Title: <InputText type='text' className="p-inputtext-sm" onChange={(e) => setNewPostT(e.target.value)} />
                    BOdy: <InputText type='text' className="p-inputtext-sm" onChange={(e) => setNewPostB(e.target.value)} />s
                    <Button label="add" raised size="small" severity="danger" onClick={addPost} />
                    <Button label="cancle" raised size="small" severity="danger" onClick={() => setIsAdd(false)} />
                  </div>
                )}
                <div style={{}}>  <h3> POSTS </h3>

                  {posts.map((post) => (

                    <Post key={post.id} post={post}>
                    </Post>
                  )
                  )}

                </div>
              </>

            )}
          </div>
        </Col>
        <Col xs={6} >
          <Row className="py-3">
            <Col xs={12}>
              <Row className="py-3">
                <Col xs={2}>Name:</Col>
                <Col xs={2}> <InputText type='text' className="p-inputtext-sm" defaultValue={userInfo.name} onChange={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))} />
                </Col></Row> </Col>

            <Col xs={12}>
              <Row>
                <Col xs={2}>Email:</Col>
                <Col xs={2}> <InputText type='text' className="p-inputtext-sm" defaultValue={userInfo.email} onChange={e => setUserInfo(prev => ({ ...prev, email: e.target.value }))} />
                </Col></Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Row>

                {isVisible ? <div>
                  <Col xs={12} >
                    <Row className="py-2">
                      <Col xs={2}>Street:</Col>
                      <Col xs={2}> <InputText type='text' className="p-inputtext-sm" defaultValue={user.address.street} /></Col>
                    </Row></Col>
                  <Col xs={12} >
                    <Row className="py-2">
                      <Col xs={2}>City:</Col>
                      <Col> <InputText type='text' className="p-inputtext-sm" defaultValue={user.address.city} /></Col>
                    </Row></Col>
                  <Col xs={12} >
                    <Row className="py-2">
                      <Col xs={2}>Zip Code:</Col>
                      <Col><InputText type='text' className="p-inputtext-sm" defaultValue={user.address.zipcode} /> </Col>
                    </Row></Col>
                </div> : null}
              </Row> </Col>
          </Row>
          <Row className="py-3">
            <Col xs={2}>
              <Button label="Data" raised size="small" onMouseOver={() => setIsVisible(() => true)} onClick={() => setIsVisible(() => false)} />
            </Col>
            <Col xs={2}>
              <Button label="Delete" raised size="small" severity="danger" onClick={() => { deleteUser(user.id); }} />
            </Col>
            <Col xs={2}>
              <Button label="Update" raised size="small" severity="success" onClick={updateUser} />
            </Col>
          </Row>




        </Col>   </div></Row></Col></Row>
  )
};

export default User;
