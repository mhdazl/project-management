import React, { useEffect, useState } from "react";
import Main from "./components/Main/Main";
import NavBar from "./components/Navbar";
import api from "./api";
import { toast } from "react-toastify";
import Loader from "./components/Loader";

function Report() {
  const [tasks, setData] = useState({
    to_do: [],
    in_progress: [],
    review: [],
    closed: [],
  });
  const [loading, setLoading] = useState();

  const getData = async (search) => {
    setLoading(true);
    setData({
      to_do: [],
      in_progress: [],
      review: [],
      closed: [],
    });
    const searchData = search ?? "";

    await api
      .get(`/tasks?search=${searchData}`)
      .then((response) => {
        setData({
          to_do: response?.data?.tasks?.to_do ?? [],
          in_progress: response?.data?.tasks?.in_progress ?? [],
          review: response?.data?.tasks?.review ?? [],
          closed: response?.data?.tasks?.closed ?? [],
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="bg-custom">
      <NavBar getData={getData} />
      <div className="w-full h-full bg-custom">
        {!loading ? <Main tasks={tasks} getData={getData} /> : <Loader />}
      </div>
    </div>
  );
}

export default Report;
