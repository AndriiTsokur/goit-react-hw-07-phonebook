import React, { Component } from 'react';
import css from './AddContact.module.css';

const INITIAL_STATE = {
	name: '',
	number: '',
};

export class AddContact extends Component {
	state = { ...INITIAL_STATE };

	handleInput = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.onAddContact(this.state);

		this.setState({ ...INITIAL_STATE });
	};

	render() {
		return (
			<div className={css.phonebook__container}>
				<h1 className={css.phonebook__title}>Phonebook</h1>
				<form onSubmit={this.handleSubmit}>
					<label className={css.phonebook__label}>
						Name:
						<input
							onChange={this.handleInput}
							value={this.state.name}
							className={css.phonebook__input}
							type="text"
							name="name"
							pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
							title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
							required
						/>
					</label>
					<label className={css.phonebook__label}>
						Number:
						<input
							onChange={this.handleInput}
							value={this.state.number}
							className={css.phonebook__input}
							type="tel"
							name="number"
							pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
							title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
							required
						/>
					</label>
					<button type="submit">Add contact</button>
				</form>
			</div>
		);
	}
}
