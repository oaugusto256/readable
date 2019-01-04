import React, { Component } from "react";
import Navbar from '../components/Navbar';
import { connect } from "react-redux";
import { getPosts } from '../actions/PostAction';
import { BarLoader } from 'react-spinners';

class Readable extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <hr/>
          {this.props.loading ? <BarLoader /> : null }
        </div>
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