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
    commentAuthor: '',
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
    const commentId = this.props.comment.id;

    this.props.deleteComment(commentId);

    this.setState({
      showDeleteModal: false
    })
  }

  handleEditComment = () => {
    const comment = {
      body: this.state.commentBody,
      id: this.props.comment.id
    }

    this.props.editComment(comment);

    this.setState({
      showEditModal: false
    })
  }

  handleOpenEdit = () => {
    this.setState({
      showEditModal: true,
      commentAuthor: this.props.comment.author,
      commentBody: this.props.comment.body
    });
  }

  handleCloseDelete = () => {
    this.setState({ showDeleteModal: false });
  }

  handleOpenDelete = () => {
    this.setState({
      showDeleteModal: true,
    });
  }

  handleCloseEdit = () => {
    this.setState({ showEditModal: false });
  }

  render() {
    const { comment, voteComment } = this.props;

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
              <div className="vote-icon" onClick={() => voteComment(comment.id, "upVote")}>
                <FaThumbsUp />
              </div>
              <span className="vote-score">{comment.voteScore}</span>
              <div className="vote-icon" onClick={() => voteComment(comment.id, "downVote")}>
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
        <EditModal
          title='Edit comment'
          edit={this.handleEditComment}
          close={this.handleCloseEdit}
          isOpen={this.state.showEditModal}
        >
          <Input
              label='Author'
              name='commentAuthor'
              value={this.state.commentAuthor}
              onChange={this.handleInputChange}
          />
          <TextArea
              label='Body'
              name='commentBody'
              value={this.state.commentBody}
              onChange={this.handleInputChange}
          />
        </EditModal>
        <DeleteModal
          title={'Deleting response...'}
          delete={this.handleDeleteComment}
          close={this.handleCloseDelete}
          isOpen={this.state.showDeleteModal}
        />
      </>
    )
  }
}

export default Comment;