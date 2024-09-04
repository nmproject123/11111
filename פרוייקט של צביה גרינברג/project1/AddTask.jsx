import React, { useState } from "react";

function AddTask({user}) {
  const [newTask, newTaskState] = useState();

  return (
    <div>
      <h3>new todos- user {user.id}</h3>
      <br />
   Title: <input></input>
   <button onClick={}>Add</button>
   <button onClick={}>Cancel</button>
    </div>
  );
}

export default AddTasשk;
