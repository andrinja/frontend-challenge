'use client'
import {
    InvalidateQueryFilters,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { Button } from "~/components/ui/button";

export default function DeleteButton({voyageId}: {voyageId: string}) {

    const queryClient = useQueryClient();
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
    });
  
    const handleDelete = (voyageId: string) => {
      mutation.mutate(voyageId);
    };
    return (
        <Button
            onClick={() => handleDelete(voyageId)}
            variant="outline"
        >
            X
        </Button>
    )
}