import { useLayoutEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser, signUp, getLevels, addTask, getLocations, addQuery } from "../Utils/Api";
import { useTranslation } from "react-i18next";
import { Level, User, UserInf } from "../types";
import { getUserId } from "../Utils/Common";
import DateTimePicker from 'react-datetime-picker';

let ID = "";

function get_id() {
  return ID;
}
class Input {
  location: Level = { _id: "", name: "" };
  dtstart: Date = new Date();
  dtfinish: Date = new Date();
}

class Error {
  message: string = "";
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


function SearchSessionForm() {
  const userId = getUserId();
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input());
  const [errors, setErrors] = useState(new Error());
  const [error, setError] = useState("");
  const [levels, setLevels] = useState(new Array<Level>());
  const [date1, onChange1] = useState(new Date());
  const [date2, onChange2] = useState(new Date());
  useLayoutEffect(() => {
    async function fetchApi() {
      const levels: Level[] = await getLocations();
      console.log(levels);
      setLevels(levels);
      console.log(levels);
      
        setValues({
          location: {"_id": levels[0]["_id"], "name": levels[0]["name"]},
          dtstart: new Date(),
          dtfinish: new Date()
        });
    }
    fetchApi();
  }, []);
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (validate()) {
    input.dtstart = date1;
    input.dtfinish = date2;
      const data: Input = input as Input;
      console.log(data);
      const result = await addQuery(data); // TODO------------------------------------------------------------
      console.log(result.response?.data['_id']);
      let query_id = result.response?.data['_id'];
      ID = query_id;
      //const error = result?.error ?? '';
    //if (error) {
    //  setError(error)
    //} else {
      navigate(`filter/${query_id}`);
   // }
      setValues(new Input());
    }
  };

  const validate = () => {
    let isValid = true;
    if (date1.getTime() > date2.getTime()) {
      isValid = false;
      setErrors({ message: "Invalid Date or Time" });
    }
    return isValid;
  };
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{errors.message}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicUnit">
        <Form.Label>{t("Location")}</Form.Label>
        <Form.Select
          id="levels"
          name="levels"
          value={input.location._id}
          onChange={(e) => {
            setValues({
              ...input,
              location: {
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
              selected={input.location == { _id: level._id, name: level.name }}
              value={level._id}
              id={level._id}
              key={level.name}
            >
              {level.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{t("Time from")}</Form.Label>
      <div>
      <DateTimePicker
        onChange={onChange1}
        value={date1}
      />
    </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{t("Time to")}</Form.Label>
      <div>
      <DateTimePicker
        onChange={onChange2}
        value={date2}
      />
    </div>
      </Form.Group>

      <Button variant="primary" type="submit">
        {t("Submit")}
      </Button>
    </Form>
  );
}

export default SearchSessionForm;
