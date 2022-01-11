import { styled } from "@mui/material";
import "./App.css";
import { Header } from "./component/Header";
import ChartJS from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-moment";
import { StyledContainer, StyledStack, StyledTitle } from "./component/Device";
import { useEffect, useState } from "react";
import { getSurveys } from "./Provider/Survey";
ChartJS.register();

function rdmIntIntrvl(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function random8bitNum() {
  return rdmIntIntrvl(1, 255);
}

function randomColor(alpha: number): string {
  const r = rdmIntIntrvl(1, 3);
  return `rgba(${r === 1 ? 255 : random8bitNum()}, ${
    r === 2 ? 255 : random8bitNum()
  }, ${r === 3 ? 255 : random8bitNum()}, ${alpha})`;
}

const StyledBar = styled(Bar)({
  marginBottom: "20vh",
});

function App() {
  const [surveys, setSurveys]: any[] = useState([]);
  useEffect(() => {
    (async () => {
      let surveys = await getSurveys();
      if (surveys.length) {
        //todo
      }
      console.log(surveys);
      setSurveys(surveys);
    })();
  }, []);
  const client = new WebSocket("ws://localhost:3000");
  client.addEventListener("open", () => {
    // Causes the server to print "Hello"
    client.send("Hello");
  });

  client.addEventListener("message", (msg) => {
    const data = JSON.parse(msg.data);
    console.log(data);
  });
  // const survey = {
  //   id: "rqueu87878",
  //   name: "SIDA",
  //   dtcreation: 8248768732,
  //   dtend: 9284938578735,
  //   survey: {
  //     question: "Avez-vous le sida ?",
  //     answers: ["oui", "non", "peut-etre"],
  //   },
  //   data: [
  // { device: "oue8495", answerId: 2, dtanswer: 43573953545 },
  // { device: "coeuouoe", answerId: 1, dtanswer: 43573993545 },
  // { device: "ouoeurch", answerId: 0, dtanswer: 43579993545 },
  //   ],
  // };

  return (
    <div>
      <Header />
      <StyledContainer>
        <StyledStack>
          <StyledTitle sx={{ marginBottom: "30px" }}>Dashboard</StyledTitle>
          {surveys.map((survey: any) =>
            survey.data.length ? (
              <StyledBar
                data={{
                  labels: survey.survey.answers,
                  datasets: [
                    {
                      label: "Votes",
                      data: survey.data.map((d: any) => d.answerId),
                      backgroundColor: [
                        randomColor(0.2),
                        randomColor(0.2),
                        randomColor(0.2),
                      ],
                      borderColor: [
                        randomColor(1),
                        randomColor(1),
                        randomColor(1),
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: survey.name + " (" + survey.survey.question + ")",
                    },
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : (
              ""
            )
          )}
        </StyledStack>
      </StyledContainer>
    </div>
  );
}

export default App;
