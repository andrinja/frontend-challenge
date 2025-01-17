"use client";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

export default function DeleteButton({ voyageId }: { voyageId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (voyageId: string) => {
      const response = await fetch(`/api/voyage/delete?id=${voyageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the voyage");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "voyages",
      ] as InvalidateQueryFilters);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the voyage. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (voyageId: string) => {
    mutation.mutate(voyageId);
  };
  return (
    <Button onClick={() => handleDelete(voyageId)} variant="outline">
      X
    </Button>
  );
}
function toast(arg0: { title: string }) {
  throw new Error("Function not implemented.");
}
