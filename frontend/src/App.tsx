import type { Appointment } from "./types/Config";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Components/Header";
import ServiceSelection from "./Components/ServiceSeleciton";
import HomeView from "./Components/HomeView";
import { getClientConfig } from "./lib/getClientConfig";
import ProgressBar from "./Components/ProgressBar";
import ClientInfo from "./Components/ClientInfo";
import CalendarView from "./Components/CalendarView";

function App() {
  const client = getClientConfig();

  const [appointment, setAppointment] = useState<Partial<Appointment>>({});
  const updateAppointment = (data: Partial<Appointment>) => {
    setAppointment((prev) => ({ ...prev, ...data }));
  };
  return (
    <Router>
      <AppContainer fontFamily={client.fontFamily}>
        <GlobalStyle />
        <Header client={client} />
        <ProgressBar client={client} />
        <Routes>
          <Route path="/" element={<HomeView client={client} />} />
          <Route
            path="/service"
            element={
              <ServiceSelection
                client={client}
                appointment={appointment}
                updateAppointment={updateAppointment}
              />
            }
          />
          <Route
            path="/client"
            element={
              <ClientInfo
                client={client}
                appointment={appointment}
                updateAppointment={updateAppointment}
              />
            }
          />

          <Route
            path="/time"
            element={
              <CalendarView
                client={client}
                appointment={appointment}
                updateAppointment={updateAppointment}
              />
            }
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div<{ fontFamily: string }>`
  font-family: ${(props) => props.fontFamily}, sans-serif;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
`;
