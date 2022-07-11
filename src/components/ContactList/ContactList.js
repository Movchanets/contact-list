// Import components
import ContactItem from "./Contactitem/ContactItem";
import SideBar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const ContactList = ({ List, onChangeCategory, onChangeFavorite ,onDelete,ChangeCurrent
  }) =>
{
  const singleContact = List.map((contact) => {
  
    return (
      <ContactItem
        key={contact.id}
        {...contact}
        onChangeCategory={() => onChangeCategory(contact.id)}
        onChangeFavorite={() => onChangeFavorite(contact.id)}
        onDelete={() => onDelete(contact.id)}
        ChangeCurrent={() => ChangeCurrent(contact.id)}
      />
    );
  });
  return (
    <>
   
      <div className="container bootstrap snippets bootdeys bootdey">
        <div className="row decor-default">
          <SideBar List ={List}/>
          <div className="col-lg-9 col-md-8 col-sm-12">
            <div className="contacts-list">
             
                <h5 className="title col-4 ">Show contacts</h5>
              
              
              <div className="unit head">
                <div className="field name">
                  <div className="check">
                    <input id="cb1" name="cb1" type="checkbox" />
                    <label htmlFor="cb1"></label>
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </div>
                  Name
                </div>
                <div className="field phone">Phone</div>
                <div className="field email icons">Email</div>
              </div>
              {singleContact}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactList;
