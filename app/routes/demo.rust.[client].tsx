import { Suspense, lazy } from "react";
import type ClientSideRustAddition from "~/components/ClientSideRustAddition.client";
import * as EB from "~/components/ErrorBoundary";
export const meta = () => [{ title: "Client Side Rust" }];
export default function ClientRust() {
  return (
    <div>
      <Suspense fallback={<h3>Loading wasm components...</h3>}>
        <LazyLoadedClientSideWASM />
      </Suspense>
    </div>
  );
}

export const ErrorBoundary = EB.ErrorBoundary;
const LazyLoadedClientSideWASM: React.LazyExoticComponent<typeof ClientSideRustAddition> = lazy(() => import("~/components/ClientSideRustAddition.client"));
