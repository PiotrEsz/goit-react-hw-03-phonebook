import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import css from './Form.module.css';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  //put initial values to state
  state = {
    ...INITIAL_STATE,
  };

  //change of state based on onChange event from input
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // console.log(this.props.contacts);
    // console.log(this.state);
  };

  //clear form function
  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  //on form Submit function
  handleSubmit = e => {
    //prevent default form behaviour
    e.preventDefault();

    //destructuring props given from App
    const { contacts, addContact } = this.props;

    //create new contact object from input based onChange event and values from setState
    const newContact = {
      id: uuidv4(),
      name: this.state.name,
      number: this.state.number,
    };



    // console.log(newContact);

    //check if contact exist in data
    let isContact = false;

    contacts.forEach(el => {
      if (el.name.toLowerCase() === newContact.name.toLowerCase()) {
        isContact = true;
        return;
      }
    });

    if (!isContact) {
      addContact(newContact);
    } else {
      toast.warn('You cannot add the same name twice!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }

    // console.log({ ...this.state });
    // this.props.onSubmit({ ...this.state });

    //clear form
    this.reset();
  };

  //creating DOM elements
  render() {
    const { name, number } = this.state;
    return (
      <div>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label htmlFor="name" className={css.formLabel}>
            Name
            <input
              className={css.formInput}
              value={name}
              onChange={this.handleChange}
              id="name"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label htmlFor="number" className={css.formLabel}>
            Number
            <input
              className={css.formInput}
              value={number}
              onChange={this.handleChange}
              type="tel"
              id="number"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit" className={css.btnAdd}>Add contact</button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  handleChange: PropTypes.func,
  number: PropTypes.string,
  name: PropTypes.string,
};

export default ContactForm;
