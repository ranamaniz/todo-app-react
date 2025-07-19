import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "../../../api/auth/authServices";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import toast, { Toaster } from "react-hot-toast";
import PublicLayout from "../../../layout/PublicLayout";

const Login = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    setFormValues((prevValues) => ({
      ...prevValues,
      [targetName]: targetValue,
    }));
  };

  const handleLogin = async () => {
    // TODO: submit to login channel

    // TODO: ? how to know if the user is logged in
    // how to continue knowing if the user is logged in

    console.log(formValues);

    // call login api
    // if logged in the redirect to tasks page
    // next check the token always on api call,
    // also think about authorization and refresh token

    try {
      const data = await authenticateUser(formValues);
      console.log("data", data);
      if (data) {

        // TODO: need to check acccess token if authenticated and set it
        // also set refersh token
        // and user info in the state
        navigate("/");
      }
    } catch (e: any) {
      console.log(e);

      const errorMessage =
        e?.message || "Sorry, could not login. Please try again!";
      toast.error(errorMessage);
    }
  };
  return (
    <PublicLayout>
      <section className="flex justify-center flex-col align-items-center gap-5 bg-white shadow-md rounded-lg w-[500px] p-8 text-gray-600">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center flex-col gap-2"
        >
          <h1 className="self-center font-bold text-lg">Login</h1>
          <Input
            label="Email"
            name="email"
            onChange={handleChange}
            value={formValues.email}
            error=""
          />
          <Input
            label="Password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
            error=""
            type="password"
          />
          <Button type="submit" onClick={handleLogin} className="w-full mt-5">
            Login
          </Button>

          <p>
            Don't have an account?{" "}
            <Link
              to={{ pathname: "/signup" }}
              className="underline text-blue-500 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </form>
      </section>

      <Toaster />
    </PublicLayout>
  );
};

export default Login;
