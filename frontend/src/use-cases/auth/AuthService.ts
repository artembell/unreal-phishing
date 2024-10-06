const genericAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        genericAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100);
    },
    signout(callback: VoidFunction) {
        genericAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

export { genericAuthProvider };
