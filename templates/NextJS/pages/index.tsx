import React from "react";

import { Button } from "../src/components/button";

const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
} as React.CSSProperties;

const App: React.FC = () => (
  <div style={containerStyle}>
    <h1>FSDT Boilerplates</h1>
    <p>
      Aplicação instalada e funcionando, você já pode começar a desenvolver!
    </p>
    <Button>Exemplo de componente</Button>
  </div>
);

export default App;
