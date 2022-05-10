import { css, styled, Typography, Box } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";

export const MuiTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isGreen",
})<{ isGreen?: boolean }>(
  ({ theme, isGreen }) => css`
    background: ${isGreen
      ? theme.palette.secondary.main
      : theme.palette.primary.main};
    padding: 8px;
    color: ${theme.palette.background.default};
    border-radius: 24px;
    height: 100%;
    width: 250px;
    width: 320px;
    text-align: center;
    margin: 100px auto;
    margin-bottom: 0;
  `
);

export const MuiBox = styled(Box)(css`
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
  gap: 24px;
  flex-wrap: wrap;
  min-height: 500px;
`);

export const BarChart = styled(Bar, {
  shouldForwardProp: (prop) => prop !== "isGreen",
})<{ isGreen?: boolean }>(
  ({ theme, isGreen }) => css`
    max-height: 500px;
    max-width: 700px;
    border-radius: 16px;
    border: 2px solid
      ${isGreen ? theme.palette.secondary.main : theme.palette.primary.main};
  `
);

export const PieChart = styled(Pie, {
  shouldForwardProp: (prop) => prop !== "isGreen",
})<{ isGreen?: boolean }>(
  ({ theme, isGreen }) => css`
    max-height: 500px;
    max-width: 700px;
    border-radius: 16px;
    border: 2px solid
      ${isGreen ? theme.palette.secondary.main : theme.palette.primary.main};
  `
);
