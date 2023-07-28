import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import css from './ContactsList.module.css';

export const ContactsList = ({ handleDelete, data }) => {
	const dispatch = useDispatch();
	const filter = useSelector(getFilter);

	const handleInput = e => {
		dispatch(setFilter(e.target.value));
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

ContactsList.propTypes = {
	handleDelete: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
};
