const initialState = {
  PeopleList: [],
  filter : "",
  currentId : 0,
  URL:"https://contact-list-25b13-default-rtdb.europe-west1.firebasedatabase.app/PeopleList.json"
};

const ContactListReducer = (state = initialState, action) => {
  console.log("ContactListReducer => ", action);

  switch (action.type) {
    case "CONTACT_LIST_LOADED":
      return {
        ...state,
        PeopleList: action.payload,
      };
    case "UPDATE_CONTACT_LIST":
      return {
        ...state,
        PeopleList: action.payload,
      };
      case"CURRENT":
  
      return{
        ...state,
        currentId:(action.payload),
      }
      case"SEARCH":
      
      return{
        ...state,
        filter:(action.payload),
      }
     
      
    default:
      return state;
  }

};

export default ContactListReducer;
