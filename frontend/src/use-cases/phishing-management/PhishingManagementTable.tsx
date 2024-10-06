import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAttemptsQuery } from "@/query/attempts";

export const PhishingManagementTable = () => {
    const { data: attempts, isLoading } = useGetAttemptsQuery('', {
        pollingInterval: 10000,
        skipPollingIfUnfocused: true,
    });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Victim email</TableHead>
                    <TableHead>Email content</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    !isLoading ? attempts?.attempts!.map(({
                        id,
                        targetUserEmail,
                        status,
                        mailContent
                    }, index) => {
                        return (
                            <TableRow key={id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{targetUserEmail}</TableCell>
                                <TableCell>{mailContent}</TableCell>
                                <TableCell className="text-right">
                                    {
                                        status === 'clicked' ?
                                            <Badge variant="green">{status}</Badge> :
                                            <Badge variant="orange">{status}</Badge>
                                    }

                                </TableCell>
                            </TableRow>
                        );
                    }) : null
                }

            </TableBody>
        </Table>
    );
};