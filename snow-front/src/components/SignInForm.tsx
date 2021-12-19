import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Utils/Api";
import { setUserSession } from "../Utils/Common";
import { useTranslation } from "react-i18next";

class Input {
  email: string = "";
  password: string = "";
}

class Error {
  message: string = "";
}

class NewUserData {
  username: string = "";
  email: string = "";
  level_id: string = "";
  password: string = "";
}

function SignInForm() {
  let text = "";
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input());
  const [errors, setErrors] = useState(new Error());

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (validate()) {
      const data: Input = input as Input;
      const result = await signIn(data);

      console.log(result.response?.data);
      if (result.response?.status != 200) {
        setErrors({ message: "Incorrect login or password" });
      } else {
        const token = result.response?.data['token'] ?? "";
        const user = result.response?.data['_id'] ?? "";
        setUserSession(token, user);

        if (user && token) {
          window.location.href = "/";
        }
      }

      setValues(new Input());
    }
  };

  const validate = () => {
    let isValid = true;

    return isValid;
  };
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{errors.message}</h6>
      </div>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t("Email address")}</Form.Label>
        <Form.Control
          id="email"
          name="email"
          value={input.email}
          onChange={(e) => {
            setValues({ ...input, email: e.target.value });
          }}
          required
          type="email"
          placeholder={t("Enter email")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{t("Password")}</Form.Label>
        <Form.Control
          id="password"
          name="password"
          value={input.password}
          onChange={(e) => {
            setValues({ ...input, password: e.target.value });
          }}
          required
          type="password"
          placeholder={t("Enter password")}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
      {t("Submit")}
      </Button>
    </Form>
  );
}

export default SignInForm;
