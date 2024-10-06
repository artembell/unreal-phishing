import { useLoginMutation, useRegisterMutation, useSignoutMutation } from "@/query/auth";
import React from "react";

interface AuthContextType {
    user: { email: string; } | null;
    signin: (user: { email: string; } | null, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
    sendSignout: ReturnType<(typeof useSignoutMutation)>[0];
    sendLogin: ReturnType<(typeof useLoginMutation)>[0];
    sendRegister: ReturnType<(typeof useRegisterMutation)>[0];
}

export const AuthContext = React.createContext<AuthContextType>(null!);
