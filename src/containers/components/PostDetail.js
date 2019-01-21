import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaComment } from 'react-icons/fa';
import UserImg from '../images/user.png';
import Input from './Input';
import TextArea from './TextArea';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import Error from '../components/Error';

class PostDetail extends Component {
  state = {
    postBody: '',
    postTitle: '',
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

  handleDeletePost = () => {
    const postId = this.props.post.id;

    this.props.history.push('/');
    this.props.deletePost(postId);

    this.setState({ showDeleteModal: false });
  }

  handleEditPost = () => {
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

  render() {
    const { post, votePost } = this.props;

    if(post !== undefined) {
      const day = Date(post.timestamp*1000).substring(8,10);
      const month =  Date(post.timestamp*1000).substring(4,7);
      const year =  Date(post.timestamp*1000).substring(11,15);

      return (
        <>
          <div key={post.id} className="post-detail">
            <p className="post-title">{post.title}</p>

            <div className="flex mt-4">
              <img src={UserImg} alt="" className="post-author-img"/>
              <div>
                <p className="post-author">{post.author}</p>
                <p className="post-date">{`${month} ${day}, ${year}`}</p>
              </div>
            </div>

            <p className="post-body">{post.body}</p>
            <hr/>
            <div className="mt-4 flex justify-content-between">
              <div className="flex align-items-center">
                <div className="post-vote-icon" onClick={() => votePost(post.id, "upVote")}>
                  <FaThumbsUp />
                </div>
                <span className="post-vote-score">{post.voteScore}</span>
                <div className="post-vote-icon" onClick={() => votePost(post.id, "downVote")}>
                  <FaThumbsDown />
                </div>
                <div className="post-menu-icon ml-4 mr-2">
                  <div onClick={this.handleOpenEdit}>
                    <FaEdit />
                  </div>
                </div>
                <div className="post-menu-icon ml-2">
                  <FaTrash onClick={this.handleOpenDelete} />
                </div>
              </div>
              <p className="post-comments-count">{post.commentCount}<span className="ml-2 post-comments-icon"><FaComment /></span></p>
            </div>
          </div>

          <EditModal
            title='Edit post'
            save={this.handleEditPost}
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
          />
        </>
      )
    } else {
      return (
        <Error
          code={'404'}
          desc={'We couldn’t find any story with this specific ID.'}
        />
      )
    }
  }
}

export default PostDetail;