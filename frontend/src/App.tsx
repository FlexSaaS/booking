import type { Appointment } from "./types/Types";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./ReusableComponents/Header";
import ServiceSelection from "./Pages/servicesPage/ServicesPage";
import HomePage from "./Pages/homePage/HomePage";
import ProgressBar from "./ReusableComponents/ProgressBar";
import ClientInfo from "./Pages/detailsPage/DetailsPage";
import Confirmation from "./Pages/confirmationPage/ConfirmationPage";
import CalendarView from "./Pages/calendarPage/CalendarPage";
import { getClientConfig } from "./configs/getClientConfig";

const client = getClientConfig();

function App() {
  const [appointment, setAppointment] = useState<Partial<Appointment>>({});
  const updateAppointment = (data: Partial<Appointment>) => {
    setAppointment((prev) => ({ ...prev, ...data }));
  };

  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Header />
        <ProgressBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/services"
            element={
              <ServiceSelection
                appointment={appointment}
                updateAppointment={updateAppointment}
              />
            }
          />
          <Route
            path="/details"
            element={
              <ClientInfo
                appointment={appointment}
                updateAppointment={updateAppointment}
              />
            }
          />
          <Route
            path="/calendar"
            element={
              <CalendarView
                appointment={appointment}
                updateAppointment={updateAppointment}
              />
            }
          />
          <Route
            path="/confirmation"
            element={<Confirmation appointment={appointment as Appointment} />}
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

const AppContainer = styled.div`
  font-family: ${client.theme.fontFamily};
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
`;
