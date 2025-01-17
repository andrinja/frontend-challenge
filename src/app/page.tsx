import { format } from "date-fns";
import Head from "next/head";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { fetchData } from "~/utils";
import { TABLE_DATE_FORMAT } from "~/constants";
import DeleteButton from "~/components/DeleteButton";

export default async function Home() {
  const voyages = await fetchData("voyage/getAll");
  return (
    <>
      <Head>
        <title>Voyages | DFDS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Departure</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Port of loading</TableHead>
            <TableHead>Port of discharge</TableHead>
            <TableHead>Vessel</TableHead>
            <TableHead>&nbsp;</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {voyages?.map((voyage: any) => (
            <TableRow key={voyage.id}>
              <TableCell>
                {format(new Date(voyage.scheduledDeparture), TABLE_DATE_FORMAT)}
              </TableCell>
              <TableCell>
                {format(new Date(voyage.scheduledArrival), TABLE_DATE_FORMAT)}
              </TableCell>
              <TableCell>{voyage.portOfLoading}</TableCell>
              <TableCell>{voyage.portOfDischarge}</TableCell>
              <TableCell>{voyage.vessel.name}</TableCell>
              <TableCell>
                <DeleteButton voyageId={voyage.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
