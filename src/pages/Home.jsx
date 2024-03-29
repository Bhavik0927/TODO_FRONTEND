import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { context, server } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {

  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {isAuthenticated} = useContext(context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/tasks/${id}`, {}, {
        withCredentials: true
      })
      toast.success(data.message);
      setRefresh(prev => !prev);

    } catch (error) {
      toast.error(error.response.data.message);

    }
    // toast.success(id)
  }

  const deleteHandler = async (id) => {

    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true
      })
      toast.success(data.message);
      setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message);

    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/tasks/new`, {
        title,
        description
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })

      setTitle("");
      setDiscription("")
      toast.success(data.message);
      setLoading(false);
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false)
    }
  }

  useEffect(() => {
    axios.get(`${server}/tasks/mytask`, {
      withCredentials: true
    }).then(res => {
      setTasks(res.data.tasks);
    }).catch(e => {
      toast.error(e.response.data.message)
    })
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler} >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              placeholder="Title"
            />

            <input
              value={description}
              onChange={(e) => setDiscription(e.target.value)}
              type="text"
              required
              placeholder="Description"
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>

          </form>
        </section>
      </div>
      <section className="todosContainer">
        {
          tasks.map((i) => (
            <TodoItem
              key={i._id}
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id} />
          ))
        }
      </section>
    </div>
  )
}

export default Home;