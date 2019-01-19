import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategoryPosts } from '../actions/CategoryAction';
import { getPosts, votePost, editPost, deletePost } from '../actions/PostAction';
import Post from '../components/Post';
import Error from '../components/Error';

class CategoryPage extends Component {
  state = {
    category: ''
  }

  componentDidUpdate = async (prevProps) => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const category = this.props.match.params.category;
      await this.props.getPosts();
      this.setState({ category });
    }
  }

  componentDidMount = async () => {
    await this.props.getPosts();
    const category = this.props.match.params.category;
    this.setState({ category });
  }

  renderPosts = () => {
    let number_of_posts = 0;
    this.props.posts.map(post => {
      if(post.category === this.state.category) {
        number_of_posts += 1;
      }
    })

    if (number_of_posts > 0) {
      return (
        <>
          {this.props.posts.map(post => {
            if(post.category === this.state.category) {
              return (
                <Post
                  post={post}
                  key={post.id}
                  votePost={this.props.votePost}
                  editPost={this.props.editPost}
                  deletePost={this.props.deletePost}
                />
              )
            }
          })}
        </>
      )
    } else {
      return (
        <Error
          code={'404'}
          desc={'We couldn’t find any post with this category.'}
        />
      )
    }
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
  }
}

export default connect(mapStateToProps, {
  getPosts,
  votePost,
  editPost,
  deletePost,
  getCategoryPosts,
})(CategoryPage);