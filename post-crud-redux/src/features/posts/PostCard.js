import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PostCard = ({ title, body, user, date, onEdit, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">By: {user}</Card.Subtitle>
        <Card.Text>{new Date(date).toLocaleDateString()}</Card.Text>
        <Button variant="warning" className="mr-2" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
