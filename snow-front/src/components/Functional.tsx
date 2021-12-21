import { useLayoutEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Level, User, Task, Session, Query } from "../types";
import {
  getSessions,
  getQuery,
  deleteSession,
  updateSession,
} from "../Utils/Api";
import { useTranslation } from "react-i18next";
import { getUserId, isAdmin, isInstructor } from "../Utils/Common";
import { Calendar2Plus, TrashFill } from "react-bootstrap-icons";

const userId = getUserId();

class Input {
  location: Level = { _id: "", name: "" };
  dtstart: Date = new Date();
  dtfinish: Date = new Date();
  sessions: Array<Session> = new Array<Session>();
}

class EditTaskData extends Input {
  _id: string = "";
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

async function onClickRemove(productId: string) {
  await deleteSession(productId);
  //await this.componentDidMount();
}

async function onClickUpdate(sessionId: string) {
  const data = { user_id: userId };
  const result = await updateSession(data, sessionId);
  alert("Added");
  console.log(result);
  const error = result?.error ?? "";
  if (error) {
    console.log(error);
  } else {
    //navigate('/1');
  }
  //await this.componentDidMount();
  window.location.reload();
}

function getIndexById(array: Session[], id: string) {
  return array.findIndex((el) => el._id == id);
}
async function getVal() {
  const sessionsx = await getSessions();
  return sessionsx;
}

function FunctionalForm(props: { queryId: string }) {
  console.log("----------");

  const queryId = props.queryId;
  console.log(queryId);
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input());
  const [error, setError] = useState("");
  //const [sessions, setSessions] = useState(new Array<Session>());

  useLayoutEffect(() => {
    async function fetchApi() {
      const query: Query = (await getQuery(queryId))[0];
      const sessionsx = await getSessions();
      let sessions2 = new Array<Session>();
      for (let i = 0; i < sessionsx.length; ++i) {
        console.log(sessionsx[i].user._id);
        if (sessionsx[i].user._id == "-" && sessionsx[i].location._id == query.location._id) {
          sessions2.push(sessionsx[i]);
        }
      }
      console.log(sessions2);
      console.log(query);
      setValues({
        dtstart: query.dtstart,
        dtfinish: query.dtfinish,
        location: query.location,
        sessions: sessions2,
      });
    }
    fetchApi();
  }, []);

  const { t } = useTranslation();
  const isAdminRole: boolean = isAdmin();
  const isInstructorRole: boolean = isInstructor();
  const tbody = input.sessions.map((s, i) => (
    <tr>
      <td>{i + 1}</td>
      <td>{input.sessions[getIndexById(input.sessions, s._id)]?.location.name ?? ""}</td>
      <td>
        {input.sessions[getIndexById(input.sessions, s._id)]?.instructor.username ?? ""}
      </td>
      <td>{new Date(s.dtstart).toLocaleString()}</td>
      <td>{new Date(s.dtfinish).toLocaleString()}</td>
      <td>
        {isInstructorRole && (
          <Row className="justify-content-around" xs="auto"></Row>
        )}
        {isAdminRole && (
          <Row className="justify-content-around" xs="auto">
            <Col>
              <TrashFill
                color="red"
                onClick={() => {
                  onClickRemove(s._id);
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
                  onClickUpdate(s._id);
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
              <th>{t("Location")}</th>
              <th>{t("Instructor")}</th>
              <th>{t("Time from")}</th>
              <th>{t("Time to")}</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>{tbody}</tbody>
        </Table>
      </Row>
    </div>
  );
}

export default FunctionalForm;
