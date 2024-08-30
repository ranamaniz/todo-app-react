import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex justify-center flex-col items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {isRouteErrorResponse(error) ? (
        <>
          <h1>{error.statusText} </h1>
          <p>{error?.error?.message} </p>
        </>
      ) : (
        <>Sorry, something went wrong</>
      )}
    </div>
  );
};

export default ErrorPage;
