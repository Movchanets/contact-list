import { connect } from "react-redux";
import { UpdateContactList } from "../../../Actions/ContactListActions";
import { ChangeCurrent } from "../../../Actions/ContactListActions";
import { Link } from "react-router-dom";
import "./ContactItem.css";

const ContactItem = ({
  id,
  name,
  phone,
  email,
  avatar,
  gender,
  category,
  favorite,
  PeopleList,
  UpdateContactList,
  
  ChangeCurrent,
}) => {
  const URL_AVATAR = `https://api.randomuser.me/portraits/${gender}/${avatar}.jpg`;
  let categoryStyle = "lab friends";
  let favoriteStyle = "fa fa-star fa-2x favorite";

  switch (favorite) {
    case false:
      favoriteStyle = "fa fa-star-o fa-2x favorite";
      break;
  }

  switch (category) {
    case "Work":
      categoryStyle = "lab work";
      break;
    case "Family":
      categoryStyle = "lab family";
      break;
    case "Private":
      categoryStyle = "lab private";
      break;
    case "Friends":
      categoryStyle = "lab friends";
      break;
  }
const onChangeCurrent= ()=>
{

ChangeCurrent(id);
}
  const onChangeFavorite = () => {
    const index = PeopleList.findIndex((e) => e.id === id);
    let tmpList = PeopleList.slice();
    tmpList[index].favorite = !tmpList[index].favorite;
    UpdateContactList(tmpList);
  };
  const onChangeCategory = () => {
    const index = PeopleList.findIndex((e) => e.id === id);
    let tmpList = PeopleList.slice();
    let current = tmpList[index];
    switch (current.category) {
      case "Work":
        current.category = "Family"
        break;
      case "Family":
        current.category = "Private"
        break;
      case "Private":
        current.category = "Friends"
        break;
      case "Friends":
        current.category = "Work"
        break;
    }
    UpdateContactList(tmpList);
  };
  const Delete = () => {
    const index = PeopleList.findIndex((e) => e.id === id);
    let tmpList = PeopleList.slice();
    tmpList.splice(index,1);
    UpdateContactList(tmpList);
  }
  return (
    <div className="unit">
      <div className="field name">
        <div className="check">
          <i
            className={favoriteStyle}
            aria-hidden="true"
            onClick={onChangeFavorite}
          ></i>

          <input id="cb2" name="cb1" type="checkbox" />
          <label htmlFor="cb2"></label>
        </div>
        <div>
          <img src={URL_AVATAR} alt="image" className="avatar" /> {name}
          <button className="lab bg-black" onClick={Delete}>delete</button>
        
        </div>
     
        <div className={categoryStyle} onClick={onChangeCategory}>
          {category}
        </div>
      </div>
      <div className="field phone">{phone}</div>
      <div className="field email">
        {email}{" "}
        <Link to="/edit-contact">
          <i
            className="fa fa-pencil fa-2x edit"
            aria-hidden="true"
            onClick={onChangeCurrent}
          ></i>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ ContactListReducer }) => {
  const { PeopleList } = ContactListReducer;
  return { PeopleList };
};

const mapDispatchToProps = {
  UpdateContactList,ChangeCurrent
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
