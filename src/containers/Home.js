import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, votePost, editPost, deletePost } from '../actions/PostAction';
import ListPosts from '../components/ListPosts';

class Home extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  }

  render() {
    return (
      <ListPosts
        posts={this.props.posts}
        votePost={this.props.votePost}
        editPost={this.props.editPost}
        deletePost={this.props.deletePost}
      />
    )
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
  deletePost,
})(Home);