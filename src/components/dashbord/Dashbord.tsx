import { useContext, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { SalesContext } from "../../context";
import { Categories } from "./Categories";
import { Products } from "./Products";
import { Payment } from "./Payment";
import { Zone } from "./Zone";
import { Waiter } from "./Waiter";
import { changeFormat } from "../../utils";
import { Cashier } from "./Cashier";
import { useDataForMonth } from "../../hooks/useDataForMonth";
import { Data } from "../../interface";

export const Dashbord = () => {
  const [isMonthOne, setIsMonthOne] = useState<boolean>(false);
  const [isMonthTwo, setIsMonthTwo] = useState<boolean>(false);
  const [isMonthThree, setIsMonthThree] = useState<boolean>(false);
  const [isTrimester, setIsTrimester] = useState<boolean>(true);

  const { findElementMonth, findElementMonthTwo, findElementMonthThree } =
    useDataForMonth();

  const theme = useTheme();
  const sales = useContext(SalesContext);

  const totalSales = (data: Data[]) => {
    return data.reduce((acc, p) => acc + p.total, 0);
  };
  const options = () => {
    let parameter: Data[] = [];
    if (isMonthOne) {
      parameter = findElementMonth;
    } else if (isMonthTwo) {
      parameter = findElementMonthTwo;
    } else if (isMonthThree) {
      parameter = findElementMonthThree;
    } else {
      parameter = sales;
    }

    return parameter;
  };

  console.log(options());

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Dashbord
      </Typography>
      <Box sx={{ textAlign: "center", padding: "60px" }}>
        <Button
          variant="outlined"
          sx={{ margin: "20px 20px" }}
          onClick={() => {
            setIsMonthOne(true);
            setIsMonthTwo(false);
            setIsMonthThree(false);
            setIsTrimester(false);
          }}
        >
          Ver informacion mes 1
        </Button>
        <Button
          variant="outlined"
          sx={{ margin: "20px 20px" }}
          onClick={() => {
            setIsMonthOne(false);
            setIsMonthTwo(true);
            setIsMonthThree(false);
            setIsTrimester(false);
          }}
        >
          Ver informacion mes 2
        </Button>
        <Button
          variant="outlined"
          sx={{ margin: "20px 20px" }}
          onClick={() => {
            setIsMonthOne(false);
            setIsMonthTwo(false);
            setIsMonthThree(true);
            setIsTrimester(false);
          }}
        >
          Ver informacion mes 3
        </Button>
        <Button
          variant="outlined"
          sx={{ margin: "20px 20px" }}
          onClick={() => {
            setIsMonthOne(false);
            setIsMonthTwo(false);
            setIsMonthThree(false);
            setIsTrimester(true);
          }}
        >
          Ver informacion trimestral
        </Button>
      </Box>

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
            Total De ventas{" "}
            {(isMonthOne && "Mes uno") ||
              (isMonthTwo && "Mes dos") ||
              (isMonthThree && "Mes tres") ||
              (isTrimester && "Trimestrales")}
            :
          </span>{" "}
          {(isMonthOne && `$${changeFormat(totalSales(findElementMonth))}`) ||
            (isMonthTwo &&
              `$${changeFormat(totalSales(findElementMonthTwo))}`) ||
            (isMonthThree &&
              `$${changeFormat(totalSales(findElementMonthThree))}`) ||
            (isTrimester && `$${changeFormat(totalSales(sales))}`)}
        </Typography>
      </Box>

      <Categories totalSales={totalSales(options())} data={options()} />

      <Products totalSales={totalSales(options())} data={options()} />

      <Payment totalSales={totalSales(options())} data={options()} />

      <Zone totalSales={totalSales(options())} data={options()} />

      <Waiter totalSales={totalSales(options())} data={options()} />

      <Cashier totalSales={totalSales(options())} data={options()} />
    </>
  );
};
