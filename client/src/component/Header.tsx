import { AppBar, styled, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { maxWidth } from "../../../../../e82f3fa5-10e3-4314-8f31-f583dde5f18b/survey/client/node_modules/@mui/system";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  backgroundColor: "black",
}));

const StyleAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "black",
}));

const StyleLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "white",
  fontSize: "2vmax",
}));

const StyleToolBar = styled(Toolbar)(({ theme }) => {
  console.log(theme);
  return {
    root: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "space-between",
        width: "lg",
      },
      [theme.breakpoints.up("sm")]: {
        justifyContent: "space-between",
        width: "50%",
      },
    },
  };
});

export function Header() {
  return (
    <StyleAppBar position="static">
      <SearchIconWrapper />
      <StyleToolBar>
        <div>
          <StyleLink to={"/"}>Dashboard</StyleLink>
        </div>
        <div>
          <StyleLink to="/surveys">Surveys</StyleLink>
        </div>
        <div>
          <StyleLink to="/devices">Devices</StyleLink>
        </div>
        <div>
          <StyleLink to="/locations">Locations</StyleLink>
        </div>
      </StyleToolBar>
    </StyleAppBar>
  );
}
