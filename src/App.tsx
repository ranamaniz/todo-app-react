/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Profiler, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PageSpinner } from "./components/Spinner";
import { MainLayout } from "./layout";
import { Outlet } from "react-router-dom";



function App() {

  function onRender(
    id: any,
    phase: any,
    actualDuration: any,
    baseDuration: any,
    startTime: any,
    commitTime: any
  ) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
  }

  return (
    <Profiler id="a" onRender={onRender}>
      <ErrorBoundary fallback={<div>Sorry some error Occured</div>}>
        <main className="max-h-screen">
          <Suspense fallback={<PageSpinner />}>
            <MainLayout>
             <Outlet/>
            </MainLayout>
          </Suspense>
        </main>
      </ErrorBoundary>
    </Profiler>
  );
}

export default App;
