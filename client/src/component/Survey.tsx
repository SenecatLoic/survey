import {
  Button,
  IconButton,
  Input,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createSurvey, getSurveys, updateSurvey } from "../Provider/Survey";
import { StyledContainer, StyledStack, StyledTitle } from "./Device";
import { Header } from "./Header";
import EditIcon from "@mui/icons-material/Edit";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { getDateFormat } from "../tools/DateFormat";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export function Survey() {
  const [surveys, setsurveys]: any[] = useState([]);
  let [newSurvey, setNewSurvey]: any[] = useState({
    name: "",
    survey: { question: "", answers: ["", "", ""] },
  });
  const [createNewSurvey, setCreateNewSurvey]: any[] = useState(false);
  const [viewSurvey, setViewSurvey]: any[] = useState({
    enabled: false,
    survey: { name: "", survey: { answers: ["", "", ""], question: "" } },
  });
  const handleClose = () => {
    setCreateNewSurvey(false);
  };

  const handleNewAnswer = (e: any, i: any) => {
    const answers = newSurvey.survey.answers || ["", "", ""];
    answers[i] = e.target.value;
    setNewSurvey({
      ...newSurvey,
      survey: { ...newSurvey.survey, answers },
    });
  };

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
            onChange={(e) => {
              survey.newName = e.target.value;
            }}
          />
        </TableCell>
        <TableCell>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="date"
              inputFormat="dd/MM/yyyy"
              value={new Date(survey.newDtCreation)}
              onChange={(value: any) => {
                if (value != null) {
                  survey.newDtCreation = value.getTime();
                  setsurveys([...surveys]);
                }
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="date"
              inputFormat="dd/MM/yyyy"
              value={new Date(survey.newDtEnd)}
              onChange={(value: any) => {
                if (value != null) {
                  survey.newDtEnd = value.getTime();
                  setsurveys([...surveys]);
                }
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </TableCell>
        <TableCell /*style={{ width: 100 }}*/>
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
              updateSurvey(survey);
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
    console.log(survey);
    return (
      <TableRow key={survey.id}>
        <TableCell>
          <IconButton
            onClick={() => {
              setViewSurvey({ enabled: true, survey });
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </TableCell>
        <TableCell>{survey.id}</TableCell>
        <TableCell>{survey.name}</TableCell>
        <TableCell>{getDateFormat(new Date(survey.dtcreation))}</TableCell>
        <TableCell>{getDateFormat(new Date(survey.dtend))}</TableCell>
        <TableCell /*style={{ width: 100 }}*/>
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
          <Paper style={{ overflowX: "auto" }}>
            <Table sx={{ maxWidth: "75%" }}>
              <TableHead>
                <TableRow>
                  <TableCell /*style={{ width: 50 }}*/></TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Start date</TableCell>
                  <TableCell>End date</TableCell>
                  <TableCell /*style={{ width: 50 }}style={{ width: 100 }}*/
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {surveys.map((survey: any) => {
                  if (survey.isEdit) return editMode(survey);
                  else return displayMode(survey);
                })}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <IconButton
                      color={"primary"}
                      onClick={() => {
                        setCreateNewSurvey(true);
                      }}
                    >
                      {" "}
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </StyledStack>
      </StyledContainer>
      <Dialog
        open={viewSurvey.enabled}
        onClose={() => {
          setViewSurvey({
            enabled: false,
            survey: {
              name: "",
              survey: { answers: ["", "", ""], question: "" },
            },
          });
        }}
      >
        <DialogTitle>{viewSurvey.survey.name}</DialogTitle>
        <DialogContent>
          <List>
            <ListItemText primary={viewSurvey.survey.survey.question} />
            <ListItemText
              primary={`1 - ${viewSurvey.survey.survey.answers[0]}`}
            />
            <ListItemText
              primary={`2 - ${viewSurvey.survey.survey.answers[1]}`}
            />
            <ListItemText
              primary={`3 - ${viewSurvey.survey.survey.answers[2]}`}
            />
          </List>
        </DialogContent>
      </Dialog>
      <Dialog open={createNewSurvey} onClose={handleClose}>
        <DialogTitle>Create a new survey</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
          
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="Survey Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewSurvey({ ...newSurvey, name: e.target.value });
            }}
          />
          <TextField
            margin="dense"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewSurvey({
                ...newSurvey,
                survey: { ...newSurvey.survey, question: e.target.value },
              });
            }}
          />
          <TextField
            margin="dense"
            label="First Answer"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              handleNewAnswer(e, 0);
            }}
          />
          <TextField
            margin="dense"
            label="Second Answer"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              handleNewAnswer(e, 1);
            }}
          />
          <TextField
            margin="dense"
            label="Third Answer"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              handleNewAnswer(e, 2);
            }}
            style={{ marginBottom: "10px" }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="dd/MM/yyyy"
              value={newSurvey.dtcreation || new Date(newSurvey.dtcreation)}
              onChange={(value: any) => {
                if (value != null) {
                  setNewSurvey({
                    ...newSurvey,
                    dtcreation: value.getTime(),
                  });
                }
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="dd/MM/yyyy"
              value={newSurvey.dtend || new Date(newSurvey.dtend)}
              onChange={(value: any) => {
                if (value != null) {
                  newSurvey.dtend = value.getTime();
                  setNewSurvey({
                    ...newSurvey,
                    dtend: value.getTime(),
                  });
                }
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async () => {
              console.log(newSurvey);
              if (
                newSurvey &&
                newSurvey.name &&
                newSurvey.dtcreation &&
                newSurvey.dtend &&
                newSurvey.survey.question &&
                newSurvey.survey.answers.length === 3
              ) {
                const result = await createSurvey(newSurvey);
                if (result && !result.error) {
                  surveys.push(result);
                  setsurveys([...surveys]);
                  setCreateNewSurvey(false);
                }
              }
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
