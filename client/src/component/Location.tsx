import { Header } from "./Header";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Input,
  TableHead,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  getLocations,
  updateLocation,
  createLocation,
} from "../Provider/Location";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { StyledContainer, StyledStack, StyledTitle } from "./Device";

export function Location() {
  const [locations, setLocations]: any[] = useState([]);
  const [newLocation, setNewLocation]: any[] = useState({});
  const [createNewLocation, setCreateNewLocation]: any[] = useState(false);

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
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Location</TableCell>
                <TableCell style={{ width: 100 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location: any) =>
                location.isEdit ? editMode(location) : watchMode(location)
              )}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  {createNewLocation ? (
                    <Input
                      onChange={(e) => {
                        newLocation.name = e.target.value;
                        setNewLocation(newLocation);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell>
                  {createNewLocation ? (
                    <>
                      <IconButton
                        color={"primary"}
                        onClick={async () => {
                          const result = await createLocation(newLocation);
                          if (result && !result.error) {
                            locations.push(result);
                            setLocations([...locations]);
                            setCreateNewLocation(false);
                          }
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        color={"secondary"}
                        onClick={() => {
                          setNewLocation({});
                          setCreateNewLocation(false);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      color={"primary"}
                      onClick={() => {
                        setCreateNewLocation(true);
                      }}
                    >
                      {" "}
                      <AddIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledStack>
      </StyledContainer>
    </div>
  );
}
