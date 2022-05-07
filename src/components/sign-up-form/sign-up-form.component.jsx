import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Both password are not same!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already exists");
      } else {
        console.log(error.code);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const formInputs = [
    {
      label: "Display Name",
      type: "text",
      name: "displayName",
      value: displayName,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: email,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: confirmPassword,
    },
  ];

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        {formInputs.map((formInput) => {
          return (
            <FormInput
              key={formInput.name}
              label={formInput.label}
              type={formInput.type}
              handleChange={handleChange}
              name={formInput.name}
              value={formInput.value}
            />
          );
        })}
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
