import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getContacts,
  addContact,
  clearCurrent,
  updateContact,
} from '../../redux/contact/contact.action';
import {
  selectContacts,
  selectCurrentContact,
} from '../../redux/contact/contact.selector';

import { Card, FormControl, Container } from './style';
import { Form } from '../../components/form';

import ContactTable from './contactTable';

const ContactPage = ({
  getContacts,
  contacts,
  addContact,
  currentContact,
  clearCurrent,
  updateContact,
}) => {
  const [profile_image, setImage] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhone] = useState('');

  useEffect(() => {
    getContacts();

    if (currentContact) {
      setFirstname(currentContact.firstname);
      setLastname(currentContact.lastname);
      setEmail(currentContact.email);
      setPhone(currentContact.phonenumber);
    }
  }, [getContacts, currentContact]);

  const inputRef = useRef();

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const fileTransform = (e) => {
    getBase64(e.target.files[0], (base64String) => {
      setImage(base64String);
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentContact === null) {
      addContact({
        profile_image,
        firstname,
        lastname,
        email,
        phonenumber,
      });
    } else {
      updateContact({
        id: currentContact.id,
        firstname,
        lastname,
        email,
        phonenumber,
        profile_image,
      });
    }

    clearAll();
  };

  return (
    <Container>
      <Card>
        <Form onSubmit={onSubmit}>
          <h3>Contact Manager</h3>
          <FormControl>
            <input
              type='text'
              name='firstname'
              value={firstname || ''}
              placeholder='First Name'
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <input
              type='text'
              name='lastname'
              value={lastname || ''}
              placeholder='Last Name'
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <input
              type='text'
              name='email'
              value={email || ''}
              placeholder='Email Address'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <input
              type='number'
              name='phone'
              value={phonenumber || ''}
              placeholder='Phone Number'
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <input
              type='file'
              name='profile_image'
              ref={inputRef}
              onChange={fileTransform}
            />
          </FormControl>

          <input
            type='submit'
            value={currentContact ? 'Update Contact' : 'Add Contact'}
          />
          {currentContact && <button onClick={clearAll}>Clear</button>}
        </Form>
        <ContactTable contacts={contacts} />
      </Card>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  contacts: selectContacts,
  currentContact: selectCurrentContact,
});

const mapDispatchToProps = (dispatch) => ({
  getContacts: () => dispatch(getContacts()),
  addContact: (formData) => dispatch(addContact(formData)),
  updateContact: (formData) => dispatch(updateContact(formData)),
  clearCurrent: () => dispatch(clearCurrent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
