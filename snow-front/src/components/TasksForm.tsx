import axios from 'axios';
import React from 'react';
import config from '../config'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import { User, Level, Task } from '../types';
import { deleteUser, getUsers, getLevel, getTasks, deleteTask } from '../Utils/Api';
import { useTranslation, withTranslation, WithTranslation } from "react-i18next";

interface IProps extends WithTranslation {
    prop: any;
  }

class TasksForm extends React.Component<IProps, {tasks: Task[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: new Array<Task>()
        }
        this.onClickRemove = this.onClickRemove.bind(this);
    }
  
    async componentDidMount() {
        const tasks = await getTasks();
        this.setState({tasks: tasks});
    }

    async onClickRemove(taskId: string) {
        await deleteTask(taskId);
        await this.componentDidMount();
    }

    render() {
      const tasks = this.state.tasks;

      const taskList = tasks.map(p => (
        <Col>
            <Card id={p._id} className="task-area">
            <Card.Body>
                <Card.Title>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                        <Link to={`info/${p._id}`} style={{ textDecoration: 'none' }}>
                            {p.name}
                            </Link>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                <Link to={`edit/${p._id}`}>
                                        <PencilFill />
                                    </Link>
                                    <Col>
                                    <TrashFill color="red" onClick={() => {this.onClickRemove(p._id)}} />
                                    </Col>
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
                                {this.props.t('Level')}: {p.level.name}
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

export default withTranslation()(TasksForm);