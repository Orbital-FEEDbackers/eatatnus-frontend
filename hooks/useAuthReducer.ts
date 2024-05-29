import { User } from "firebase/auth";
import React from "react";

export type Auth = {
    user: User | null;
    status: "AUTHENTICATED" | "NOT_AUTHENTICATED" | "LOADING";
    error_message: string | null;
}

export type AuthAction = {
    type: "SIGN_IN" | "SIGN_OUT" | "SIGN_IN_SUCCESS" | "SIGN_OUT_SUCCESS" | "ERROR";
    error_message: string | null;
    user?: User | null;
}

function authReducer(state: Auth, action: AuthAction): Auth {
    switch (action.type) {
        case "SIGN_IN":
            return { ...state, status: "LOADING", error_message: null }
        case "SIGN_OUT":
            return { ...state, status: "LOADING", error_message: null }
        case "SIGN_IN_SUCCESS":
            return { user: action.user ?? null, status: "AUTHENTICATED", error_message: null }
        case "SIGN_OUT_SUCCESS":
            return { user: null, status: "NOT_AUTHENTICATED", error_message: null }
        case "ERROR":
            return { ...state, status: "NOT_AUTHENTICATED", error_message: action.error_message }
        default:
            throw new Error("Invalid action type: " + action.type + " in useAuthReducer");
    }
}

export default function useAuthReducer(initState: Auth) {
    return React.useReducer(authReducer, initState);
}