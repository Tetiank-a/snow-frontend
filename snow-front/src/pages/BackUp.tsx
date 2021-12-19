import '../App.css';
import BackUpForm from '../components/BackUpForm'
import i18n from '../services/i18n';

const BackUp = () => (
    <div className='backup'>
      <h1>{i18n.t("Settings")}</h1>
      <BackUpForm />
    </div>
);

export default BackUp;