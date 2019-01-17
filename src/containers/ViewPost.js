import React, { Component } from "react";
import Loading from '../components/Loading';
import PostDetail from '../components/PostDetail';
import { connect } from "react-redux";
import { getPosts, getPostComments, votePost, editPost, deletePost } from '../actions/PostAction';

class ViewPost extends Component {
  state = {
    postId: ''
  }

  componentDidMount = () => {
    const postId = this.props.match.params.id;
    this.setState({ postId: postId });

    this.props.getPosts();
    this.props.getPostComments(postId);
  }

  renderCurrentPost = () => {
    return (
      <>
        {this.props.posts.map(post => {
          if (post.id === this.state.postId)
            return (
              <PostDetail
                post={post}
                key={post.id}
                history={this.props.history}
                votePost={this.props.votePost}
                editPost={this.props.editPost}
                deletePost={this.props.deletePost}
              />
            )
          else
            return null
        })}
      </>
    )
  }

  render() {
    return (
      <>
        <Loading isTrue={this.state.loading} />
        <div className="container">
          <div className="row mt-4">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              {this.renderCurrentPost()}
            </div>
            <div className="col-lg-2"></div>
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
    postComments: state.post.comments,
  }
}

export default connect(mapStateToProps, {
  getPosts,
  votePost,
  editPost,
  deletePost,
  getPostComments,
})(ViewPost);