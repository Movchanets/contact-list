import { connect } from "react-redux";
const SideBar = ({PeopleList,filter}) => {
  let Filter =PeopleList;
  let visible;
  
 
  if (filter.length === "") {
    visible = PeopleList;
   
  }

  visible = PeopleList.filter((item) => {
    return item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  });
  return (
    <div className="col-lg-3 col-md-4 col-sm-12">
    <div className="contacts-labels">
      <div className="title">
        All contacts<span>{visible.length}</span>
      </div>
      <div className="list">
        <div className="unit">
          <div className="lab lab-success">Work</div>
          <span>{visible.filter(i=>i.category ==="Work").length}</span>
        </div>
        <div className="unit">
          <div className="lab lab-primary">Family</div>
          <span>{visible.filter(i=>i.category ==="Family").length}</span>
        </div>
        <div className="unit">
          <div className="lab lab-danger">Private</div>
          <span>{visible.filter(i=>i.category ==="Private").length}</span>
        </div>
        <div className="unit">
          <div className="lab lab-warning">Friends</div>
          <span>{visible.filter(i=>i.category ==="Friends").length}</span>
        </div>
      </div>
    </div>
  </div>
  );
};

const mapStateToProps = ({ContactListReducer})=>
{   const {PeopleList,filter}  = ContactListReducer;

    return {PeopleList,filter};
}
const mapDispatchToProps = {}
export default connect(mapStateToProps,mapDispatchToProps)(SideBar);
