import React, { Component } from "react";
import Loading from '../components/Loading';
import PostDetail from '../components/PostDetail';
import ListComments from '../components/ListComments';
import { connect } from "react-redux";
import { getPosts, getPostComments, votePost, editPost, deletePost, createComment, editComment, deleteComment } from '../actions/PostAction';

class PostPage extends Component {
  state = {
    postId: ''
  }

  componentDidMount = async () => {
    const postId = this.props.match.params.id;
    this.setState({ postId });

    await this.props.getPosts();
    await this.props.getPostComments(postId);
  }

  render() {
    let post = undefined;

    this.props.posts.forEach(postToCheck => {
      if(this.state.postId === postToCheck.id)
        post = postToCheck
    })

    return (
      <>
        {this.props.loading
          ? <Loading isTrue={this.props.loading} />
          : <div className="container">
              <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                  <PostDetail
                    post={post}
                    history={this.props.history}
                    votePost={this.props.votePost}
                    editPost={this.props.editPost}
                    deletePost={this.props.deletePost}
                  />
                  <ListComments
                    postId={this.state.postId}
                    comments={this.props.comments}
                    createComment={this.props.createComment}
                    editComment={this.props.editComment}
                    deleteComment={this.props.deleteComment}
                  />
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.post.loading,
    comments: state.post.postComments,
  }
}

export default connect(mapStateToProps, {
  getPosts,
  votePost,
  editPost,
  deletePost,
  createComment,
  editComment,
  deleteComment,
  getPostComments,
})(PostPage);