import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import EditTaskForm from '../components/EditTaskForm'
import i18n from '../services/i18n';

function EditTask() {
  const { id } = useParams();

  return (
    <div className='editTask'>
      <h1>{i18n.t("editTask")}</h1>
      <EditTaskForm taskId={id as string} />
    </div>
  );
}


export default EditTask;