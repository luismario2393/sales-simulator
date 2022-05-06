import { Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import totalSales from "../../assets/images/total-sales.png";
import * as styled from "./styled";

export const Home = () => {
  return (
    <styled.HomeContainer>
      <img src={totalSales} alt="total sales " width={300} />
      <Typography variant="h6">¿Qué quieres ver primero?</Typography>
      <styled.ContainerButton>
        <Link to={"/sales"}>
          <Button variant="contained">
            {" "}
            <Typography variant="button">Ver ventas</Typography>
          </Button>
        </Link>
        <Link to={"/dashbord"}>
          <Button variant="contained">
            {" "}
            <Typography variant="button">Ver estadisticas de ventas</Typography>
          </Button>
        </Link>
      </styled.ContainerButton>
    </styled.HomeContainer>
  );
};
