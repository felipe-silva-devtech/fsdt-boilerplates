import React from "react";

import "./index.scss";

import { Button } from "../components/button";

const App: React.FC = () => (
  <div className="container">
    <h1>FSDT Boilerplates</h1>
    <p>
      Aplicação instalada e funcionando, você já pode começar a desenvolver!
    </p>
    <Button>Exemplo de componente</Button>
  </div>
);

export default App;
