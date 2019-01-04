import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
class Example extends Component {
  renderErr = ({error, touched}) => {
    if(touched && error) {
        return <div>{error}</div>
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderErr(meta)}
      </div>
    );
  };

  onSubmit = fValues => {
    console.log(fValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="name" />
        <Field
          name="description"
          component={this.renderInput}
          label="description"
        />
        <button>Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Enter a Title";
  }

  if (!formValues.description) {
    errors.description = "Enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "Example",
  validate
})(Example);
