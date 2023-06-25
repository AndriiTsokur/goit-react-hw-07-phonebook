import React from 'react';
import { AddContact } from '../Phonebook';
import { ContactsList } from '../Phonebook';
import css from './App.module.css';

export class App extends React.Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],
	};

	onAddContact = newContact => {
		const duplicate = this.state.contacts.find(
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

		this.setState({
			contacts: [completeContact, ...this.state.contacts],
		});
	};

	handleDelete = idToBeDeleted => {
		this.setState({
			contacts: this.state.contacts.filter(
				contact => contact.id !== idToBeDeleted
			),
		});
	};

	render() {
		return (
			<section className={css.app__container}>
				<AddContact onAddContact={this.onAddContact} />
				<ContactsList
					data={this.state.contacts}
					handleDelete={this.handleDelete}
				/>
			</section>
		);
	}
}
