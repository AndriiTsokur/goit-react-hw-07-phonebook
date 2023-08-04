import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import { deleteContact } from 'redux/contactsSlice';
import css from './ContactsList.module.css';

export const ContactsList = () => {
	const dispatch = useDispatch();
	const data = useSelector(getContacts);
	const filter = useSelector(getFilter);

	const handleInput = e => {
		dispatch(setFilter(e.target.value));
	};

	const handleDelete = idToBeDeleted => {
		dispatch(
			deleteContact(data.filter(contact => contact.id !== idToBeDeleted))
		);
	};

	return (
		<div className={css.contacts__container}>
			<h1 className={css.contacts__title}>Contacts</h1>
			{data.length === 0 ? (
				<p className={css.contacts__empty}>Contacts list is empty</p>
			) : (
				<>
					<label className={css.contacts__label}>
						Find contacts by name:
						<input
							onChange={handleInput}
							value={filter}
							className={css.contacts__input}
							type="text"
							name="filter"
							required
						/>
					</label>

					<ul className={css.contacts__list}>
						{data
							.filter(({ name }) =>
								name.toLowerCase().includes(filter.toLowerCase())
							)
							.map(item => (
								<li key={item.id} className={css.contacts__item}>
									{item.name}: {item.number}
									<button
										className={css.contacts__deleteBtn}
										onClick={() => handleDelete(item.id)}
										type="button"
									>
										Delete
									</button>
								</li>
							))}
					</ul>
				</>
			)}
		</div>
	);
};
