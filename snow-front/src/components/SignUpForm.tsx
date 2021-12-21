import { useLayoutEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Level } from "../types";
import { getLevels, signUp } from "../Utils/Api";

class Input {
  username: string = "";
  email: string = "";
  level: Level = { _id: "", name: "" };
  password: string = "";
  confirm_password: string = "";
  agreement: boolean = false;
}

class Error {
  confirm_password: string = "";
  message: string = "";
}

class NewUserData {
  username: string = "";
  email: string = "";
  level_id: string = "";
  password: string = "";
}

function getLevelName(id: string, a: Array<Level>): string {
  for (let x = 0; x < a.length; x++) {
    console.log(x + " .) " + a[x]["_id"] + " -> " + id);
    if (a[x]["_id"] == id) {
      // console.log(x.name);
      return a[x].name;
    }
  }
  console.log("WRONG CODE!!!!!!!");
  return "";
}

function SignUpForm() {
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input());
  const [errors, setErrors] = useState(new Error());
  const [levels, setLevels] = useState(new Array<Level>());

  useLayoutEffect(() => {
    async function fetchApi() {
      const levels: Level[] = await getLevels();
      setLevels(levels);
      console.log("------");
      console.log(levels);
    }
    fetchApi();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (validate()) {
      const data: Input = input as Input;
      const new_data = {
        username: data.username,
        password: data.password,
        confirm_password: data.confirm_password,
        email: data.email,
        level_id: data.level._id,
      };
      const result = await signUp(new_data);
      if (result.error) {
        setErrors({ confirm_password: "", message: result.error });
      } else {
        navigate("/signin");
      }

      setValues(new Input());
    }
  };

  const validate = () => {
    let isValid = true;
    if (
      typeof input.password !== "undefined" &&
      typeof input.confirm_password !== "undefined"
    ) {
      if (input.password != input.confirm_password) {
        isValid = false;
        setErrors({ message: "", confirm_password: "Passwords don't match." });
      }
    }
    return isValid;
  };
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{errors.message}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          id="username"
          name="username"
          value={input.username}
          onChange={(e) => {
            setValues({ ...input, username: e.target.value });
          }}
          required
          type="text"
          placeholder="Enter name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          id="email"
          name="email"
          value={input.email}
          onChange={(e) => {
            setValues({ ...input, email: e.target.value });
          }}
          required
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUnit">
        <Form.Label>{t("Level")}</Form.Label>
        <Form.Select
          id="levels"
          name="levels"
          value={input.level._id}
          onChange={(e) => {
            setValues({
              ...input,
              level: {
                _id: e.target.value,
                name: getLevelName(e.target.value, levels),
              },
            });
          }}
          required
          placeholder={t("Enter level")}
        >
          {levels.map((level) => (
            <option
              selected={input.level == { _id: level._id, name: level.name }}
              value={level._id}
              id={level._id}
              key={level.name}
            >
              {level.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          name="password"
          value={input.password}
          onChange={(e) => {
            setValues({ ...input, password: e.target.value });
          }}
          required
          type="password"
          placeholder="Enter password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          id="confirm_password"
          name="confirm_password"
          value={input.confirm_password}
          onChange={(e) => {
            setValues({ ...input, confirm_password: e.target.value });
          }}
          required
          type="password"
          placeholder="Enter password again"
        />
        <div className="text-danger">{errors.confirm_password}</div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          checked={input.agreement}
          onChange={(e) => {
            setValues({ ...input, agreement: e.target.checked });
          }}
          required
          name="agreement"
          type="checkbox"
          label="I agree with terms and conditions"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignUpForm;
