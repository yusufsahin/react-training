import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Table } from 'react-bootstrap';

const UserList = () => {
  const { users, fetchUsers } = useContext(AppContext);

  useEffect(() => {
    fetchUsers();  // Call fetchUsers on mount
  }, [fetchUsers]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
