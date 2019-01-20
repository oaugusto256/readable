/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import Post from './Post';
import Button from './Button';
import Error from './Error';
import CreateModal from './CreateModal';
import Input from './Input';
import TextArea from './TextArea';
import _ from 'underscore';

export default class ListPosts extends Component {
  state = {
    sortBy: '',
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

  renderPosts = () => {
    let postsToRender = this.props.posts;

    postsToRender = _.sortBy(postsToRender, this.state.sortBy);

    if (postsToRender.length > 0) {
      return (
        postsToRender.map(post => {
          return (
            <Post
              post={post}
              key={post.id}
              votePost={this.props.votePost}
              editPost={this.props.editPost}
              deletePost={this.props.deletePost}
            />
          )
        })
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
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            {this.renderPosts()}
          </div>
          <div className="col-lg-2">
            <Button
              name={'New Story'}
              style={'button-add'}
              onClick={this.handleOpenCreate}
            />

            <div className="sort-by-container">
              <p>Sort by:</p>
              <select name="sortBy" value={this.state.sortBy} onChange={this.handleInputChange}>
                <option value="" disabled>Option</option>
                <option value="voteScore">Vote</option>
                <option value="timestamp">Date</option>
              </select>
            </div>
          </div>
        </div>
        <CreateModal
          title={'New Story'}
          create={this.handleCreatePost}
          close={this.handleCloseCreate}
          isOpen={this.state.showCreateModal}
        >
          <Input
              label='Title'
              name='postTitle'
              value={this.state.postTitle}
              onChange={this.handleInputChange}
          />
          <Input
              label='Author'
              name='postAuthor'
              value={this.state.postAuthor}
              onChange={this.handleInputChange}
          />
          <div className="post-category-container">
            <p className="label">Category</p>
            <select name='postCategory' value={this.state.postCategory} onChange={this.handleInputChange}>
              <option value="" disabled>Select an option</option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
          </div>
          <TextArea
              label='Body'
              name='postBody'
              value={this.state.postBody}
              onChange={this.handleInputChange}
          />
        </CreateModal>
      </div>
    )
  }
}