import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function TasksFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).utc().format("YYYY-MM-DD"));
      }
    }

    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }

    navigate("/tasks");
  });

  return (
    <>
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 text-white max-w-md w-full p-10 rounded-md">
          <form onSubmit={onSubmit}>
            <label htmlFor="title">title</label>
            <input
              type="text"
              placeholder="title"
              className="w-full bg-zing-700 text-white px-4 py-2 rounded-md border-2 border-white my-2"
              {...register("title")}
              autoFocus
              autoComplete="off"
            />

            <label htmlFor="description">description</label>
            <textarea
              rows="3"
              placeholder="Description"
              className="w-full bg-zing-700 text-white px-4 py-2 rounded-md border-2 border-white my-2"
              {...register("description")}
              autoComplete="off"
            ></textarea>

            <label htmlFor="date">date</label>
            <input
              className="w-full bg-zing-700 text-white px-4 py-2 rounded-md border-2 border-white my-2"
              type="date"
              {...register("date")}
            />

            <div className="options flex gap-2">
              <button className="bg-indigo-500 px-3 py-2 rounded-md">
                Save
              </button>

              <Link to="/tasks" className="bg-indigo-500 px-3 py-2 rounded-md">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
