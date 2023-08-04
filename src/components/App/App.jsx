import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { AddContact } from '../Phonebook';
import { ContactsList } from '../Phonebook';
import css from './App.module.css';

export const App = () => {
	const contacts = useSelector(getContacts);

	return (
		<section className={css.app__container}>
			<AddContact contacts={contacts} />
			<ContactsList data={contacts} />
		</section>
	);
};
