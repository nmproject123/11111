import axios from "axios";

const getAll = (url) => axios.get(url);

const getById = (url, id) => axios.get(`${url}/${id}`);

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);


const getUserTasks = async (id, amount) => {
  const todosUrl = "https://jsonplaceholder.typicode.com/todos";
 
  try {
    const resp = await getAll(`${todosUrl}?userId=${id}`);
    if (resp.status === 200) {
      return resp.data.slice(0, amount);
    } else {
      console.log("unknown error: " + resp.status);
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
const getUserPosts = async (id, amount) => {
  const postsUrl = "https://jsonplaceholder.typicode.com/posts";
 
  try {
    const resp = await getAll(`${postsUrl}?userId=${id}`);
    if (resp.status === 200) {
      return resp.data.slice(0, amount);
    } else {
      console.log("unknown error: " + resp.status);
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
export { getAll, getById, addItem, updateItem, deleteItem, getUserTasks, getUserPosts };