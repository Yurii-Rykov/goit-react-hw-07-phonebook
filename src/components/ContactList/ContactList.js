import React from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsNameQuery, useDeleteContactMutation } from '../../services/fetchApi';
import s from './ContactList.module.css';

const ContactList = () => {

  const filter = useSelector(state => state.contactReduce.filter)
  const { data, isLoading } = useGetContactsNameQuery();
  const [deleteContact, {isLoading: isDeleting}] = useDeleteContactMutation();

  const visibleContacts = () => {
    const normalizedFilter = filter?.toLowerCase();
    return (
      data?.filter(contact =>
        contact?.name?.toLowerCase()?.includes(normalizedFilter)
      ) ?? []
    );
  };

  return (
    <ul className={s.contacts}>
      {isLoading && <p>Loading..</p>}
      {visibleContacts().map(({ name, phone, id }) => (
        <li key={id} className={s.contacts_item}>
          {name}: {phone}
          <button
            type="button"
            className={s.btnDelete}
            onClick={() => deleteContact(id)}
          >
            {isDeleting ? 'Deleting..' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
