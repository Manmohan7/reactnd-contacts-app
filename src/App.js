import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';
import { Route } from 'react-router-dom';

class App extends Component {
  /**
   * for react to have access to the contact
   * list and reflect the changes in list 
   * we need to have it inside state
   */
  state = {
    contacts: []
  }

  /**
   * fetch contact details from server when
   * the component is mounted
   */
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  /**
   * This function is here because the data 
   * of all the contacts is here
   * @param {Object} contact contact to be removed
   */
  removeContact = (contact) => {
    ContactsAPI.remove(contact)

    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))
  }

  render() {
    return (
      <div>

        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )} />

        <Route path="/create" component={CreateContact} />
      </div>
    );
  }
}

export default App;
