import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import Input from './Input';
import Modal from './Modal';

export default class Post extends Component {
  state = {
    showEdit: false,
    showDeleteModal: false,
    postTitle: '',
    postContent: ''
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount = () => {
    this.setState({
      postTitle: this.props.post.title,
      postContent: this.props.post.body
    })
  }

  handleOpenEdit = () => {
    this.setState({ showEdit: true });
  }

  handleCloseEdit = () => {
    this.setState({ showEdit: false });
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
          isOpen={this.state.showEdit}
          close={this.handleCloseEdit}
        >
          <Input
              label='Title'
              name='postTitle'
              value={this.state.postTitle}
              onChange={this.handleInputChange}
          />
          <Input
              label='Content'
              name='postContent'
              value={this.state.postContent}
              onChange={this.handleInputChange}
          />
        </Modal>
      </>
    )
  }
}