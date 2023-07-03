import React from 'react';
import { AddContact } from '../Phonebook';
import { ContactsList } from '../Phonebook';

import defaultContacts from '../Phonebook/defaultContacts.json';
import css from './App.module.css';

export class App extends React.Component {
	state = {
		contacts: [],
	};

	componentDidMount() {
		const localData = JSON.parse(localStorage.getItem('contacts'));

		this.setState({
			contacts: localData ? localData : defaultContacts,
		});
	}

	componentDidUpdate(_, prevState) {
		if (prevState.contacts.length !== this.state.contacts.length) {
			localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
		}
	}

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
