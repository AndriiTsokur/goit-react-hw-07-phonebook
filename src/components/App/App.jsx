import { useEffect, useState } from 'react';
import { AddContact } from '../Phonebook';
import { ContactsList } from '../Phonebook';

import defaultContacts from '../Phonebook/defaultContacts.json';
import css from './App.module.css';

export const App = () => {
	const [contacts, setContacts] = useState([]);
	const [justLoaded, setJustLoaded] = useState(true);

	const localData = JSON.parse(localStorage.getItem('contacts'));

	useEffect(() => {
		if (!justLoaded) return;

		setContacts(
			localData && localData.length !== 0 ? localData : defaultContacts
		);
	}, [justLoaded, localData]);

	useEffect(() => {
		setJustLoaded(false);
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts]);

	const onAddContact = newContact => {
		const duplicate = contacts.find(
			({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
		);

		if (duplicate) {
			alert(`${duplicate.name} is already in contacts`);
			return;
		}

		const completeContact = {
			...newContact,
			id: `id-${(Math.random() * 1000).toString()}`,
		};

		setContacts([completeContact, ...contacts]);
	};

	const handleDelete = idToBeDeleted => {
		setContacts(contacts.filter(contact => contact.id !== idToBeDeleted));
	};

	return (
		<section className={css.app__container}>
			<AddContact onAddContact={onAddContact} />
			<ContactsList data={contacts} handleDelete={handleDelete} />
		</section>
	);
};
