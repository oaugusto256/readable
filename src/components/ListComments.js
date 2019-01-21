/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import TextArea from './TextArea';
import Comment from './Comment';
import Button from './Button';
import NoComments from './NoComments';
import Input from './Input';

export default class ListComments extends Component {
  state = {
    commentBody: '',
    commentAuthor: ''
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCreateComment = () => {
    const comment = {
      parentId: this.props.postId,
      body: this.state.commentBody,
      author: this.state.commentAuthor
    }

    if(this.state.commentBody === '' || this.state.commentAuthor === '') {
      alert('Please, write the author name and the comment content.')
    } else {
      this.props.createComment(comment);
    }
  }

  renderComments = () => {
    const { comments } = this.props;

    if (comments.length > 0) {
      return (
        comments.map(comment => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              editComment={this.props.editComment}
              deleteComment={this.props.deleteComment}
            />
          )
        })
      )
    } else {
      return (
        <NoComments />
      )
    }
  }

  render () {
    return (
      <>
        <div className="create-comment-container">
          <p>Write a response...</p>
          <div>
            <Input label="Author" name="commentAuthor" onChange={this.handleInputChange} value={this.state.commentAuthor} autoFocus/>
            <TextArea label="Response" name="commentBody" value={this.state.commentBody} onChange={this.handleInputChange} />
          </div>
          <Button
            name={'Publish'}
            style={'button-save'}
            onClick={this.handleCreateComment}
          />
        </div>
        <p>Responses:</p>
        {this.renderComments()}
      </>
    )
  }
}