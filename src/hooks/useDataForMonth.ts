import { useContext } from "react";
import { SalesContext } from "../context";

export const useDataForMonth = () => {
  const sales = useContext(SalesContext);

  const findElementMonth = sales.filter((sale) =>
    sale.date_opened.slice(0, 7).includes("2019-01")
  );
  const findElementMonthTwo = sales.filter((sale) =>
    sale.date_opened.slice(0, 7).includes("2019-02")
  );
  const findElementMonthThree = sales.filter((sale) =>
    sale.date_opened.slice(0, 7).includes("2019-03")
  );

  return {
    findElementMonth,
    findElementMonthTwo,
    findElementMonthThree,
  };
};
