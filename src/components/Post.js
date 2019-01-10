import React from 'react';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';

const Post = (props) => {
  const { post } = props;

  const day = Date(post.timestamp*1000).substring(8,10);
  const month =  Date(post.timestamp*1000).substring(4,7);
  const year =  Date(post.timestamp*1000).substring(11,15);

  return (
    <div key={post.id} className="post">
      <div className="flex justify-content-between">
        <p className="post-category">{post.category}</p>
        <div className="flex">
          <div className="post-menu-icon mr-2">
            <FaEdit />
          </div>
          <div className="post-menu-icon">
            <FaTrash />
          </div>
        </div>
      </div>

      <p className="post-title">{post.title}</p>
      <p className="post-body">{post.body}</p>
      <p className="post-author">{post.author}</p>
      <p className="post-date">{`${month} ${day}, ${year}`}</p>

      <div className="mt-2 flex justify-content-between">
        <div className="flex align-items-center">
          <div className="post-vote-icon" onClick={() => props.votePost(post.id, "upVote")}>
            <FaThumbsUp />
          </div>
          <span className="post-vote-score">{post.voteScore}</span>
          <div className="post-vote-icon" onClick={() => props.votePost(post.id, "downVote")}>
            <FaThumbsDown />
          </div>
        </div>
        <p className="post-comments-count">{`${post.commentCount} comments`}</p>
      </div>
    </div>
  )
}

export default Post;