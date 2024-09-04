import React, { useEffect, useState } from 'react';
import { getByID,deleteObj,updateObj } from '../../utils';
import '../../css/Style.css';
import OtherData from './OtherData';
import UserPostsTodos from './UserPosts&Todos';

const todosUrl='https://jsonplaceholder.typicode.com/todos';
const usersUrl='https://jsonplaceholder.typicode.com/users';


const User = (props) => {

    const [user,setUser]= useState({id:0,name:"",email:""});
    const [completedUser,setCompletedUser]=useState(true);
    const [otherDetails,setOtherDetails]=useState(false)
    const [userRegion,setUserRegion]=useState(false)
    const userId=props.user.id; 



    useEffect(() => {
        const fetchData = async ()=>{
            //const userId=props.user.id;
            const todos=await getByID(todosUrl,userId);
           if(todos.id===userId&& todos.completed!==false){
                setCompletedUser(true);
           }
           else{
                setCompletedUser(false);
           }
        }
        fetchData();
    }, []);

    const handleClickUserRegion=()=>{
        if(userRegion===false){
            setUserRegion(true);
        }else{
            setUserRegion(false)
        }
    }
    
    const handleOpenClose=()=>{
        if(otherDetails===false){
            setOtherDetails(true)
        }else{
            setOtherDetails(false)
        }
    }

    const handleChange=(e)=>{
        setUser({...user,id:props.user.id});
        let {name,type,value}= e.target;
        setUser({...user,[name]:value});
    }

    const handleUpdate=async()=>{
        const res= await updateObj(usersUrl,props.user.id,user);
        console.log(res)
    }

    const handleDelete=async()=>{
        const data= await deleteObj(usersUrl,props.user.id);
        console.log(data)
    }

    return (
        <>
        <div onClick={handleClickUserRegion} style={{border: '1px solid',borderColor:completedUser?'green':'red',padding: '10px',backgroundColor:userRegion?'orange':''}}>
            <form onSubmit={(e)=>e.preventDefault()}>
                ID: {props.user.id}<br/>
                Name: <input type='text' name='name' onChange={handleChange} defaultValue={props.user.name}/><br/>
                Email: <input type='email' name='email' onChange={handleChange} defaultValue={props.user.email}/><br/><br/>
                <button style={{backgroundColor:'gray',border: '2px solid gray',padding: '5px'}} onMouseOver={handleOpenClose} onClick={handleOpenClose}>Other Data</button>
                {otherDetails?<OtherData id={props.user.id} />:null}
                <button className='button' onClick={handleUpdate}>Update</button>
                <button className='button' onClick={handleDelete}>Delete</button>
                <br/>
                <br/>
            </form>        

        </div>
            {userRegion?<UserPostsTodos userId={userId}/>:null}
         <br/>

        </>
    );
}

export default User;