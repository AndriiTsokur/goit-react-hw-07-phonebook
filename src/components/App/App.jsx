import React from 'react';
import { AddContact } from '../Phonebook';
import { ContactsList } from '../Phonebook';
import css from './App.module.css';

export class App extends React.Component {
	state = {
		contacts: [],
	};

	onAddContact = newContact => {
		const completeContact = {
			...newContact,
			id: `id-${(Math.random() * 1000).toString()}`,
		};

		this.setState({
			contacts: [completeContact, ...this.state.contacts],
		});
	};

	render() {
		return (
			<section className={css.app__container}>
				<AddContact onAddContact={this.onAddContact} />
				<ContactsList data={this.state.contacts} />
			</section>
		);
	}
}
