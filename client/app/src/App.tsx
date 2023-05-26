import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Layout></Layout>
      </ChakraProvider>
    </div>
  );
}

export default App;
