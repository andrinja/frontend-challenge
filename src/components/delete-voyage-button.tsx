"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

export default function DeleteVoyageButton({ voyageId }: { voyageId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (voyageId: string) => {
      const response = await fetch(`/api/voyage/delete/?id=${voyageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the voyage");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["voyages"] });
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
