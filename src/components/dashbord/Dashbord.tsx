import { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { SalesContext } from "../../context";
import { Categories } from "./Categories";
import { Products } from "./Products";
import { Payment } from "./Payment";
import { Zone } from "./Zone";
import { Waiter } from "./Waiter";
import { changeFormat } from "../../utils";
import { Cashier } from "./Cashier";
import { MonthOne } from "./MonthOne";

export const Dashbord = () => {
  const theme = useTheme();
  const sales = useContext(SalesContext);

  const totalSales = sales.reduce((acc, sale) => {
    return acc + sale.total;
  }, 0);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        Dashbord
      </Typography>
      <Box
        sx={{
          background: theme.palette.primary.main,
          padding: "16px",
          color: theme.palette.background.default,
          borderRadius: "24px",
          minWidth: "300px",
          maxWidth: "800px",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4">
          <span style={{ fontWeight: "bold" }}>
            Total De ventas trimestrales :
          </span>{" "}
          ${changeFormat(totalSales)}
        </Typography>
      </Box>

      <Categories totalSales={totalSales} />

      <Products totalSales={totalSales} />

      <Payment totalSales={totalSales} />

      <Zone totalSales={totalSales} />

      <Waiter totalSales={totalSales} />

      <Cashier totalSales={totalSales} />
      <MonthOne />
    </>
  );
};
