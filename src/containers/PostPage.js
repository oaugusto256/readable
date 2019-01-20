import React, { Component } from "react";
import Loading from '../components/Loading';
import PostDetail from '../components/PostDetail';
import ListComments from '../components/ListComments';
import { connect } from "react-redux";
import { getPosts, getPostComments, votePost, editPost, deletePost } from '../actions/PostAction';

class PostPage extends Component {
  state = {
    postId: ''
  }

  componentDidMount = async () => {
    const postId = this.props.match.params.id;

    await this.props.getPosts();
    await this.props.getPostComments(postId);

    this.setState({ postId });
  }

  renderPostDetail = () => {
    let post = undefined;

    this.props.posts.forEach(postToCheck => {
      if(this.state.postId === postToCheck.id)
        post = postToCheck
    })

    if(this.props.loading) {
      return (
        <Loading isTrue={this.props.loading} />
      )
    } else {
      return (
        <PostDetail
          post={post}
          history={this.props.history}
          votePost={this.props.votePost}
          editPost={this.props.editPost}
          deletePost={this.props.deletePost}
        />
      )
    }
  }

  render() {
    return (
      <>
        {this.props.loading
          ? <Loading isTrue={this.props.loading} />
          : <div className="container">
              <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                  {this.renderPostDetail()}
                  <ListComments comments={this.props.comments} />
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
  getPostComments,
})(PostPage);