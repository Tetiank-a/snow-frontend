import '../App.css';
import TasksForm from '../components/TasksForm';
import i18n from '../services/i18n';

const Tasks = () => (
    <div className='users'>
      <h1>{i18n.t('Tasks')}</h1>
      <TasksForm />
    </div>
);

export default Tasks;