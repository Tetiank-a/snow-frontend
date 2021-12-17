import axios from 'axios';
import React from 'react';
import config from '../config'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PencilFill } from 'react-bootstrap-icons';
import { User, Level, BackUp } from '../types';
import { deleteUser, getUsers, getLevel, backUp } from '../Utils/Api';
import Users from '../pages/Users';

class BackUpForm extends React.Component<{}, {backup: BackUp[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            backup: new Array<BackUp>()
        }
    }
  
    async componentDidMount() {
        const backup = await backUp();
        console.log(backup);
        this.setState({backup: backup});
    }

    

    render() {
      const backup = this.state.backup;
      const obj = JSON.stringify(backup, undefined, "\t");

      console.log(obj);
      return (
          
        <div>
            {(backup.length != 0) && (
                <NoElements text={obj}/>
            )}
        </div>
      );
     }
}

function getLink(list: string): string {
    const data = new Blob([list], { type: 'text/plain' });
    const downloadLink = window.URL.createObjectURL(data);
    return downloadLink;
}

function NoElements(props: {text: string}) {
    return (
        <div className="mh-100">
            <a download='list.txt' href={getLink(props.text)}>download</a>
            <pre>{props.text}</pre>
            
        </div>
    );
}

export default BackUpForm;