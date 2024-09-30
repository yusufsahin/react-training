import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';

const PostForm = ({ initialValues, onSubmit, users }) => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
    userId: Yup.string().required('Please select a user'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}  // Apply validation schema
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();  // Reset the form after submission
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field
              name="title"
              className={`form-control ${touched?.title && errors?.title ? 'is-invalid' : ''}`} // Ensure touched and errors are accessed safely
            />
            <ErrorMessage name="title" component="div" className="invalid-feedback" />
          </div>

          {/* Body Field */}
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <Field
              name="body"
              as="textarea"
              className={`form-control ${touched?.body && errors?.body ? 'is-invalid' : ''}`} // Ensure touched and errors are accessed safely
            />
            <ErrorMessage name="body" component="div" className="invalid-feedback" />
          </div>

          {/* User Select Field */}
          <div className="form-group">
            <label htmlFor="userId">User</label>
            <Field
              as="select"
              name="userId"
              className={`form-control ${touched?.userId && errors?.userId ? 'is-invalid' : ''}`}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="userId" component="div" className="invalid-feedback" />
          </div>

          <Button type="submit" variant="primary" className="mt-3">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
