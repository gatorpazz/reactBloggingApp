import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchPost, deletePost } from "../actions";

class Post extends Component {
  state = {
    submitted: false
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.setState({submitted: true});
    });
  };

  render() {
    const { post } = this.props;
    if (this.state.submitted) {
      return <Redirect to="/" />
    }
    if (!post) {
      return <div>Loading...</div>;
    }

    const { title, categories, content } = post;
    return (
      <div>
        <Link to="/">Back To Posts</Link>
        <button
          className="btn, btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >Delete Post</button>
        <h3>{ title }</h3>
        <h6>Categories: { categories }</h6>
        <p>{ content }</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(Post);