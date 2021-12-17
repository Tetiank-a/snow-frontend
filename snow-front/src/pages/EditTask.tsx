import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import EditTaskForm from '../components/EditTaskForm'

function EditTask() {
  const { id } = useParams();

  return (
    <div className='editTask'>
      <h1>Edit Task</h1>
      <EditTaskForm taskId={id as string} />
    </div>
  );
}


export default EditTask;