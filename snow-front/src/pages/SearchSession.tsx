import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import SearchSessionForm from '../components/SearchSessionForm'
import i18n from '../services/i18n';

function SearchSession() {

  return (
    <div className='searchSession'>
      <h1>{i18n.t("Search Session")}</h1>
      <SearchSessionForm />
    </div>
  );
}


export default SearchSession;