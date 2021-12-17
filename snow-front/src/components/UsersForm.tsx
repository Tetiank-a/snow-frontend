import axios from 'axios';
import React from 'react';
import config from '../config'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PencilFill } from 'react-bootstrap-icons';
import { User, Level } from '../types';
import { deleteUser, getUsers, getLevel } from '../Utils/Api';

class UsersForm extends React.Component<{}, {users: User[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: new Array<User>()
        }
        this.onClickRemove = this.onClickRemove.bind(this);
    }
  
    async componentDidMount() {
        const users = await getUsers();
        this.setState({users: users});
    }

    async onClickRemove(userId: string) {
        await deleteUser(userId);
        await this.componentDidMount();
    }

    render() {
      const users = this.state.users;

      const userList = users.map(p => (
        <Col>
            <Card id={p._id} className="user-area">
            <Card.Body>
                <Card.Title>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                            {p.username}
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
                                Email: {p.email}
                            </div>
                        </Col>
                    </Row>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                        <Link to={`levels/${p.level}`} style={{ textDecoration: 'none' }}>
                                <div className="p-2 m-1 border rounded">
                                    Roles: {p.level.name}
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
            {(users.length == 0) && (
                <NoElements text="No users"/>
            )}
            
            <Row xs={1} md={2} className="g-4 mt-0 user-list">
                {userList}
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

export default UsersForm;