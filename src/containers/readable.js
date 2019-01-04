import React, { Component } from "react";
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import { connect } from "react-redux";
import { getPosts } from '../actions/PostAction';

class Readable extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <>
        <Navbar />
        <Loading isTrue={this.props.loading} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.post.loading,
    posts: state.post.posts
  }
}

export default connect(mapStateToProps, {
  getPosts
})(Readable);