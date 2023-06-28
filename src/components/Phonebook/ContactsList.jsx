import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export class ContactsList extends React.Component {
	state = {
		filter: '',
	};

	handleInput = e => {
		this.setState({ filter: e.target.value });
	};

	render() {
		return (
			<div className={css.contacts__container}>
				<h1 className={css.contacts__title}>Contacts</h1>
				{this.props.data.length === 0 ? (
					<p className={css.contacts__empty}>Contacts list is empty</p>
				) : (
					<>
						<label className={css.contacts__label}>
							Find contacts by name:
							<input
								onChange={this.handleInput}
								value={this.state.filter}
								className={css.contacts__input}
								type="text"
								name="filter"
								required
							/>
						</label>

						<ul className={css.contacts__list}>
							{this.props.data
								.filter(({ name }) =>
									name.toLowerCase().includes(this.state.filter.toLowerCase())
								)
								.map(item => (
									<li key={item.id} className={css.contacts__item}>
										{item.name}: {item.number}
										<button
											className={css.contacts__deleteBtn}
											onClick={() => this.props.handleDelete(item.id)}
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
	}
}

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
