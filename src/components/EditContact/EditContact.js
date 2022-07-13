import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SideBar from "../Sidebar/Sidebar";
import { Navigate } from "react-router-dom";
import { UpdateContactList } from "../../Actions/ContactListActions";
import { connect } from "react-redux";


const EditContact = ({ UpdateContactList, PeopleList, currentId,URL}) => {
  const CreateUrl= ()=>
  {
  return `https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`;
  }
  const CreateUrl2= (gender, avatar)=>
  {
  return `https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`;
  }

  const [isRedirect, setRedirect] = useState(false);
  let element = PeopleList.find(i=>i.id === currentId);
  let gender = element.gender; let avatar=element.avatar;
  const [Url, SetUrl] = useState(CreateUrl2(element.gender, element.avatar)); 


  const onEditContact = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const phone = e.target[1].value;
    const email = e.target[2].value;
    const avatar = e.target[3].value;
    const gender = e.target[4].value;
    const category = e.target[5].value;
    const favorite = e.target[6].checked;

    const newContact = {
      id: uuidv4(),
      name,
      phone,
      email,
      avatar,
      gender,
      category,
      favorite,
    };

    const tmpList = PeopleList.slice();
    tmpList.splice(tmpList.findIndex(i=>i.id== currentId,1));
    tmpList.unshift(newContact);
    
    updateContact(tmpList);
    UpdateContactList(tmpList);
    setRedirect(true);
  };

  const updateContact = (data) => {
    fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <> {isRedirect === true? <Navigate to="/" replace={true} />:""}
    
    <div className="container bootstrap snippets bootdeys bootdey">
      <div className="row decor-default">
        <SideBar />
       
        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="contacts-list">
            <h5 className="title">Edit contact</h5>
            <form onSubmit={onEditContact}>
              <div>
                <label htmlFor="name" className="form-label" >
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  className="form-control"
                  aria-describedby="name"
                  defaultValue={element.name}
                />
              </div>
              <div>
                <label htmlFor="inputPhone" className="form-label">
                  Phone
                </label>
                <input
                  required
                  type="text"
                  name="phone"
                  className="form-control"
                  aria-describedby="phone"
                  defaultValue={element.phone}
                />
              </div>
              <div>
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control"
                  aria-describedby="Email"
                  defaultValue={element.email}
                />
              </div>
              <div className="d-flex col-12">
                <div className="col-6">
              <div>
                <label htmlFor="avatar" className="form-label">
                  Avatar
                </label>
                <input
                  required
                  type="number"
                  name="avatar"
                  min={0}
                  max={99}
                  defaultValue={element.avatar}
                  onChange ={(e)=>{avatar = e.target.value;SetUrl(CreateUrl) }}
                  className="form-control"
                  aria-describedby="avatar"
                />
              </div>
              <div>
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                 
                  onChange={(e)=>{gender = e.target.value;SetUrl(CreateUrl)}}
                >{
                  gender=="men"?<><option defaultValue value="men">{element.gender}</option>
                  <option value="women">Woman</option></>:
                  <><option defaultValue value="women">{element.gender}</option>
                  <option value="men">Man</option></>
                }
                 
                </select>
              </div>
              </div>

  <div className="col-6 p-3">
          <img   src={Url} alt="image"  /> 
        </div>
        </div>
              <div>
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue={element.category}
                  
                  required
                >
                  <option defaultValue>Choose category...</option>
                  <option value="Work">Work</option>
                  <option value="Family">Family</option>
                  <option value="Private">Private</option>
                  <option value="Friends">Friends</option>
                </select>
              </div>
              <div>
                <div>
                  <label htmlFor="favorite" className="form-label">
                    Favorite
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    aria-label="..."
                    defaultChecked = {element.checked}
                  />
                </div>
              </div>
              <div className="btn-save">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div></>
  );
};

const mapStateToProps = ({ ContactListReducer }) => {
  const { PeopleList ,currentId,URL} = ContactListReducer;
  return { PeopleList,currentId,URL };
};

const mapDispatchToProps = {
  UpdateContactList,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
