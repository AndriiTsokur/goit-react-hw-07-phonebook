import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addNewContact } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import css from './AddContact.module.css';

const INITIAL_STATE = {
	name: '',
	number: '',
};

export const AddContact = ({ contacts }) => {
	const dispatch = useDispatch();
	const [state, setState] = useState({ ...INITIAL_STATE });

	const handleInput = e => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

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

	const handleSubmit = e => {
		e.preventDefault();
		onAddContact(state);

		setState({ ...INITIAL_STATE });
	};

	return (
		<div className={css.phonebook__container}>
			<h1 className={css.phonebook__title}>Phonebook</h1>
			<form onSubmit={handleSubmit}>
				<label className={css.phonebook__label}>
					Name:
					<input
						onChange={handleInput}
						value={state.name}
						className={css.phonebook__input}
						type="text"
						name="name"
						// pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
						title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
						required
					/>
				</label>
				<label className={css.phonebook__label}>
					Number:
					<input
						onChange={handleInput}
						value={state.number}
						className={css.phonebook__input}
						type="tel"
						name="number"
						// pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
						title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
						required
					/>
				</label>
				<button type="submit">Add contact</button>
			</form>
		</div>
	);
};

AddContact.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
};
