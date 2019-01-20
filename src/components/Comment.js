import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import UserImg from '../images/user.png';
import Input from './Input';
import TextArea from './TextArea';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

class Comment extends Component {
  state = {
    commentBody: '',
    commentTitle: '',
    showEditModal: false,
    showDeleteModal: false,
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDeleteComment = () => {
    const postId = this.props.post.id;

    this.props.deletePost(postId);

    this.setState({
      showDeleteModal: false
    })
  }

  handleEditComment = () => {
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
      commentTitle: this.props.post.title,
      commentBody: this.props.post.body
    });
  }

  handleOpenDelete = () => {
    this.setState({
      showDeleteModal: true,
    });
  }

  handleCloseEdit = () => {
    this.setState({ showEditModal: false });
  }

  handleCloseDelete = () => {
    this.setState({ showDeleteModal: false });
  }

  renderPostComments = () => {

  }

  render() {
    const { comment, votePost } = this.props;

    const day = Date(comment.timestamp*1000).substring(8,10);
    const month =  Date(comment.timestamp*1000).substring(4,7);
    const year =  Date(comment.timestamp*1000).substring(11,15);

    return (
      <>
        <div key={comment.id} className="comment-container">
          <div className="flex align-items-center">
            <img src={UserImg} alt="" className="author-img"/>
            <div>
              <p className="author">{comment.author}</p>
              <p className="date">{`${month} ${day}, ${year}`}</p>
            </div>
          </div>
          <p className="body">{comment.body}</p>
          <hr/>
          <div className="mt-4 flex justify-content-between">
            <div className="flex align-items-center">
              <div className="vote-icon" onClick={() => console.log("Up vote!")}>
                <FaThumbsUp />
              </div>
              <span className="vote-score">{comment.voteScore}</span>
              <div className="vote-icon" onClick={() => console.log("Down vote!")}>
                <FaThumbsDown />
              </div>
              <div className="menu-icon ml-4 mr-2">
                <div onClick={this.handleOpenEdit}>
                  <FaEdit />
                </div>
              </div>
              <div className="menu-icon ml-2">
                <FaTrash onClick={this.handleOpenDelete} />
              </div>
            </div>
          </div>
        </div>
        {/* <EditModal
          title='Edit story'
          edit={this.handleEditPost}
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
        </EditModal>
        <DeleteModal
          title={this.props.post.title}
          delete={this.handleDeletePost}
          close={this.handleCloseDelete}
          isOpen={this.state.showDeleteModal}
        /> */}
      </>
    )
  }
}

export default Comment;