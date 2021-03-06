import { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Level, User } from '../types';
import { getUser, updateUser, getLevels, getLevel } from '../Utils/Api';
import { useTranslation } from "react-i18next";

class Input {
  username: string = "";
  email: string = "";
  level: Level = {'_id' : '', 'name' : ''};
}

class EditUserData extends Input {
  _id: string = "";
}

function getLevelName(id: string, a: Array<Level>) : string {
    for (let x = 0; x < a.length; x++) {
        console.log(x + " .) " + a[x]['_id'] + " -> " + id);
        if (a[x]['_id'] == id) {
            // console.log(x.name);
            return a[x].name;
        }
    }
    console.log("WRONG CODE!!!!!!!");
    return "";
}

function EditUserForm(props: {userId: string}) {
  const userId = props.userId;
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input())
  const [error, setError] = useState('')
  const [levels, setLevels] = useState(new Array<Level>())

  useLayoutEffect(() => {
    async function fetchApi() {
      const user: User = (await getUser(userId))[0];
      const levels: Level[] = await getLevels();
      setLevels(levels); 
      console.log(levels);
      if (user._id != userId) {
        console.log(user._id + "\n" + userId);
        setError("Something went wrong")
      } else {
        setValues({
          username: user.username,
          email: user.email,
          level: user.level
        })
      }
    }
    fetchApi()
  }, [])
     
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data: EditUserData = input as EditUserData;
    data._id = (props.userId).toString();

    const result = await updateUser(data, data._id);
    const error = result?.error ?? '';
    if (error) {
      setError(error)
    } else {
      navigate('/users')
    }
  }
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit} action="/users">
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>{t("Name")}</Form.Label>
        <Form.Control
          id="username"
          name="username"
          value={input.username}
          onChange={e => {setValues({...input, username: e.target.value});}}
          required
          type="text"
          placeholder={t("Enter name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>{t("Email")}</Form.Label>
        <Form.Control
          id="email"
          name="email"
          value={input.email}
          onChange={e => {setValues({...input, email: e.target.value});}}
          required
          type="text"
          placeholder={t("Enter email")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUnit">
        <Form.Label>{t("Level")}</Form.Label>
        <Form.Select
          id="levels"
          name="levels"
          value={input.level._id}
          onChange={e => {setValues({...input, level: {'_id' : e.target.value, 'name' : getLevelName(e.target.value, levels)}})}}
          required
          placeholder={t("Enter level")}
        >
        {levels.map((level) =>
          <option selected={input.level == {'_id': level._id, 'name': level.name}} value={level._id} id={level._id} key={level.name}>{level.name}</option>
        )}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        {t("Submit")}
      </Button>      
    </Form>
  );
}
  
export default EditUserForm;