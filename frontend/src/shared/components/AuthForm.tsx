import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { TAuthUserData } from "../types";

export const AuthForm = ({
    title,
    onSubmit
}: {
    title: string;
    onSubmit: (data: TAuthUserData) => void;
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Card className="w-full max-w-sm m-auto">
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                        }}
                        id="email"
                        type="email"
                        placeholder="me@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        onChange={(e) => {
                            const value = e.target.value;
                            setPassword(value);
                        }}
                        id="password"
                        type="password"
                        required
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => onSubmit({ email, password })} className="w-full">Submit</Button>
            </CardFooter>
        </Card>
    );
};