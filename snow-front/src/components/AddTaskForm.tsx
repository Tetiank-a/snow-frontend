import { useLayoutEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser, signUp, getLevels, addTask } from "../Utils/Api";
import { useTranslation } from "react-i18next";
import { Level, User, UserInf } from "../types";
import { getUserId } from "../Utils/Common";

class Input {
  name: string = "";
  link: string = "";
  level: Level = { _id: "", name: "" };
  user_id: string = "";
  text: string = "";
}

class Error {
  message: string = "";
}

class NewTaskData {
  name: string = "";
  link: string = "";
  level_id: string = "";
  user_id: string = "";
  text: string = "";
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

function matchYoutubeUrl(url: string) {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return true;
  }
  return false;
}

function AddTaskForm() {
  const userId = getUserId();
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input());
  const [errors, setErrors] = useState(new Error());
  const [error, setError] = useState("");
  const [levels, setLevels] = useState(new Array<Level>());
  useLayoutEffect(() => {
    async function fetchApi() {
      const user: User = (await getUser(userId))[0];
      const levels: Level[] = await getLevels();
      console.log(user);
      setLevels(levels);
      console.log(levels);
      if (user._id != userId) {
        console.log(user._id + "\n" + userId);
        setError("Something went wrong");
      } else {
        setValues({
          name: "",
          link: "",
          level: user.level,
          user_id: userId,
          text: "",
        });
      }
    }
    fetchApi();
  }, []);
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (validate()) {
      const data: Input = input as Input;
      console.log(data);
      const result = await addTask(data); // TODO------------------------------------------------------------
      if (result.error) {
        setErrors({ message: result.error });
      } else {
        navigate("/tasks");
      }
      setValues(new Input());
    }
  };

  const validate = () => {
    let isValid = true;
    if (!matchYoutubeUrl(input.link)) {
      isValid = false;
      setErrors({ message: "Link is invalid" });
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
        <Form.Label>{t("Name")}</Form.Label>
        <Form.Control
          id="username"
          name="username"
          value={input.name}
          onChange={(e) => {
            setValues({ ...input, name: e.target.value });
          }}
          required
          type="text"
          placeholder={t("Enter name")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t("Link")}</Form.Label>
        <Form.Control
          id="link"
          name="link"
          value={input.link}
          onChange={(e) => {
            setValues({ ...input, link: e.target.value });
          }}
          required
          type="link"
          placeholder={t("Enter link")}
        />
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
        <Form.Label>{t("Text")}</Form.Label>
        <Form.Control
          id="text"
          name="text"
          value={input.text}
          onChange={(e) => {
            setValues({ ...input, text: e.target.value });
          }}
          required
          type="text"
          placeholder={t("Enter text")}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {t("Submit")}
      </Button>
    </Form>
  );
}

export default AddTaskForm;
