import { FC, useMemo } from "react";
import { useTheme } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import * as styled from "../styled";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  dataNum: number[];
  labels: string[];
  labelDataSet: string;
  title: string;
  isGreen?: boolean;
}

export const BarChart: FC<Props> = ({
  dataNum,
  labels,
  title,
  labelDataSet,
  isGreen,
}) => {
  const theme = useTheme();

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: title,
        },
      },
    }),
    [title]
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: labelDataSet,
          backgroundColor: [
            isGreen ? theme.palette.secondary.main : theme.palette.primary.main,
          ],
          data: dataNum.map((data) => data),
        },
      ],
    }),
    [labels, theme, dataNum, labelDataSet, isGreen]
  );

  return <styled.BarChart data={data} options={options} isGreen={isGreen} />;
};
