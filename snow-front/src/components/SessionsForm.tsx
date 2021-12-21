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
import { Idable, Level, Session } from "../types";
import { deleteSession, getSessions, updateSession } from "../Utils/Api";
import { WithTranslation, withTranslation } from "react-i18next";
import { getUserId, isAdmin, isInstructor } from "../Utils/Common";
const userId = getUserId();
class Input {
  user_id: string = "";
}

class Filter {
    location: Level = { _id: "", name: "" };
    dateTimeFrom: Date = new Date();
    dateTimeTo: Date = new Date();
  }

  let filter = new Filter();
interface IProps extends WithTranslation {
  prop: any;
}
class SessionForm extends React.Component<IProps, { sessions: Session[] }> {
  constructor(props: any) {
      console.log("props _------------>");
      console.log(props);
    super(props);
    this.state = {
      sessions: new Array<Session>(),
    };
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  async componentDidMount() {

    const sessions = await getSessions();
    for (let i = 0; i < sessions.length; ++i) {
      if (
        sessions[i].user._id != "-"
      ) {
        sessions.splice(i, 1);
      }
    }
    this.setState({ sessions: sessions });
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
    await this.componentDidMount();
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
        <td>
          {sessions[this.getIndexById(sessions, s._id)]?.instructor.username ??
            ""}
        </td>
        <td>{new Date(s.dtstart).toLocaleString()}</td>
        <td>{new Date(s.dtfinish).toLocaleString()}</td>
        <td>
          {isInstructorRole && (
            <Row className="justify-content-around" xs="auto">
              
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
                <Calendar2Plus
                  color="lime"
                  onClick={() => {
                    this.onClickUpdate(s._id);
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
                <th>{this.props.t("Instructor")}</th>
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
