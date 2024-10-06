import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInitatePhishingAttackMutation } from "@/query/attempts";
import { useState } from "react";

export const SimulateAttack = () => {
    const [sendAttack] = useInitatePhishingAttackMutation();

    const [email, setEmail] = useState('');

    return (
        <div className="flex flex-row">
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Victim email"
            />
            <Button
                onClick={() => {
                    sendAttack({ email });
                }}
            >Simulate attack</Button>
        </div>
    );
};