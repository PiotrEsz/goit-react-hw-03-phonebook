import React, { Component } from 'react';
import ContactForm from './Form/Form';
import ContactList from './Contacts/ContactList';
import Filter from './Filter/Filter';
import Section from './Section/Section';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  NEW_CONTACT = 'new-contact';

  state = {
    contacts: [],
    filter: '',
  };

  //action on application loading
  componentDidMount() {
    const lsContacts = localStorage.getItem(this.NEW_CONTACT);
    const lsParsed = JSON.parse(lsContacts);

    if (lsParsed) {
      this.setState({ contacts: lsParsed });
    }
  }

  //saving data to localStorage
  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.state.contacts) {
      //adding new contact to localStorage
      localStorage.setItem(
        this.NEW_CONTACT,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    // console.log(this.state);
  };

  filterName = e => {
    this.setState({ filter: e.currentTarget.value });
    // console.log(this.state.filter);
  };

  filteredNames = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    // console.log(id);
    const index = this.state.contacts.findIndex(el => el.id === id);
    const array = [...this.state.contacts];
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ contacts: array });
    }
    // console.log(this.state.contacts);
  };

  render() {
    const filteredNames = this.filteredNames();
    const { contacts } = this.state;
    return (
      <>
        <Section title="Phonebook">
          <ContactForm
            // onSubmit={values => console.log(values)}
            addContact={this.addContact}
            contacts={contacts}
          />
        </Section>
        <Section title="Contacts">
          <Filter filterState={this.filterName} />
          <ContactList
            contactsFiltered={filteredNames}
            remove={this.deleteContact}
          />
          <ToastContainer />
        </Section>
      </>
    );
  }
}

export default App;
