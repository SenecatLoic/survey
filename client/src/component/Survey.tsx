import {
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSurveys, updateSurvey } from "../Provider/Survey";
import { StyledContainer, StyledStack, StyledTitle } from "./Device";
import { Header } from "./Header";
import EditIcon from "@mui/icons-material/Edit";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { getDateFormat } from "../tools/DateFormat";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export function Survey() {
  const [surveys, setsurveys]: any[] = useState([]);

  useEffect(() => {
    (async () => {
      let surveys = await getSurveys();

      surveys = surveys.map((survey: any) => {
        survey.isEdit = false;
        return {
          ...survey,
          isEdit: false,
          newName: survey.name,
          newDtCreation: survey.dtcreation,
          newDtEnd: survey.dtend,
        };
      });
      setsurveys(surveys);
    })();
  }, []);

  const editMode = (survey: any) => {
    //timestamp js
    return (
      <TableRow key={survey.id}>
        <TableCell>{survey.id}</TableCell>
        <TableCell>
          <Input
            defaultValue={survey.name}
            onChange={(newValue) => {
              survey.newName = newValue;
            }}
          />
        </TableCell>
        <TableCell>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="date"
              inputFormat="dd/MM/yyyy"
              value={new Date(survey.newDtCreation)}
              onChange={(value) => {
                if (value != null) {
                  survey.newDtCreation = value.getTime();
                  setsurveys([...surveys]);
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="date"
              inputFormat="dd/MM/yyyy"
              value={new Date(survey.newDtEnd)}
              onChange={(value) => {
                if (value != null) {
                  survey.newDtEnd = value.getTime();
                  setsurveys([...surveys]);
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell style={{ width: 100 }}>
          <IconButton
            onClick={() => {
              survey.isEdit = false;
              survey.newName = survey.name;
              survey.newDtCreation = survey.dtcreation;
              survey.newDtEnd = survey.dtend;
              setsurveys([...surveys]);
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              survey.isEdit = false;

              survey.name = survey.newName;
              survey.dtend = survey.newDtEnd;
              survey.dtcreation = survey.newDtCreation;
              //update request survey

              //updateSurvey(survey);
              setsurveys([...surveys]);
            }}
          >
            <SaveIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  const displayMode = (survey: any) => {
    return (
      <TableRow key={survey.id}>
        <TableCell>{survey.id}</TableCell>
        <TableCell>{survey.name}</TableCell>
        <TableCell>{getDateFormat(new Date(survey.dtcreation))}</TableCell>
        <TableCell>{getDateFormat(new Date(survey.dtend))}</TableCell>
        <TableCell style={{ width: 100 }}>
          <IconButton
            onClick={() => {
              survey.isEdit = true;
              setsurveys([...surveys]);
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
          <StyledTitle>Surveys</StyledTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Start date</TableCell>
                <TableCell>End date</TableCell>
                <TableCell style={{ width: 100 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveys.map((survey: any) => {
                if (survey.isEdit) return editMode(survey);
                else return displayMode(survey);
              })}
            </TableBody>
          </Table>
        </StyledStack>
      </StyledContainer>
    </div>
  );
}
