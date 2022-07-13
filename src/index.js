import { StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
// Import Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import css
import "./index.css";

// Import components
import Header from "./components/Header/Header.js";
import ContactList from "./components/ContactList/ContactList";
import AddContact from "./components/AddContact/AddContact";
import NotFound from "./components/NotFound/NotFound";
import EditContact from "./components/EditContact/EditContact";

// Import store
import store from "./store";
import { Provider } from "react-redux";

class App extends Component {
  // function base and class based

  state = {
    currentContact: null,
    findContact: "",
  };

  

  



  onShowContactList = (List, findContact) => {
    if (findContact.length === 0) {
      return List;
    }

    return List.filter((item) => {
      return item.name.toLowerCase().indexOf(findContact.toLowerCase()) > -1;
    });
  };

  render() {
    const { PeopleList, currentContact, findContact } = this.state;
    const showContacts = this.onShowContactList(PeopleList, findContact);
    return (
      <Router>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ContactList   />
              }
            />
            <Route path="/add-contact" element={<AddContact />} />
            <Route
              path="/edit-contact"
              element={<EditContact  />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
