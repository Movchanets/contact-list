import { StrictMode, Component } from "react";
import { createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";

// Import Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import css
import "./index.css";

// Import components
import Header from "./components/Header/Header.js";
import ContactList from "./components/ContactList/ContactList";
import AddContact from "./components/AddContact/AddContact";
import EditContact from "./components/EditContact/EditContact";
import NotFound from "./components/NotFound/NotFound";



class App extends Component {
  // function base and class based
 URL = 
//"https://pv016-4b622-default-rtdb.europe-west1.firebasedatabase.app.json";
"https://contact-list-25b13-default-rtdb.europe-west1.firebasedatabase.app/PeopleList.json";

updateContact = (data) => {
  fetch(this.URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
getAllContacts = () => {
  const data = fetch(this.URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.length === null) {
        return [];
      } else {
        return data;
      }
    });
  return data;
};
  state = {
    currentContact: 0,
    findContact: "",
  
    PeopleList: [
      
      // {
      //   id: uuidv4(),
      //   name: "Alexandra Verdnam",
      //   phone: "(067)125-45-21",
      //   email: "av@gmail.com",
      //   category: "Friends",
      //   gender: "women",
      //   avatar: "43",
      //   favorite: false,
      // },
      // {
      //   id: uuidv4(),
      //   name: "Jimmy Frllon",
      //   phone: "(050)155-55-31",
      //   email: "jf@gmail.com",
      //   category: "Work",
      //   gender: "men",
      //   avatar: "29",
      //   favorite: true,
      // },
    ],
  };
  // updateContact=(url = '', data = {}) =>{
  //   console.log(url);
  //   console.log(data);
   
  //   const response =  fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //    // mode: 'cors', // no-cors, *cors, same-origin
  //     //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     //credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //    // redirect: 'follow', // manual, *follow, error
  //   //  referrerPolicy: 'no-referrer', // no-referrer, *client
  //     body: JSON.stringify(data) // body data type must match "Content-Type" header
  //   });
  //   //return  response.json(); // parses JSON response into native JavaScript objects
  // }
  componentDidMount = () => {
    let ContactList = this.getAllContacts();
    ContactList.then((list) => {
      this.setState({
        PeopleList: list,
      });
    });
  };
  onAddNewContact = (newContact) => {
    let tmpList = this.state.PeopleList.slice();
    tmpList.unshift(newContact);
    this.setState({
      PeopleList: tmpList,
    });
    this.updateContact(tmpList);
  };

  onEditContact = (newContact) => {
    let tmpList = this.state.PeopleList.slice();
    tmpList.splice(tmpList.findIndex(i=>i.id== this.state.currentContact),1);
    tmpList.unshift(newContact);
    this.setState({
      PeopleList: tmpList,
    });
    this.updateContact(tmpList);
  };
  onChangeFavorite = (id) => {
    const index = this.state.PeopleList.findIndex((e) => e.id === id);
    let tmpList = this.state.PeopleList.slice();
    tmpList[index].favorite = !tmpList[index].favorite;
    this.setState({
      PeopleList: tmpList,
    });
  };
  onDelete = (id) => {
    const index = this.state.PeopleList.findIndex((e) => e.id === id);
    let tmpList = this.state.PeopleList.slice();
    tmpList.splice(index,1);
    this.setState({
      PeopleList: tmpList,
    });
    this.updateContact(tmpList);
  };
  ChangeCurrent = (id) => {
    
    
   
    this.setState({
      currentContact: id,
    });
    console.log(id);
  };


  onChangeCategory = (id) => {
    const index = this.state.PeopleList.findIndex((e) => e.id === id);
    const tmpList = this.state.PeopleList.slice();
    let currentContact = tmpList[index];

    switch (currentContact.category) {
      case "Work":
        tmpList[index].category = "Family";
        this.setState({
          PeopleList: tmpList,
        });
        break;
      case "Family":
        tmpList[index].category = "Private";
        this.setState({
          PeopleList: tmpList,
        });
        break;
      case "Private":
        tmpList[index].category = "Friends";
        this.setState({
          PeopleList: tmpList,
        });
        break;
      case "Friends":
        tmpList[index].category = "Work";
        this.setState({
          PeopleList: tmpList,
        });
        break;
    }
    this.updateContact(tmpList);
  };
  onSearch = (contactName) => {
    this.setState({
      findContact: contactName,
    });
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
    const { PeopleList } = this.state;
    const  showContacts = this.onShowContactList(PeopleList,this.state.findContact);
   
    return (
      <Router>
       <Header onSearch={this.onSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                List={showContacts}
                onChangeCategory={this.onChangeCategory}
                onChangeFavorite={this.onChangeFavorite}
                onDelete={this.onDelete}
                ChangeCurrent={this.ChangeCurrent}
               
               
              />
            }
          />
          <Route
            path="/add-contact"
            element={<AddContact List={PeopleList} onAddNewContact={this.onAddNewContact} />}
          />
          <Route path="/edit-contact" element={<EditContact current ={this.state.currentContact} List={PeopleList} onEditContact={this.onEditContact}  />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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

