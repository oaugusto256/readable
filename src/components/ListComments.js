/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import Comment from './Comment';
import Button from './Button';
import Error from './Error';
import CreateModal from './CreateModal';
import Input from './Input';
import TextArea from './TextArea';
import _ from 'underscore';

export default class ListComments extends Component {
  state = {
    postBody: '',
    postTitle: '',
    postAuthor: '',
    postCategory: '',
    showCreateModal: false,
  }

  handleCreatePost = () => {
    const post = {
      title: this.state.postTitle,
      body: this.state.postBody,
      author: this.state.postAuthor,
      category: this.state.postCategory
    }

    this.props.createPost(post);

    this.setState({
      postBody: '',
      postTitle: '',
      postAuthor: '',
      postCategory: '',
      showCreateModal: false,
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

  handleOpenCreate = () => {
    this.setState({
      postBody: '',
      postTitle: '',
      postAuthor: '',
      postCategory: '',
      showCreateModal: true,
    })
  }

  handleCloseCreate = () => {
    this.setState({
      showCreateModal: false
    });
  }

  renderComments = () => {
    const { comments } = this.props;

    if (comments.length > 0) {
      return (
        <div>
          <div className="create-comment-container">
            <p>Write a response...</p>
            <div>
              <textarea name="" />
            </div>
            <Button
              name={'Publish'}
              style={'button-save'}
            />
          </div>

          <p>Responses:</p>
          {comments.map(comment => {
            return (
              <Comment
                comment={comment}
                key={comment.id}
              />
            )
          })}
        </div>
      )
    } else {
      return (
        <Error
          code={'404'}
          desc={'We couldn’t find any story with this category.'}
        />
      )
    }
  }

  render () {
    return (
      <>
        {this.renderComments()}
      </>
    )
  }
}