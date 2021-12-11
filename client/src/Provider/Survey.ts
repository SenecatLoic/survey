import { getAll } from "./utils";

export const getSurveys = getAll("/api/surveys");

export async function updateSurvey(survey: any) {
  try {
    const response = await fetch(
      `http://${process.env.REACT_APP_SERVEUR}/api/surveys/update/${survey.id}`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: survey.name,
          dtcreation: survey.dtcreation,
          dtend: survey.dtend,
          survey: survey.survey
        }),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
