import { Header } from "./Header";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Input,
  styled,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getLocations, updateLocation } from "../Provider/Location";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const StyledStack = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "75%",
});

const StyledTitle = styled("div")({
  fontSize: "calc(0.5em + 1vw)",
  fontWeight: "bold",
  marginTop: "5%",
});

export function Location() {
  const [locations, setLocations]: any[] = useState([]);
  useEffect(() => {
    (async () => {
      let locations = await getLocations();
      if (locations.length) {
        //à faire
      }
      locations = locations.map((location: any) => ({
        ...location,
        editedName: location.name,
        isEdit: false,
      }));
      setLocations(locations);
    })();
  }, []);

  const editMode = (location: any) => (
    <TableRow key={location.id}>
      <TableCell>{location.id}</TableCell>
      <TableCell>
        <Input
          defaultValue={location.name}
          onChange={(e) => {
            location.editedName = e.target.value;
            setLocations([...locations]);
          }}
        />
      </TableCell>
      <TableCell>
        <IconButton
          color={"primary"}
          onClick={async () => {
            const result = await updateLocation(location);
            location.isEdit = false;
            if (result && !result.error) {
              location.name = location.editedName;
            } else {
              location.editedName = location.name;
            }
            setLocations([...locations]);
          }}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          color={"secondary"}
          onClick={() => {
            location.isEdit = false;
            location.editedName = location.name;
            setLocations([...locations]);
          }}
        >
          <CloseIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const watchMode = (location: any) => (
    <TableRow key={location.id}>
      <TableCell>{location.id}</TableCell>
      <TableCell>{location.name}</TableCell>
      <TableCell>
        <IconButton
          color={"primary"}
          onClick={() => {
            location.isEdit = true;
            setLocations([...locations]);
          }}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <div>
      <Header />
      <StyledContainer>
        <StyledStack>
          <StyledTitle>Locations</StyledTitle>
          <Table sx={{ maxWidth: "75%" }}>
            <TableBody>
              {locations.map((location: any) =>
                location.isEdit ? editMode(location) : watchMode(location)
              )}
            </TableBody>
          </Table>
        </StyledStack>
      </StyledContainer>
    </div>
  );
}
