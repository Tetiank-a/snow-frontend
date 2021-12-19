import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import CreateSessionForm from '../components/CreateSessionForm';
import i18n from '../services/i18n';

function CreateSession() {

  return (
    <div className='createSession'>
      <h1>{i18n.t("Create Session")}</h1>
      <CreateSessionForm />
    </div>
  );
}


export default CreateSession;