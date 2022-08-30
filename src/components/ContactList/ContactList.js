import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { delet } from '../../reduce/action';
import { useGetContactsNameQuery, useDeleteContactMutation } from '../../services/fetchApi';
import s from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contactReduce.filter)

  const { data, error, isLoading } = useGetContactsNameQuery();
  const [deleteContact, {isLoading: isDeleting}] = useDeleteContactMutation();

  // useEffect(() => {
  //   // console.log(data);
  // },[data])

  const visibleContacts = () => {
    const normalizedFilter = filter?.toLowerCase();
    return (
      data?.filter(contact =>
        contact?.name?.toLowerCase()?.includes(normalizedFilter)
      ) ?? []
    );
  };

  // const onDelete = id => {
  //   dispatch(delet(id))
  // }

  return (
    <ul className={s.contacts}>
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
