import React, { Component } from "react";
import Loading from '../components/Loading';
import PostDetail from '../components/PostDetail';
import Error from '../components/Error';
import { connect } from "react-redux";
import { getPosts, getPostComments, votePost, editPost, deletePost } from '../actions/PostAction';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import UserImg from '../images/user.png';

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
      return <Loading isTrue={this.props.loading} />
    } else if (post === undefined) {
      return <Error
                code={'404'}
                desc={'We couldn’t find any story with this specific ID.'}
              />
    } else {
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
    }
  }

  renderPostComments = () => {
    return (
      this.props.comments.map(comment => {
        console.log(comment);

        const day = Date(comment.timestamp*1000).substring(8,10);
        const month =  Date(comment.timestamp*1000).substring(4,7);
        const year =  Date(comment.timestamp*1000).substring(11,15);

        return (
          <div key={comment.id} className="comment-container">
            <div className="flex align-items-center">
              <img src={UserImg} alt="" className="author-img"/>
              <div>
                <p className="author">{comment.author}</p>
                <p className="date">{`${month} ${day}, ${year}`}</p>
              </div>
            </div>
            <p className="body">{comment.body}</p>
            <hr/>
            <div className="mt-4 flex justify-content-between">
              <div className="flex align-items-center">
                <div className="vote-icon" onClick={() => console.log("Up vote!")}>
                  <FaThumbsUp />
                </div>
                <span className="vote-score">{comment.voteScore}</span>
                <div className="vote-icon" onClick={() => console.log("Down vote!")}>
                  <FaThumbsDown />
                </div>
                <div className="menu-icon ml-4 mr-2">
                  <div onClick={this.handleOpenEdit}>
                    <FaEdit />
                  </div>
                </div>
                <div className="menu-icon ml-2">
                  <FaTrash onClick={this.handleOpenDelete} />
                </div>
              </div>
            </div>
          </div>
        )
      })
    )
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
                  {this.renderPostComments()}
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