import '../App.css';
import UsersForm from '../components/UsersForm';
import i18n from '../services/i18n';

const Users = () => (
    <div className='users'>
      <h1>{i18n.t("Users")}</h1>
      <UsersForm />
    </div>
);

export default Users;