/* eslint-disable react/style-prop-object */
import React, { Component } from 'react';
import Post from './Post';
import Button from './Button';
import Error from './Error';
import CreateModal from './CreateModal';
import _ from 'underscore';

export default class ListPosts extends Component {
  state = {
    sortBy: '',
    showCreateModal: false,
  }

  handleOpenCreate = () => {
    this.setState({
      showCreateModal: true
    });
  }

  handleCloseCreate = () => {
    this.setState({
      showCreateModal: false
    });
  }

  handleSortBy = (event) => {
    this.setState({ sortBy: event.target.value });
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
              <select value={this.state.sortBy} onChange={this.handleSortBy}>
                <option value="" disabled>Option</option>
                <option value="commentCount">Comment</option>
                <option value="timestamp">Date</option>
              </select>
            </div>
          </div>
        </div>
        <CreateModal
          title={'New Story'}
          close={this.handleCloseCreate}
          isOpen={this.state.showCreateModal}
        />
      </div>
    )
  }
}