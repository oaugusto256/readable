import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCategories } from '../actions/CategoryAction';
import Loading from '../components/Loading';

class CategoriesBar extends Component {
  componentDidMount =  () => {
    this.props.getCategories();
  }

  renderCategories = () => {
    if(this.props.loading) {
      return (
        <Loading isTrue={this.props.loading} />
      )
    } else {
      return (
        <div className="categories-container">
          {this.props.categories.map(categorie => {
            return <div className="categorie" key={categorie.name}>{categorie.name}</div>
          })}
        </div>
      )
    }
  }

  render () {
    return (
      this.renderCategories()
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.categorie.loading,
    categories: state.categorie.categories
  }
}

export default connect(mapStateToProps, {
  getCategories,
})(CategoriesBar);