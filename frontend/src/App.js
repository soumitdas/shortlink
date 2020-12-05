import React from "react";
import Routes from "./routes";
import { ProvideAuth } from "./hooks/useAuth";

//import { ReactComponent as LinkShortnerSvg } from "./assets/images/undraw_link_shortener.svg";

const App = () => {
  return (
    <ProvideAuth>
      <Routes />
    </ProvideAuth>
  );
};

export default App;
