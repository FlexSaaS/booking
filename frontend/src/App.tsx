import ConfigTest from "./Components/ServiceSeleciton";
import type { Appointment } from "./types/Config";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./Components/Header";

function App() {
  const [appointment, setAppointment] = useState<Partial<Appointment>>({});
  const updateAppointment = (data: Partial<Appointment>) => {
    setAppointment((prev) => ({ ...prev, ...data }));
  };
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <ConfigTest
        appointment={appointment}
        updateAppointment={updateAppointment}
      />
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
