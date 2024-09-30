import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Post-User CRUD</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
