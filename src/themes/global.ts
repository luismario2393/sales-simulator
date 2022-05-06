import { css } from "@mui/material/styles";
import { fonts, mainFontFamily } from "./fonts";

export const globalStyles = css`
  ${fonts};

  body {
    ${mainFontFamily}
    height: 100%;
    background-color: #f7f7f7 !important;
  }

  a:hover {
    text-decoration: none;
  }

  p,
  span,
  a,
  button {
    font-family: "Lexend";
  }
`;
