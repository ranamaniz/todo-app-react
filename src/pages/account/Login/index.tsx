import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { authenticateUser, registerUser } from "../../../api/auth/authServices";

type Props = {};

const Login = (props: Props) => {
  console.log(props);
  const [formValues, setFormValues] = useState({ email: "", password: "" });

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
    // next check the token always on api call, also think about authorization and refresh token

    try{
      const data = await authenticateUser(formValues);
      console.log(data);
    }catch(e){

    }

  };
  return (
    <section className="h-screen flex justify-center items-center rounded-md ">
      <div className="bg-blue-200 p-4 ">
        <h1> Login</h1>
        <hr />
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5  mt-4">
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
          <Button type="submit" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
