import { styled } from "@mui/material";
import "./App.css";
import { Header } from "./component/Header";
import ChartJS from "chart.js/auto";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import "chartjs-adapter-moment";
ChartJS.register();

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

function App() {
  const client = new WebSocket("ws://localhost:3000");
  client.addEventListener("open", () => {
    // Causes the server to print "Hello"
    client.send("Hello");
  });

  client.addEventListener("message", (msg) => {
    const data = JSON.parse(msg.data);
    console.log(data);
  });
  const survey = {
    id: "rqueu87878",
    name: "SIDA",
    dtcreation: 8248768732,
    dtend: 9284938578735,
    survey: {
      question: "Avez-vous le sida ?",
      answers: ["oui", "non", "peut-etre"],
    },
    data: [
      { device: "oue8495", answerId: 2, dtanswer: 43573953545 },
      { device: "coeuouoe", answerId: 1, dtanswer: 43573993545 },
      { device: "ouoeurch", answerId: 0, dtanswer: 43579993545 },
    ],
  };

  return (
    <div>
      <Header />
      <StyledContainer>
        <StyledStack>
          <StyledTitle>Dashboard</StyledTitle>
          <Bar
            data={{
              labels: survey.survey.answers,
              datasets: [
                {
                  label: "Votes",
                  data: [1, 2, 3],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }
              ],
            }}
            options={{
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }}
          />
        </StyledStack>
      </StyledContainer>
    </div>
  );
}

export default App;
