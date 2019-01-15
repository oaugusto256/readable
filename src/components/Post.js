import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import Input from './Input';
import Modal from './Modal';
import TextArea from './TextArea';

class Post extends Component {
  state = {
    postTitle: '',
    postBody: '',
    showEditModal: false,
    showDeleteModal: false,
  }

  componentDidMount = () => {
    this.setState({
      postTitle: this.props.post.title,
      postBody: this.props.post.body
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSaveEdit = () => {
    const postId = this.props.post.id;
    const post = {
      title: this.state.postTitle,
      body: this.state.postBody
    }

    this.props.editPost(postId, post);

    this.setState({
      showEditModal: false
    })
  }

  handleOpenEdit = () => {
    this.setState({
      showEditModal: true,
      postTitle: this.props.post.title,
      postBody: this.props.post.body
    });
  }

  handleCloseEdit = () => {
    this.setState({ showEditModal: false });
  }

  render() {
    const { post, votePost } = this.props;

    const day = Date(post.timestamp*1000).substring(8,10);
    const month =  Date(post.timestamp*1000).substring(4,7);
    const year =  Date(post.timestamp*1000).substring(11,15);

    return (
      <>
        <div key={post.id} className="post">
          <div className="flex justify-content-between">
            <p className="post-category">{post.category}</p>
            <div className="flex">
              <div className="post-menu-icon mr-2">
                <div onClick={this.handleOpenEdit}>
                  <FaEdit />
                </div>
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
              <div className="post-vote-icon" onClick={() => votePost(post.id, "upVote")}>
                <FaThumbsUp />
              </div>
              <span className="post-vote-score">{post.voteScore}</span>
              <div className="post-vote-icon" onClick={() => votePost(post.id, "downVote")}>
                <FaThumbsDown />
              </div>
            </div>
            <p className="post-comments-count">{`${post.commentCount} comments`}</p>
          </div>
        </div>
        <Modal
          title='Edit post'
          save={this.handleSaveEdit}
          close={this.handleCloseEdit}
          isOpen={this.state.showEditModal}
        >
          <Input
              label='Title'
              name='postTitle'
              value={this.state.postTitle}
              onChange={this.handleInputChange}
          />
          <TextArea
              label='Body'
              name='postBody'
              value={this.state.postBody}
              onChange={this.handleInputChange}
          />
        </Modal>
      </>
    )
  }
}

export default Post;