import { styled } from "@mui/material";
import "./App.css";
import { Header } from "./component/Header";
import ChartJS from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-moment";
import { StyledContainer, StyledStack, StyledTitle } from "./component/Device";
import { useEffect, useState } from "react";
import { getSurveys } from "./Provider/Survey";
import { io } from "socket.io-client";
ChartJS.register();

function rdmIntIntrvl(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function random8bitNum() {
  return rdmIntIntrvl(1, 255);
}

function randomColor(alpha: number): string {
  const r = rdmIntIntrvl(1, 3);
  return `rgba(${r === 1 ? 255 : random8bitNum()}, ${r === 2 ? 255 : random8bitNum()}, ${
    r === 3 ? 255 : random8bitNum()
  }, ${alpha})`;
}

const StyledBar = styled(Bar)({
  marginBottom: "20vh",
});

function App() {
  const [surveys, setSurveys]: any[] = useState([]);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_SERVEUR}`);

    socket.send("hello", (response: any) => {
      console.log(response);
    });

    (async () => {
      let surveys = await getSurveys();
      if (surveys.length) {
        //todo
      }
      setSurveys(surveys);

      socket.on("vote", (res, callback) => {
        console.log(res);
        for (let i = 0; i < surveys.length; i++) {
          if (surveys[i].id === res.survey) {
            surveys[i].data = [...surveys[i].data, ...res.answers];
          }
        }
        console.log(surveys);
        setSurveys([...surveys]);
      });
    })();
  }, []);

  return (
    <div>
      <Header />
      <StyledContainer>
        <StyledStack>
          <StyledTitle sx={{ marginBottom: "30px" }}>Dashboard</StyledTitle>
          {surveys.map((survey: any) =>
            survey.data.length ? (
              <StyledBar
                key={survey.id}
                data={{
                  labels: survey.survey.answers,
                  datasets: [
                    {
                      label: "Votes",
                      data: survey.data.reduce(
                        (acc: number[], curr: any) => {
                          acc[curr.answerId] = acc[curr.answerId] + 1;
                          return [...acc];
                        },
                        [0, 0, 0]
                      ),
                      backgroundColor: [randomColor(0.5), randomColor(0.5), randomColor(0.5)],
                      borderColor: [randomColor(1), randomColor(1), randomColor(1)],
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
