import { useCallback, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

type SIGNUP_FORM_VALUES = {
  email: string;
  password: string;
  confirmPassword: string;
};

const INITIAL_SIGNUP_VALUES = { email: "", password: "", confirmPassword: "" };

const Signup = () => {
  const [formValues, setFormValues] = useState<SIGNUP_FORM_VALUES>(
    INITIAL_SIGNUP_VALUES
  );
  const handleSignup = () => {
    console.log("hello");
  };

  const handleInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const inputName = e.currentTarget.name;
      const value = e.currentTarget.value;

      console.log(inputName);

      setFormValues((prevValues) => ({ ...prevValues, [inputName]: value }));
    },
    []
  );

  //   TODO:validation / use of formik

  console.log(formValues);

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-sm flex justify-center  flex-col gap-5 item bg-gray-50 w-[500px] p-6 text-gray-600   "
      >
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          label="Password"
          id="password"
          name="password"
          type="text"
          value={formValues.password}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="text"
          value={formValues.confirmPassword}
          onChange={(e) => handleInputChange(e)}
        />

        <Button type="submit" onClick={handleSignup}>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Signup;
