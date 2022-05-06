import { styled } from "@mui/material/styles";

export const SearchContainer = styled("div")`
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  justify-items: center;
  border: 1px solid #4a148c;
  min-width: 320px;
  height: 40px;
  border-radius: 16px;
  padding: 4px;
`;
export const inputSearch = styled("input")`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: none;
  background: transparent;
  outline: none;
`;
