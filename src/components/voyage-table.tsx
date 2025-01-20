"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { TABLE_DATE_FORMAT } from "~/constants";
import DeleteVoyageButton from "./delete-voyage-button";
import { type ReturnType as VoyageGetAllPayload } from "~/app/api/voyage/getAll/route";
import { fetchData } from "~/utils";
import UnitTypeList from "./unit-type-list";

export default function VoyageTable() {
  const { data: voyages } = useQuery<VoyageGetAllPayload>({
    queryKey: ["voyages"],
    queryFn: () => fetchData("voyage/getAll"),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Departure</TableHead>
          <TableHead>Arrival</TableHead>
          <TableHead>Port of loading</TableHead>
          <TableHead>Port of discharge</TableHead>
          <TableHead>Vessel</TableHead>
          <TableHead>Unit types</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {voyages?.map((voyage) => (
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
              <UnitTypeList unitTypes={voyage.unitTypes}>
                <span className="select-none underline">
                  {voyage.unitTypes.length}
                </span>
              </UnitTypeList>
            </TableCell>
            <TableCell>
              <DeleteVoyageButton voyageId={voyage.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
