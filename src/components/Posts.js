import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts = () => {
    return _.map(this.props.posts, post => (
      <li key={post.id} className="list-group-item">
        {post.title}
      </li>
    ))
  };

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul class="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps() {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(Posts);