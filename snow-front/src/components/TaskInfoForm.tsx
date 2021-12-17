import { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Level, User, Task, TaskInf } from '../types';
import { getUser, updateUser, getLevels, getLevel, getTask, updateTask, getTaskInfo } from '../Utils/Api';
import ReactPlayer from "react-player"
import YoutubeEmbed from './YoutubeEmbed';

class Input {
  name: string = "";
  link: string = "";
  level: Level = {'_id' : '', 'name' : ''};
  username: string = "";
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

function TaskInfoForm(props: {taskId: string}) {
  const taskId = props.taskId;
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input())
  const [error, setError] = useState('')
  const [levels, setLevels] = useState(new Array<Level>())

  useLayoutEffect(() => {
    async function fetchApi() {
      const task: TaskInf = (await getTaskInfo(taskId))[0];
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
          text: task.text,
          username: task.username
        })
      }
    }
    fetchApi()
  }, [])
     
  
      
  return (
    <Form>
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Task creator : {input.username}</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Level : {input.level.name}</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUnit">
      <div className="App">
      <iframe width="420" height="315" src={input.link} frameBorder="0" allowFullScreen></iframe>
    </div>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicText">
        <Form.Label>{input.text}</Form.Label>
      </Form.Group>
            
    </Form>
  );
}
  
export default TaskInfoForm;