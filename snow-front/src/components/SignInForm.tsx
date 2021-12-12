import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Utils/Api";

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
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input());
  const [errors, setErrors] = useState(new Error());

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (validate()) {
      const data: Input = input as Input;

      const result = await signIn(data);
      if (result.error) {
        setErrors({message: result.error });
      } else {
        navigate("/");
      }

      setValues(new Input());
    }
  };

  const validate = () => {
    let isValid = true;
    
    return isValid;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{errors.message}</h6>
      </div>
     
      
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
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignInForm;
