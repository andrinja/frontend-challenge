import Head from "next/head";
import { fetchData } from "~/utils";
import CreateVoyageForm from "~/components/create-voyage-form";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import VoyageTable from "~/components/voyage-table";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["voyages"],
    queryFn: () => fetchData("voyage/getAll"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Head>
        <title>Voyages | DFDS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col space-y-2">
        <div className="mt-2 flex">
          <CreateVoyageForm />
        </div>

        <div className="mt-1 flex justify-start">
          <VoyageTable />
        </div>
      </div>
    </HydrationBoundary>
  );
}
