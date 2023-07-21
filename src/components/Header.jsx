import React from "react";
import "../styles.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Details from "./Details";

const header = (prop) => {
  return (
    <div className="header">
      <h3>IP address Tracker</h3>
      <form action="">
        <div className="searchBar">
          <input placeholder="Search for an IP or domain..." type="text" />
          <button type="submit">
            <KeyboardArrowRightIcon
              sx={{ paddingTop: "10px", borderRadius: "50px", width: "22px" }}
              fontSize="medium"
            />
          </button>
        </div>
      </form>
      <p className="warning"></p>
      <div className="infoTray">
        <Details title="IP ADDRESS" info={prop.ip_address} />
        <hr />
        <Details title="LOCATION" info={prop.location} />
        <hr />
        <Details title="TIMEZONE" info={prop.timezone} />
        <hr />
        <Details title="ISP" info={prop.isp} />
      </div>
    </div>
  );
};

export default header;
