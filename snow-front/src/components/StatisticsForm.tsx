import axios from "axios";
import React from "react";
import config from "../config";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PencilFill } from "react-bootstrap-icons";
import { User, Level } from "../types";
import { getUsers, getLevels } from "../Utils/Api";
import Users from "../pages/Users";
import { AnyObject } from "immer/dist/internal";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useTranslation, WithTranslation, withTranslation } from 'react-i18next';

const data = [
  { address: "Address", numOrders: 0 },
];

class StatisticsForm extends React.Component<{}, { users: User[]; levels: Level[]; }> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: new Array<User>(),
      levels: new Array<Level>(),
    };
  }

  async componentDidMount() {
    const users = await getUsers();
    const levels = await getLevels();
    console.log(users);
    this.setState({ users: users, levels: levels });
  }

  render() {
    const users = this.state.users;
    const levels = this.state.levels;
    let s = "";
    let warehousesInfo = new Map<string, number>();
    for (let i = 0; i < users.length; ++i) {
      for (let j = 0; j < levels.length; ++j) {
        if (users[i].level._id == levels[j]._id) {
          if (!warehousesInfo.has(levels[j].name)) {
            warehousesInfo.set(levels[j].name, 0);
          }
          let type_name = levels[j].name;
          let new_val = warehousesInfo.get(type_name) || 0;
          warehousesInfo.set(levels[j].name, new_val + 1);
          break;
        }
      }
    }
    const numUsers = users.length;
    if (data.length == 1) {
    warehousesInfo.forEach(function (value, key) {
      s = s + " - " + key + ": " + value + "\n";
      data.push({address: key, numOrders: value});
    });
  }
    console.log(s);
    return (
      <div>
        <div>{users.length != 0 && <SaveSuppliesData text={s} />}</div>
        <div>
          {users.length != 0 && <PrintStats text={numUsers.toString()} />}
        </div>
      </div>
    );
  }
}

function getLink(list: string): string {
  const data = new Blob([list], { type: "text/plain" });
  const downloadLink = window.URL.createObjectURL(data);
  return downloadLink;
}

function PrintStats(props: { text: string }) {
  const { t } = useTranslation();
  return (
    <>
      <br></br>
      <h4>{t("Number of users:")}</h4>
      <div>
        <pre>{t("Total number of users:")} {props.text}</pre>
      </div>
    </>
  );
}

function SaveSuppliesData(props: { text: string }) {
  const { t } = useTranslation();
  return (
    <>
      <br></br>
      <div className="mh-10">
        <h4>{t("Total number of users:")}</h4>
        <div className="mh-10">
          <pre>{props.text}</pre>
        </div>
        <LineChart width={800} height={300} data={data}>
          <Line type="monotone" dataKey="numOrders" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="address" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </>
  );
}

export default StatisticsForm;
