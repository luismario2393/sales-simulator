import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { GlobalStyles } from "@mui/material";

import { Sales, Dashbord, Home } from "./components";
import { SalesContext } from "./context";
import { Data } from "./interface";
import { Layout } from "./components";
import { globalStyles } from "./themes/global";

function App() {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const url = "/ventas.json";
      const result = await axios(url);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SalesContext.Provider value={data}>
      <GlobalStyles styles={globalStyles} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/dashbord" element={<Dashbord />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SalesContext.Provider>
  );
}

export default App;
