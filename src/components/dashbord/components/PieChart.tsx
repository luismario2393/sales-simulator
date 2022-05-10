import { FC, useMemo } from "react";
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

export const PieChart: FC<Props> = ({
  dataNum,
  labels,
  labelDataSet,
  title,
  isGreen,
}) => {
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
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(105, 12, 192, 0.2)",
            "rgba(5, 12, 192, 0.2)",
            "rgba(175, 192, 192, 0.2)",
            "rgba(125, 80, 19, 0.2)",
            "rgba(225, 192, 192, 0.2)",
            "rgba(235, 200, 19, 0.2)",
            "rgba(60, 225, 192, 0.2)",
            "rgba(99, 199, 12, 0.2)",
            "rgba(45, 154, 192, 0.2)",
          ],
          data: dataNum.map((data) => data),
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(105, 12, 192, 1)",
            "rgba(5, 12, 192, 1)",
            "rgba(175, 192, 192, 1)",
            "rgba(125, 80, 19, 1)",
            "rgba(225, 192, 192, 1)",
            "rgba(235, 200, 19, 1)",
            "rgba(60, 225, 192, 1)",
            "rgba(99, 199, 12, 1)",
            "rgba(45, 154, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [labels, dataNum, labelDataSet]
  );

  return <styled.PieChart data={data} options={options} isGreen={isGreen} />;
};
