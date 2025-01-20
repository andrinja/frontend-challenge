"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";

type Option = {
  label: string;
  value: string;
};

export function MultiSelect({
  name,
  options,
  label,
}: {
  name: string;
  options: Option[];
  label: string;
}) {
  const [open, setOpen] = React.useState(false);

  const buttonId = `${name}-multiselect`;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel htmlFor={buttonId}>{label}</FormLabel>
          <FormControl>
            <Popover modal open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id={buttonId}
                  variant="outline"
                  className="flex w-full justify-start text-left"
                >
                  {field.value && field.value.length > 0
                    ? `${field.value.join(", ")}`
                    : "Select options"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="stretch h-72 overflow-y-auto p-2">
                {options.map(({ label, value }) => {
                  const isChecked = field.value?.includes(value);
                  return (
                    <div
                      key={value}
                      className="flex items-center space-x-2 py-1"
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => {
                          if (isChecked) {
                            field.onChange(
                              field.value.filter((v: string) => v !== value),
                            );
                          } else {
                            field.onChange([...(field.value ?? []), value]);
                          }
                        }}
                        id={value}
                      />
                      <label htmlFor={value}>{label}</label>
                    </div>
                  );
                })}
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
