import '../App.css';
import AddTaskForm from '../components/AddTaskForm'
import i18n from '../services/i18n';

const AddTask = () => (
    <div className='addtask'>
      <h1>{i18n.t("Add task")}</h1>
      <AddTaskForm />
    </div>
);

export default AddTask;