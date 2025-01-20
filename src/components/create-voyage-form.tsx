"use client";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatepickerInput } from "./hook-form/datepicker";
import { Select } from "./hook-form/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData, postData } from "~/utils";
import { MultiSelect } from "./hook-form/multi-select";
import { Prisma } from "@prisma/client";
import { Form } from "./ui/form";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

const PORT_OPTIONS = [
  {
    label: "Oslo",
    value: "oslo",
  },
  {
    label: "Copenhagen",
    value: "copenhagen",
  },
];

export const CreateVoyageSchema = z
  .object({
    departure: z.date({
      required_error: "Departure date is required",
    }),
    arrival: z.date({
      required_error: "Arrival date is required",
    }),
    portOfLoading: z.string(),
    portOfDischarge: z.string(),
    vessel: z.string(),
    unitTypes: z
      .array(z.string())
      .min(5, "At least five unit types must be indicated"),
  })
  .refine(
    (data) => {
      if (!data.departure || !data.arrival) {
        return true;
      }
      return data.departure < data.arrival;
    },
    {
      message: "Departure date and time must be before arrival date and time",
      path: ["departure"],
    },
  )
  .refine((data) => data.portOfLoading !== data.portOfDischarge, {
    message: "Port of loading and port of discharge cannot be the same",
    path: ["portOfLoading"],
  });

type CreateVoyageFormData = z.infer<typeof CreateVoyageSchema>;

export default function CreateVoyageForm() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<CreateVoyageFormData>({
    reValidateMode: "onChange",
    resolver: zodResolver(CreateVoyageSchema),
  });

  const { data: vessels } = useQuery({
    queryKey: ["vessels"],
    queryFn: () => fetchData("vessel/getAll"),
  });

  const { data: unitTypes } = useQuery<Prisma.UnitTypeGetPayload<null>[]>({
    queryKey: ["unitType"],
    queryFn: () => fetchData("unitType/getAll"),
  });

  const unitTypeOptions =
    unitTypes?.map(({ id, name }) => ({
      label: name,
      value: id,
    })) ?? [];

  const createVoyageMutation = useMutation({
    mutationFn: async (data: CreateVoyageFormData) =>
      postData("voyage/create", data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["voyages"] });
      setIsSheetOpen(false);
      methods.reset();
      toast({
        title: "Success",
        description: "Voyage created.",
      });
    },
    onError: (error) => {
      console.error("Error creating voyage:", error.message);
      toast({
        title: "Error",
        description: error?.message || "Failed to create voyage.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit: SubmitHandler<CreateVoyageFormData> = (data) => {
    createVoyageMutation.mutate(data);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          Create
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            Create Voyage
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Fill in the details to create a new voyage.
          </p>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <DatepickerInput name="departure" label="Departure" />
              <DatepickerInput name="arrival" label="Arrival" />
              <Select
                name="portOfLoading"
                label="Port of Loading"
                placeholder="Select a port"
                options={PORT_OPTIONS}
              />
              <Select
                name="portOfDischarge"
                label="Port of Discharge"
                placeholder="Select a port"
                options={PORT_OPTIONS}
              />
              <Select
                name="vessel"
                label="Vessel"
                placeholder="Select a vessel"
                options={vessels}
              />
              <MultiSelect
                label="Unit Types"
                name="unitTypes"
                options={unitTypeOptions}
              />
              <SheetFooter>
                <Button type="submit" className="w-full">
                  Create voyage
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
