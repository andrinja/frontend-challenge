"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FormField, FormLabel, FormMessage } from "../ui/form";

export function DatepickerInput({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const buttonId = `${name}-datepicker`;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex w-full flex-col space-y-2">
              <FormLabel htmlFor={buttonId}>{label}</FormLabel>
              <Button
                id={buttonId}
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
              <FormMessage />
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-auto rounded-md bg-background p-2 shadow-md"
          >
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(value) => field.onChange(value)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
