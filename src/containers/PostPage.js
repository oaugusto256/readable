import React, { Component } from "react";
import Loading from '../components/Loading';
import PostDetail from '../components/PostDetail';
import { connect } from "react-redux";
import { getPosts, getPostComments, votePost, editPost, deletePost } from '../actions/PostAction';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash, FaComment } from 'react-icons/fa';
import UserImg from '../images/user.png';

class PostPage extends Component {
  state = {
    postId: '',
    loading: false
  }

  componentDidMount = async () => {
    const postId = this.props.match.params.id;

    this.setState({ loading: true })

    await this.props.getPosts();
    await this.props.getPostComments(postId);

    this.setState({ postId, loading: false });
  }

  renderPostDetail = () => {
    const filteredPost = this.props.posts.filter(post => {
      if (post.id === this.state.postId) {
        return post
      }
    })

    if(filteredPost.length === 0) {
      return <Loading isTrue={this.state.loading} />
    } else {
      return (
        <PostDetail
          post={filteredPost[0]}
          key={filteredPost[0].id}
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
              <div className="row mt-4">
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