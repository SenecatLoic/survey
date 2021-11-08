import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <div>
          <Link to={"/"}>Dashboard</Link>
        </div>
        <div>
          <Link to="/surveys">Surveys</Link>
        </div>
        <div>
          <Link to="/devices">Devices</Link>
        </div>
        <div>
          <Link to="/locations">Locations</Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
