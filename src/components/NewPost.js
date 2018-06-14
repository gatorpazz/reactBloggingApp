import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class NewPost extends Component {
  state = {
    submitted: false
  };
  renderField = (field) => {
    const { meta: {touched, error }, label } = field;
    const divClasses = classNames('form-group', {'has-danger': touched && error});
    return (
      <div className={divClasses}>
        <label>{label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  };

  onSubmit = (values) => {
    this.props.createPost(values, () => {
      this.setState({submitted: true});
    });
  };

  render() {
    if (this.state.submitted) {
      return <Redirect to="/" />
    }
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  };
}

function validate(values) {
  const errors = {};

  // Validate the inputs
  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  // If errors is empty, form is good
  // If errors has anything, form is not good
  return errors;
}

export default reduxForm({
  validate,
  form: 'NewPostForm'
})(
  connect(null,{ createPost })(NewPost)
);