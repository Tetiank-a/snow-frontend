import { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Level, User, Task } from '../types';
import { getUser, updateUser, getLevels, getLevel, getTask, updateTask } from '../Utils/Api';
import { useTranslation } from "react-i18next";

class Input {
  name: string = "";
  link: string = "";
  level: Level = {'_id' : '', 'name' : ''};
  text: string = "";
}

class EditTaskData extends Input {
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

function EditTaskForm(props: {taskId: string}) {
  const taskId = props.taskId;
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input())
  const [error, setError] = useState('')
  const [levels, setLevels] = useState(new Array<Level>())

  useLayoutEffect(() => {
    async function fetchApi() {
      const task: Task = (await getTask(taskId))[0];
      console.log(task);
      const levels: Level[] = await getLevels();
      setLevels(levels); 
      console.log(levels);
      if (task._id != taskId) {
        console.log(task._id + "\n" + taskId);
        setError("Something went wrong")
      } else {
        setValues({
          name: task.name,
          link: task.link,
          level: task.level,
          text: task.text
        })
      }
    }
    fetchApi()
  }, [])
     
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data: EditTaskData = input as EditTaskData;
    data._id = (props.taskId).toString();

    const result = await updateTask(data, data._id);
    const error = result?.error ?? '';
    if (error) {
      setError(error)
    } else {
      navigate('/tasks')
    }
  }
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit} action="/tasks">
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>{t("Name")}</Form.Label>
        <Form.Control
          id="username"
          name="username"
          value={input.name}
          onChange={e => {setValues({...input, name: e.target.value});}}
          required
          type="text"
          placeholder={t("Enter name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>{t("Link")}</Form.Label>
        <Form.Control
          id="link"
          name="link"
          value={input.link}
          onChange={e => {setValues({...input, link: e.target.value});}}
          required
          type="text"
          placeholder={t("Enter link")}
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
      <Form.Group className="mb-4" controlId="formBasicText">
        <Form.Label>{t("Text")}</Form.Label>
        <Form.Control
          id="text"
          name="text"
          value={input.text}
          onChange={e => {setValues({...input, text: e.target.value});}}
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
  
export default EditTaskForm;