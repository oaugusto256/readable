import React, { Component } from "react";
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import Post from '../components/Post';
import { connect } from "react-redux";
import { getPosts, votePost, editPost } from '../actions/PostAction';
import { getComments } from '../actions/CommentsAction';

class Readable extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  }

  renderPosts = () => {
    return (
      <>
        {this.props.posts.map(post => {
          return (
            <Post
              post={post}
              key={post.id}
              editPost={this.props.editPost}
              votePost={this.props.votePost}
            />
          )
        })}
      </>
    )
  }

  render() {
    return (
      <>
        <Navbar />
        <Loading isTrue={this.props.loading} />
        <div className="container">
          {this.renderPosts()}
        </div>
      </>
    );
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
  getComments,
})(Readable);