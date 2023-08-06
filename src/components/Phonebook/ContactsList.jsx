import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getContacts,
	getIsLoading,
	getError,
	getFilter,
} from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import { fetchContactsThunk, deleteContactThunk } from 'redux/operations';
import css from './ContactsList.module.css';

export const ContactsList = () => {
	const dispatch = useDispatch();

	const data = useSelector(getContacts);
	const isLoading = useSelector(getIsLoading);
	const errorMessage = useSelector(getError);
	const filter = useSelector(getFilter);

	useEffect(() => {
		dispatch(fetchContactsThunk());
	}, [dispatch]);

	const handleInput = e => {
		dispatch(setFilter(e.target.value));
	};

	const handleDelete = idToBeDeleted => {
		dispatch(deleteContactThunk(idToBeDeleted));
	};

	return (
		<div className={css.contacts__container}>
			<h1 className={css.contacts__title}>Contacts</h1>

			{isLoading && !errorMessage && (
				<p className={css.contacts__empty}>Request in progress...</p>
			)}

			{errorMessage && <p className={css.contacts__empty}>{errorMessage}</p>}

			{data.length === 0
				? !isLoading &&
				  !errorMessage && (
						<p className={css.contacts__empty}>Contacts list is empty</p>
				  )
				: !isLoading && (
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
											<div>
												<p>{item.name}:</p>
												{item.number}
											</div>
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
