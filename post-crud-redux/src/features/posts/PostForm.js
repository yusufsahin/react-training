import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define the schema using Yup for form validation
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required'),
  postDate: yup.date().required('Date is required').typeError('Invalid date'),
});

const PostForm = ({ onSubmit, initialValues }) => {
  // Initialize the form with react-hook-form
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: initialValues || { title: '', body: '', postDate: new Date() },
    resolver: yupResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Form.Control
              type="text"
              isInvalid={!!errors.title}
              placeholder="Enter post title"
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="body">
        <Form.Label>Body</Form.Label>
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <Form.Control
              as="textarea"
              rows={3}
              isInvalid={!!errors.body}
              placeholder="Enter post body"
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.body?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="postDate">
        <Form.Label>Post Date</Form.Label>
        <Controller
          name="postDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              className={`form-control ${errors.postDate ? 'is-invalid' : ''}`}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.postDate?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        {initialValues?.id ? 'Update Post' : 'Create Post'}
      </Button>
    </Form>
  );
};

export default PostForm;
