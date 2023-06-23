import React from 'react';
import css from './ContactsList.module.css';

export function ContactsList({ data }) {
	return (
		<div className={css.contacts__container}>
			<h1 className={css.contacts__title}>Contacts</h1>

			{data.length === 0 ? (
				<p className={css.contacts__empty}>Contacts list is empty</p>
			) : (
				<ul className={css.contacts__list}>
					{data.map(item => (
						<li key={item.id} className={css.contacts__item}>
							{item.name}: {item.number}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
