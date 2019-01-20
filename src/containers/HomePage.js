import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, createPost, votePost, editPost, deletePost } from '../actions/PostAction';
import ListPosts from '../components/ListPosts';
import Loading from '../components/Loading';

class HomePage extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  }

  render() {
    if (this.props.loading) {
      return (
        <Loading isTrue={this.props.loading} />
      )
    } else {
      return (
        <ListPosts
          posts={this.props.posts}
          votePost={this.props.votePost}
          editPost={this.props.editPost}
          createPost={this.props.createPost}
          deletePost={this.props.deletePost}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.post.loading,
    comments: state.comment.comments,
  }
}

export default connect(mapStateToProps, {
  getPosts,
  votePost,
  editPost,
  createPost,
  deletePost,
})(HomePage);