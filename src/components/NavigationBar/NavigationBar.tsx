import { Link } from "react-router-dom";

const NavigationBar = () => {
  
  // TODO: show login or signup only if not logged in 
  const NAV_ITEMS = [
    { label: "Tasks", redirectLink: "todos", active: true },
    { label: "Signup", redirectLink: "signup", active: true },
    { label: "Login", redirectLink: "login", active: true },
  ];


  return (
    <nav className="bg-indigo-500   py-4 px-6 text-white">
      <ul className="flex gap-5 justify-end">
        {NAV_ITEMS.map((navItem) => (
          <Link to={navItem?.redirectLink}>{navItem.label}</Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
