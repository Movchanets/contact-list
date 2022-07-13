export const GetAllContacts = (contactList) => {
  return {
    type: "CONTACT_LIST_LOADED",
    payload: contactList,
  };
};

export const UpdateContactList = (updatedContactList) => {
  return {
    type: "UPDATE_CONTACT_LIST",
    payload: updatedContactList,
  };
};
export const Search=(Name)=>
{
    return {
        type : "SEARCH",
        payload: Name
    }
}

export const ChangeCurrent =(id)=>
{
    return {
        type : "CURRENT",
        payload: id
    }
}