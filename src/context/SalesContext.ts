import { createContext } from "react";
import { Data } from "../interface";

export const SalesContext = createContext<Data[]>([]);
