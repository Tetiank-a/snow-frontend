import axios from 'axios';
import React from 'react';
import config from '../config'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PencilFill } from 'react-bootstrap-icons';
import { User, Level, Task } from '../types';
import { deleteUser, getUsers, getLevel, getTasks } from '../Utils/Api';

class TasksForm extends React.Component<{}, {tasks: Task[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: new Array<Task>()
        }
    }
  
    async componentDidMount() {
        const tasks = await getTasks();
        this.setState({tasks: tasks});
    }

    

    render() {
      const tasks = this.state.tasks;

      const taskList = tasks.map(p => (
        <Col>
            <Card id={p._id} className="user-area">
            <Card.Body>
                <Card.Title>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                            {p.name}
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Link to={`edit/${p._id}`}>
                                        <PencilFill />
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    <Row>
                        <Col>
                            <div className="p-2 m-1 border rounded">
                                {p.text}
                            </div>
                        </Col>
                    </Row>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                        <Link to={`levels/${p.level}`} style={{ textDecoration: 'none' }}>
                                <div className="p-2 m-1 border rounded">
                                    Level: {p.level.name}
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
      ));

      return (
        <div>
            {(tasks.length == 0) && (
                <NoElements text="No tasks"/>
            )}
            
            <Row xs={1} md={2} className="g-4 mt-0 user-list">
                {taskList}
            </Row>
        </div>
      );
     }
}

function NoElements(props: {text: string}) {
    return (
        <div className="mh-100">
            <h2 className="text-secondary text-center py-5">{props.text}</h2>
        </div>
    );
}

export default TasksForm;