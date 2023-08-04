import { AddContact } from '../Phonebook';
import { ContactsList } from '../Phonebook';
import css from './App.module.css';

export const App = () => {
	return (
		<section className={css.app__container}>
			<AddContact />
			<ContactsList />
		</section>
	);
};
