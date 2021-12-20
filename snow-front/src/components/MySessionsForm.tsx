import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar2Plus,
  PencilFill,
  Stop,
  StopBtn,
  TrashFill,
} from "react-bootstrap-icons";
import { Idable, Session } from "../types";
import { deleteSession, getSessions, updateSession } from "../Utils/Api";
import { WithTranslation, withTranslation } from "react-i18next";
import { getUserId, isAdmin, isInstructor } from "../Utils/Common";
const userId = getUserId();
class Input {
  user_id: string = "";
}

interface IProps extends WithTranslation {
  prop: any;
}
class SessionForm extends React.Component<IProps, { sessions: Session[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      sessions: new Array<Session>(),
    };
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  async componentDidMount() {
    const sessions = await getSessions();
    console.log(sessions);
    console.log("----------");
    console.log(userId);
    console.log(sessions.length);
    let sessions2 = new Array<Session>();
    for (let i = 0; i < sessions.length; ++i) {
      if (
        sessions[i].user._id == userId ||
        sessions[i].instructor._id == userId
      ) {
        sessions2.push(sessions[i]);
      }
    }
    this.setState({ sessions: sessions2 });
  }

  async onClickRemove(productId: string) {
    await deleteSession(productId);
    await this.componentDidMount();
  }

  async onClickUpdate(sessionId: string) {
    const data = { user_id: userId };
    const result = await updateSession(data, sessionId);
    alert("Added");
    console.log(result);
    const error = result?.error ?? "";
    if (error) {
      console.log(error);
    } else {
      //navigate('/users');
    }
  }

  async onClickUnregister(sessionId: string) {
    const sessions = this.state.sessions;
    console.log(sessions[this.getIndexById(sessions, sessionId)].instructor.username);
    if (sessions[this.getIndexById(sessions, sessionId)].instructor._id == userId) {
      await deleteSession(sessionId);
      await this.componentDidMount();
    } else {
      const data = { user_id: "-" };
      const result = await updateSession(data, sessionId);

      await this.componentDidMount();
      console.log(result);
      const error = result?.error ?? "";
      if (error) {
        console.log(error);
      }
    }
  }

  getIndexById(array: Session[], id: string) {
    return array.findIndex((el) => el._id == id);
  }

  render() {
    const sessions = this.state.sessions;
    const isAdminRole: boolean = isAdmin();
    const isInstructorRole: boolean = isInstructor();
    const tbody = sessions.map((s, i) => (
      <tr>
        <td>{i + 1}</td>
        <td>
          {sessions[this.getIndexById(sessions, s._id)]?.location.name ?? ""}
        </td>
        <td  style={{ backgroundColor: "cyan" }}>
          {sessions[this.getIndexById(sessions, s._id)]?.user.username ??
            ""}
        </td>
        <td>
        {isInstructorRole && (
            <td>
                {sessions[this.getIndexById(sessions, s._id)]?.instructor.username ??
            ""}
            </td>
          )}
        </td>
        <td>{new Date(s.dtstart).toLocaleString()}</td>
        <td>{new Date(s.dtfinish).toLocaleString()}</td>
        <td>
          {isInstructorRole && (
            <Row className="justify-content-around" xs="auto">
             
              <Col>
                <TrashFill
                  color="red"
                  onClick={() => {
                    this.onClickRemove(s._id);
                  }}
                />
              </Col>
            </Row>
          )}
          {isAdminRole && (
            <Row className="justify-content-around" xs="auto">
              <Col>
                <TrashFill
                  color="red"
                  onClick={() => {
                    this.onClickRemove(s._id);
                  }}
                />
              </Col>
            </Row>
          )}
          {!isInstructorRole && !isAdminRole && (
            <Row className="justify-content-around" xs="auto">
              <Col>
                <TrashFill
                  color="red"
                  onClick={() => {
                    this.onClickUnregister(s._id);
                  }}
                />
              </Col>
            </Row>
          )}
        </td>
      </tr>
    ));

    return (
      <div>
        <Row xs={1} className="g-4 mt-0">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>{this.props.t("Location")}</th>
                <th>{this.props.t("Student")}</th>
                {isInstructorRole && (
                <th>{this.props.t("Instructor")}</th>
                )}
                <th>{this.props.t("Time from")}</th>
                <th>{this.props.t("Time to")}</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>{tbody}</tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

export default withTranslation()(SessionForm);
