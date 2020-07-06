import React from 'react';
import {AuthProvider} from "./AuthProvider";
import {Routes} from "../Shared/Routes";

export const Providers = ({}) => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}
