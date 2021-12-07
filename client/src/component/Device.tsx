import { useEffect, useState } from "react";
import { Header } from "./Header";
import { getDevices } from "../Provider/Device";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

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
});

const locationOptions = [
  { label: "Texas", id: "122" },
  { label: "Berlin Ouest", id: "123" },
  { label: "Berlin Est", id: "124" },
];

const surveyOptions = [{ label: "rqueu87878", id: "rqueu87878" }];

export function Device() {
  const [devices, setdevices]: any[] = useState([]);

  useEffect(() => {
    (async () => {
      let devices = await getDevices();
      if (devices.length) {
        //à faire
      }
      devices = devices.map((device: any) => {
        return {
          ...device,
          isEdit: false,
          newLocation: "122",
          newSurvey: device.currentSurvey,
        };
      });
      setdevices(devices);
    })();
  }, []);

  const editMode = (device: any) => {
    return (
      <TableRow key={device.id}>
        <TableCell>{device.id}</TableCell>
        <TableCell>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={surveyOptions}
            value={device.newSurvey}
            onChange={(event: any, newValue: string | null) => {
              device.newSurvey = newValue;
            }}
            renderInput={(params) => <TextField {...params} label="Survey" />}
          />
        </TableCell>
        <TableCell>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locationOptions}
            value={(() => {
              return device.newLocation;
            })()}
            onChange={(event: any, newValue: string | null) => {
              console.log(event);
              console.log(newValue);
              device.newLocation = newValue;
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
        </TableCell>
        <TableCell style={{ width: 100 }}>
          <IconButton
            onClick={() => {
              device.isEdit = false;
              device.newLocation = device.location;
              device.newSurvey = device.currentSurvey;
              setdevices([...devices]);
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              device.isEdit = false;
              device.location = device.newLocation;
              device.currentSurvey = device.newSurvey;
              //update request device
              setdevices([...devices]);
            }}
          >
            <SaveIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  const displayMode = (device: any) => {
    return (
      <TableRow key={device.id}>
        <TableCell>{device.id}</TableCell>
        <TableCell>{device.currentSurvey}</TableCell>
        <TableCell>{device.location}</TableCell>
        <TableCell style={{ width: 100 }}>
          <IconButton
            onClick={() => {
              device.isEdit = true;
              setdevices([...devices]);
            }}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <Header />
      <StyledContainer>
        <StyledStack>
          <StyledTitle>Devices</StyledTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Current survey</TableCell>
                <TableCell>Location</TableCell>
                <TableCell style={{ width: 100 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((device: any) => {
                if (device.isEdit) {
                  return editMode(device);
                } else {
                  return displayMode(device);
                }
              })}
            </TableBody>
          </Table>
        </StyledStack>
      </StyledContainer>
    </div>
  );
}
