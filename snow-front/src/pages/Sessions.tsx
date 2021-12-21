import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import FunctionalForm from '../components/Functional';
import SessionsForm from '../components/SessionsForm'
import i18n from '../services/i18n';

function Session() {
  const { id } = useParams();

  return (
    <div className='Session'>
      <h1>{i18n.t("Sessions")}</h1>
      <FunctionalForm queryId={id as string}/>
    </div>
  );
}


export default Session;