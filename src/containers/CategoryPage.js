import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategoryPosts } from '../actions/CategoryAction';
import { getPosts, createPost, votePost, editPost, deletePost } from '../actions/PostAction';
import ListPosts from "../components/ListPosts";
import Loading from '../components/Loading';

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

  render() {
    let filteredPosts = this.props.posts.filter(post => post.category === this.state.category ? post: null);

    if (this.props.loading) {
      return (
        <Loading isTrue={this.props.loading} />
      )
    } else {
      return (
        <ListPosts
          posts={filteredPosts}
          votePost={this.props.votePost}
          editPost={this.props.editPost}
          createPost={this.props.createPost}
          deletePost={this.props.deletePost}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.post.loading
  }
}

export default connect(mapStateToProps, {
  getPosts,
  votePost,
  editPost,
  deletePost,
  createPost,
  getCategoryPosts,
})(CategoryPage);