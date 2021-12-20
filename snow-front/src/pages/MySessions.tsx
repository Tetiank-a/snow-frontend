import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import MySessionsForm from '../components/MySessionsForm'
import i18n from '../services/i18n';

function MySessions() {

  return (
    <div className='MySession'>
      <h1>{i18n.t("My sessions")}</h1>
      <MySessionsForm />
    </div>
  );
}


export default MySessions;