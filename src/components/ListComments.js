/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import TextArea from './TextArea';
import Comment from './Comment';
import Button from './Button';
import Error from './Error';
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

    this.props.createComment(comment);
  }

  renderComments = () => {
    const { comments } = this.props;

    if (comments.length > 0) {
      return (
        <div>
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