import Spinner from "./Spinner";

const PageSpinner = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center flex-col items-center">
      <Spinner />
      <span>Loading...</span>
    </div>
  );
};

export default PageSpinner;
