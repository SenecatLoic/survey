import { useEffect, useState } from "react";
import { Header } from "./Header";
import { getDevices, updateDevice } from "../Provider/Device";
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
import { getLocations } from "../Provider/Location";
import { getSurveys } from "../Provider/Survey";

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

let locationOptions: any[] = [];

let surveyOptions: any[] = [];

export function Device() {
  const [devices, setdevices]: any[] = useState([]);

  useEffect(() => {
    (async () => {
      let devices = await getDevices();
      if (devices.length) {
        //à faire
      }
      const locations = await getLocations();
      locationOptions = locations.map((location: any)=>{
        return { label:location.name, id: location.id };
      });
      const surveys = await getSurveys();
      surveyOptions = surveys.map((survey: any)=>{
        return { label:survey.name, id: survey.id} ;
      });
      devices = devices.map((device: any) => {
        return {
          ...device,
          isEdit: false,
          newLocation: device.locationId,
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
            defaultValue={(() => {
              return surveyOptions.find((survey: any)=>{
                return (survey.id === device.currentSurvey)})
            })()}
            onChange={(event: any, newValue: any) => {
              device.newSurvey = newValue.id;
            }}
            renderInput={(params) => <TextField {...params} label="Survey" />}
          />
        </TableCell>
        <TableCell>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locationOptions}
            defaultValue={(() => {
              return locationOptions.find((location: any)=>{
                return (location.id === device.locationId)})
            })()}
            onChange={(event: any, newValue: any) => {
              device.newLocation = newValue.id;
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
        </TableCell>
        <TableCell style={{ width: 100 }}>
          <IconButton
            onClick={() => {
              device.isEdit = false;
              device.newLocation = device.locationId;
              device.newSurvey = device.currentSurvey;
              setdevices([...devices]);
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              device.isEdit = false;
              device.locationId = device.newLocation;
              device.currentSurvey = device.newSurvey;
              console.log(device);
              //update request device
              updateDevice(device);
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
    const survey = surveyOptions.find((survey: any)=>{
      return (survey.id === device.currentSurvey)}) || "";
    
    const location = locationOptions.find((location: any)=>{
      return (location.id === device.locationId)}) || "";
    return (
      <TableRow key={device.id}>
        <TableCell>{device.id}</TableCell>
        <TableCell>{survey.label}</TableCell>
        <TableCell>{location.label}</TableCell>
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
