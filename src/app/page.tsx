import { getQueryClient } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { trpc } from "@/trpc/server";
import Client from "@/app/client";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAi.queryOptions({text: "world"}))
  return( 
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
      <Client/>      
      </Suspense>

    </HydrationBoundary>
  )
};

export default Page;