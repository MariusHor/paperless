import { createContext } from "react";
import { AuthContextInterface } from "types";

export const AuthContext = createContext<AuthContextInterface | null>(null);
