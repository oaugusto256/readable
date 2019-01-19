import React, { Component } from "react";
import { connect } from "react-redux";
import Post from '../components/Post';
import Loading from '../components/Loading';
import CategoriesBar from "../components/CategoriesBar";
import { getPosts, votePost, editPost, deletePost } from '../actions/PostAction';

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
        <Loading isTrue={this.props.loading} />
        <div className="container">
          <CategoriesBar />
          <div className="row">
            <div className="col-lg-9">
              {this.renderPosts()}
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