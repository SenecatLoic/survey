import { AppBar, styled, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

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
  fontSize: "calc(1em + 1vw)",
}));

const StyleToolBar = styled(Toolbar)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-between",
      width: "lg",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between",
      width: "50%",
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
