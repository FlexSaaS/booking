import type { Appointment } from "./types/Config";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Components/Header";
import ServiceSelection from "./Components/ServiceSeleciton";
import HomeView from "./Components/HomeView";
import { getClientConfig } from "./lib/getClientConfig";

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
        <Header />
        <Routes>
          <Route path="/" element={<HomeView client={client} />} />
          <Route path="/service" element={<ServiceSelection appointment={appointment} updateAppointment={updateAppointment} />} />
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
    background: #f5f5f7;
  }
`;

const AppContainer = styled.div<{
  fontFamily: string;
}>`
  margin: 0 auto;
  font-family: ${(props) => props.fontFamily}, sans-serif;
`;
