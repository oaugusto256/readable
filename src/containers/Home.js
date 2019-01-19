import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, votePost, editPost, deletePost } from '../actions/PostAction';
import Post from '../components/Post';

class Home extends Component {
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
              votePost={this.props.votePost}
              editPost={this.props.editPost}
              deletePost={this.props.deletePost}
            />
          )
        })}
      </>
    )
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              {this.renderPosts()}
            </div>
            <div className="col-lg-2">
              <button>Create new post</button>
            </div>
          </div>
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
  deletePost,
})(Home);