import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-toastify";

import CreateTask from "./CreateTask";
import StatusCard from "./StatusCard";
import TaskCard from "./TaskCard";
import api from "../../api";

function Main({ getData, tasks }) {
  const [errors, setErrors] = useState();
  const [addForm, setAddForm] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const showForm = () => {
    setAddForm(!addForm);
  };

  const handleInputChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  async function submitHandler(event) {
    event.preventDefault();
    let payload = {
      title: values.title,
      description: values.description,
      priority: values.priority,
    };
    try {
      const response = await api.post("/create-task", payload);
      showForm();
      setValues({
        title: "",
        description: "",
        priority: "",
      });
      getData();
      toast.success(response.data.message);
    } catch (error) {
      if (error?.response?.data?.errors) {
        setErrors(error?.response?.data?.errors);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  async function deleteTask(id) {
    try {
      const response = await api.post(`/delete-task?id=${id}`);
      getData();
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const handleDrop = async (taskId, newStatus) => {
    let payload = {
      id: taskId,
      status: newStatus,
    };
    try {
      const response = await api.post("/update-task", payload);
      getData();
      toast.success(response.data.message);
    } catch (error) {
      if (error?.response?.data?.errors) {
        setErrors(error?.response?.data?.errors);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-custom from-blue-200 via-indigo-200 to-pink-200">
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <div className="flex flex-col flex-shrink-0 w-64">
            <StatusCard
              name={"To Do's"}
              count={tasks?.to_do ? tasks.to_do.length : 0}
            />
            <CreateTask
              handleInputChange={handleInputChange}
              onSubmit={submitHandler}
              values={values}
              setValues={setValues}
              showForm={showForm}
              addForm={addForm}
              errors={errors}
            />
            <div className="flex flex-col pb-2 overflow-auto">
              {tasks.to_do.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  status={"to_do"}
                  deleteTask={deleteTask}
                  handleDrop={handleDrop}
                />
              ))}
              {tasks.to_do.length === 0 && (
                <EmptyDropTarget status={"to_do"} handleDrop={handleDrop} />
              )}
            </div>
          </div>
          <div className="flex flex-col flex-shrink-0 w-64">
            <StatusCard
              name={"In Progress"}
              count={tasks?.in_progress ? tasks.in_progress.length : 0}
            />
            <div className="flex flex-col pb-2">
              {tasks.in_progress.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  status={"in_progress"}
                  deleteTask={deleteTask}
                  handleDrop={handleDrop}
                />
              ))}
              {tasks.in_progress.length === 0 && (
                <EmptyDropTarget
                  status={"in_progress"}
                  handleDrop={handleDrop}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col flex-shrink-0 w-64">
            <StatusCard
              name={"Reviews"}
              count={tasks?.review ? tasks.review.length : 0}
            />
            <div className="flex flex-col pb-2 overflow-auto">
              {tasks.review.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  status={"review"}
                  deleteTask={deleteTask}
                  handleDrop={handleDrop}
                />
              ))}
              {tasks.review.length === 0 && (
                <EmptyDropTarget status={"review"} handleDrop={handleDrop} />
              )}
            </div>
          </div>
          <div className="flex flex-col flex-shrink-0 w-64">
            <StatusCard
              name={"Closed"}
              count={tasks?.closed ? tasks.closed.length : 0}
            />

            <div className="flex flex-col pb-2 overflow-auto">
              {tasks.closed.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  status={"closed"}
                  deleteTask={deleteTask}
                  handleDrop={handleDrop}
                />
              ))}
              {tasks.closed.length === 0 && (
                <EmptyDropTarget status={"closed"} handleDrop={handleDrop} />
              )}
            </div>
          </div>

          {/* Repeat the same updates for other status card containers */}
        </div>
      </div>
    </DndProvider>
  );
}

function Task({ task, index, status, deleteTask, handleDrop }) {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { taskId: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => handleDrop(item.taskId, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div className="" ref={drop} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={drag}>
        <TaskCard task={task} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

function EmptyDropTarget({ status, handleDrop }) {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => handleDrop(item.taskId, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return <div className={`p-4 my-2 bg-gwhite h-64`} ref={drop}></div>;
}

export default Main;
