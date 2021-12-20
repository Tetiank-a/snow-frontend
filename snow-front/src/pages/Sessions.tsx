import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import SessionsForm from '../components/SessionsForm'
import i18n from '../services/i18n';

function Session() {

  return (
    <div className='Session'>
      <h1>{i18n.t("Sessions")}</h1>
      <SessionsForm />
    </div>
  );
}


export default Session;