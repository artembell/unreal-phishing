import { useGetProfileSilentQuery, useLoginMutation, useRegisterMutation, useSignoutMutation } from "@/query/auth";
import { TUserProfile } from "@/shared/types";
import React, { useEffect, useState } from "react";
import { genericAuthProvider } from "./AuthService";
import { AuthContext } from "./context";

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
    let [user, setUser] = useState<{ email: string; } | null>(null);
    const { data } = useGetProfileSilentQuery();

    useEffect(() => {
        if (data && data.email) {
            setUser(data);
        }
    }, [data]);

    const [sendSignout] = useSignoutMutation();
    const [sendLogin] = useLoginMutation();
    const [sendRegister] = useRegisterMutation();

    const signin = (userProfile: TUserProfile | null, callback: VoidFunction) => {
        return genericAuthProvider.signin(() => {
            setUser(userProfile);
            callback();
        });
    };

    const signout = (callback: VoidFunction) => {
        return genericAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };


    let contextValue = {
        user,
        signin,
        signout,
        sendLogin,
        sendSignout,
        sendRegister
    };

    return (
        <AuthContext.Provider
            value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

