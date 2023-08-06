import axios from 'axios';

axios.defaults.baseURL = 'https://64ccd1982eafdcdc851a53ae.mockapi.io/api';

export const fetchContactsData = async () => {
	return await axios.get('/contacts');
};

export const postNewContact = async newContactData => {
	return await axios.post('/contacts', newContactData);
};

export const deleteContactData = async contactId => {
	return await axios.delete(`/contacts/${contactId}`);
};
