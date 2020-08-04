import React from 'react';

import ContactItem from './contactItem';
import { Table } from './style';

const contactTable = ({ contacts }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>Image</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </tbody>
    </Table>
  );
};

export default contactTable;
