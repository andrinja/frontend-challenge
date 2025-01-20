"use client";

import * as React from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FormField, FormLabel, FormControl, FormMessage } from "../ui/form";

type Option = {
  label: string;
  value: string;
};

export function Select({
  name,
  options,
  label,
  placeholder = "Select something",
}: {
  name: string;
  options: Option[];
  label: string;
  placeholder?: string;
}) {
  const selectTriggerId = `${name}-select`;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <div className="flex w-full flex-col space-y-2">
          <FormLabel htmlFor={selectTriggerId}>{label}</FormLabel>
          <FormControl>
            <ShadcnSelect value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={selectTriggerId} className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent role="listbox" align="start" className="w-full">
                {options?.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadcnSelect>
          </FormControl>
          <FormMessage />
        </div>
      )}
    />
  );
}
