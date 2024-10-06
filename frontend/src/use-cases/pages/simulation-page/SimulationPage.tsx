import { PhishingManagementTable } from "@/use-cases/phishing-management/PhishingManagementTable";
import { SimulateAttack } from "@/use-cases/simulate-attack/SimulateAttack";

export const SimulationPage = () => {
    return (
        <>
            <SimulateAttack />
            <PhishingManagementTable />
        </>
    );
};