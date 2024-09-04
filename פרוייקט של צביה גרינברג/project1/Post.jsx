import React, { useState } from "react";

function Post({ post }) {
  const [postState, setPostState] = useState(post);

  return (
    <div>
      Title: {postState.title}
      <br />
      body: {postState.body}
    </div>
  );
}

export default Post;
