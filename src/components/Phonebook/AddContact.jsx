import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContactThunk } from 'redux/operations';
import css from './AddContact.module.css';

const INITIAL_STATE = {
	name: '',
	number: '',
};

export const AddContact = () => {
	const contacts = useSelector(selectContacts);
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

		dispatch(addContactThunk(newContact));
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
