const SideBar = (List) => {
  const tmpList = List.List;
  return (
    
    <div className="col-lg-3 col-md-4 col-sm-12">
      <div className="contacts-labels">
        <div className="title">
          All contacts<span>{tmpList.length}</span>
        </div>
        <div className="list">
          <div className="unit">
            <div className="lab lab-success">Work</div>
            <span>{tmpList.filter(i=>i.category =="Work").length}</span>
          </div>
          <div className="unit">
            <div className="lab lab-primary">Family</div>
            <span>{tmpList.filter(i=>i.category =="Family").length}</span>
          </div>
          <div className="unit">
            <div className="lab lab-danger">Private</div>
            <span>{tmpList.filter(i=>i.category =="Private").length}</span>
          </div>
          <div className="unit">
            <div className="lab lab-warning">Friends</div>
            <span>{tmpList.filter(i=>i.category =="Friends").length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
