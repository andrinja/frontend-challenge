import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ReturnType as VoyageGetAllReturnType } from "~/app/api/voyage/getAll/route";

export default function UnitTypeList({
  children,
  unitTypes,
}: {
  children: React.ReactNode;
  unitTypes: VoyageGetAllReturnType[number]["unitTypes"];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 rounded-md bg-background p-4 shadow-md">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Unit Types</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {unitTypes.map((unitType) => (
                <li key={unitType.id} className="text-foreground">
                  {`${unitType.name} | ${unitType.defaultLength}m`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
