import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCategories } from '../actions/CategoryAction';
import { Link } from 'react-router-dom';

class CategoriesBar extends Component {
  componentDidMount =  () => {
    this.props.getCategories();
  }

  render () {
    return (
      <div className="container">
        <div className="categories-container">
          {this.props.categories.map(category => {
            return (
              <Link key={category.name} to={`/${category.path}`}>
                <div className="categorie">
                  {category.name}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.category.loading,
    categories: state.category.categories
  }
}

export default connect(mapStateToProps, {
  getCategories,
})(CategoriesBar);