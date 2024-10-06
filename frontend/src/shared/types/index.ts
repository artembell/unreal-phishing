export type TAuthUserData = {
    email: string;
    password: string;
};

export type TRegisterData = TAuthUserData;
export type TLoginData = TAuthUserData;

export type TUserProfile = {
    email: string;
};


export type TAttackAttemptPayload = { email: string; };
export type TAttempt = {
    id: string;
    targetUserEmail: string;
    status: string;
    mailContent: string;
};
