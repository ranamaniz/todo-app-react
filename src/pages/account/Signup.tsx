import { useCallback, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

type SIGNUP_FORM_VALUES = {
  email: string;
  password: string;
  confirmPassword: string;
};

type SIGNUP_FORM_ERRORS = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const INITIAL_SIGNUP_VALUES = { email: "", password: "", confirmPassword: "" };
const INITIAL_SIGNUP_ERRORS = {};

const Signup = () => {
  const [formValues, setFormValues] = useState<SIGNUP_FORM_VALUES>(
    INITIAL_SIGNUP_VALUES
  );

  const [formErrors, setFormErrors] = useState<SIGNUP_FORM_ERRORS>(
    INITIAL_SIGNUP_ERRORS
  );

  const validateForm = useCallback(
    (name: string, value: string) => {
      // eslint-disable-next-line no-useless-escape
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      switch (name) {
        case "email": {
          if (!value) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "Email is required",
            }));
          } else if (!emailRegex.test(value)) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "Invalid email address",
            }));
          } else {
            setFormErrors((prevErrors) => {
              const { [name]: _, ...updatedErrors } = prevErrors;
              return updatedErrors;
            });
          }

          break;
        }

        case "password": {
          if (value.length < 6) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "Password should have at least 6 chars",
            }));
          } else if (value !== formValues.confirmPassword) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "",
              confirmPassword: "Password did not match",
            }));
          } else {
            setFormErrors((prevErrors) => {
              const { [name]: _, ...updatedErrors } = prevErrors;
              return updatedErrors;
            });
          }

          break;
        }

        case "confirmPassword": {
          if (formValues.password !== value) {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "Password did not match",
            }));
          } else {
            setFormErrors((prevErrors) => {
              const { [name]: _, ...updatedErrors } = prevErrors;
              return updatedErrors;
            });
          }

          break;
        }
        default:
          break;
      }
    },
    [formValues]
  );

  const handleSignup = () => {
    console.log("formValues", formValues);
    // TODO:
    // post signup
    // check if it has all the values
  };

  const handleInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const inputName = e.currentTarget.name;
      const value = e.currentTarget.value;

      validateForm(inputName, value);

      setFormValues((prevValues) => ({ ...prevValues, [inputName]: value }));
    },
    [validateForm]
  );

  // TODO:validation / use of formik, yup

  const canSubmit =
    !Object.values(formValues).some((formValue) => formValue === "") &&
    Object.keys(formErrors).length === 0;

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
          error={formErrors?.email || ""}
        />

        {/* TODO: add view password icon */}
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={(e) => handleInputChange(e)}
          error={formErrors?.password || ""}
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formValues.confirmPassword}
          onChange={(e) => handleInputChange(e)}
          error={formErrors?.confirmPassword || ""}
        />

        <Button type="submit" onClick={handleSignup} disabled={canSubmit}>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Signup;
