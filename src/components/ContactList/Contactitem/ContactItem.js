import "./ContactItem.css";
import { Link } from "react-router-dom";
const ContactItem = ({
  id,
  name,
  phone,
  email,
  avatar,
  gender,
  category,
  favorite,
  onChangeCategory,
  onChangeFavorite,
  onDelete,
  ChangeCurrent

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

  return (
    <div className="unit">
      <div className="field name">
        <div className="check ">
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
        </div>
        <button className="lab bg-black" onClick={onDelete}>delete</button>
        <button className="lab bg-danger" onClick={ChangeCurrent}>
       
          <Link  className="navbar-brand" to="/edit-contact"> 
                Edit 
              </Link></button>
        <div className={categoryStyle} onClick={onChangeCategory}>
          {category}
        </div>
      </div>
      <div className="field phone">{phone}</div>
      <div className="field email">{email}</div>
      
    </div>
  );
};

export default ContactItem;
