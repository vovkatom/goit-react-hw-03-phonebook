import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';

import ContactForm from '../ContactsForm/ContactsForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Title from '../Title/Title';
import Massege from '../Massege/Massege';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts.`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  hendleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContactOnFilter = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const contactList = this.getContactOnFilter();
    const Length = contactList.length;
    const hendleDeleteContact = this.hendleDeleteContact;
    const filter = this.state.filter;
    const changeFilter = this.changeFilter;
    const contact = this.addContact;

    return (
      <Container>
        <Title title="Phonebook"></Title>
        <ContactForm onSubmit={contact}></ContactForm>
        <div>
          <Title title="Contacts"></Title>
          <Filter value={filter} onChange={changeFilter}></Filter>
          {Length > 0 ? (
            <ContactList
              contactList={contactList}
              hendleDeleteContact={hendleDeleteContact}
            ></ContactList>
          ) : (
            <Massege info=""></Massege>
          )}
        </div>
      </Container>
    );
  }
}

export default App;
