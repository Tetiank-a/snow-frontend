import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import TaskInfoForm from '../components/TaskInfoForm'

function TaskInfo() {
  const { id } = useParams();

  return (
    <div className='taskInfo'>
      <h1>Task Info</h1>
      <TaskInfoForm taskId={id as string} />
    </div>
  );
}


export default TaskInfo;