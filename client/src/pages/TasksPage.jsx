import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";

export default function TasksPage() {
  const { getTasks, tasks } = useTasks();
  const { user } = useAuth();

  useEffect(() => {
    getTasks();
  }, [])

  // Si no hay tareas se muestra este mensaje
  if (tasks.length === 0) {
    return (<h1 className="text-white">No tasks</h1>)
  }

  return (
    <>
      <h1 className="text-2xl text-white">Welcome {user.username}</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
        {
          tasks.map(task => (
            <TaskCard task={task} key={task._id} />
          ))
        }
      </div>
    </>
  )
}
