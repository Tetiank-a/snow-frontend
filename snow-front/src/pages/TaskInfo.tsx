import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import TaskInfoForm from '../components/TaskInfoForm'
import i18n from '../services/i18n';

function TaskInfo() {
  const { id } = useParams();

  return (
    <div className='taskInfo'>
      <h1>{i18n.t('Task Info')}</h1>
      <TaskInfoForm taskId={id as string} />
    </div>
  );
}


export default TaskInfo;