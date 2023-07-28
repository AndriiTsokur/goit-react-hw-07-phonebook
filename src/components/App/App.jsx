import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addNewContact, deleteContact } from 'redux/contactsSlice';
import { AddContact } from '../Phonebook';
import { ContactsList } from '../Phonebook';
import css from './App.module.css';

export const App = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(getContacts);

	const onAddContact = newContact => {
		const duplicate = contacts.find(
			({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
		);

		if (duplicate) {
			alert(`${duplicate.name} is already in contacts`);
			return;
		}

		const completeContact = {
			id: `id-${nanoid()}`,
			...newContact,
		};

		dispatch(addNewContact([completeContact, ...contacts]));
	};

	const handleDelete = idToBeDeleted => {
		dispatch(
			deleteContact(contacts.filter(contact => contact.id !== idToBeDeleted))
		);
	};

	return (
		<section className={css.app__container}>
			<AddContact onAddContact={onAddContact} />
			<ContactsList data={contacts} handleDelete={handleDelete} />
		</section>
	);
};
