import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="bg-indigo-500  flex justify-between py-4 px-6 text-white">
      <Link to={"todos"}>TASKS</Link>
      <Link to={"/signup"}>Sign up</Link>
    </nav>
  );
};

export default NavigationBar;
