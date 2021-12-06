import React from "react";
import { useSelector } from "react-redux";
import BarChart from "../../charts/BarChart01";
import { Skeleton } from "@mui/material";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04() {
  // get task array from redux state
  const isLoading = useSelector((state) => state.dashboard.isLoading);

  // const token = useSelector((state) => state.dashboard.token);
  // const dashboardItems = useSelector((state) => state.dashboard.items);

  // console.log("dashboard items", dashboardItems);
  const taskArr = useSelector((state) => state.dashboard.items[0]?.task);

  // const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  // var currentDate = new Date();
  // var date = new Date(Date.parse("2021-11-26T01:34:04.000000Z"));
  // console.log("current date", currentDate);
  // console.log("date..", date);
  // var dayDiff = Math.round(Math.abs((currentDate - date) / oneDay));
  // console.log("day diff", dayDiff);

  // filter pending task
  const pendingTaskArr = taskArr?.filter((item) => item.status === 1);
  // filter array of created_at date from task array
  const pendingTaskCreatedAtArr = pendingTaskArr.map((item) => item.created_at);

  const pendingDateArr = pendingTaskCreatedAtArr.map((element) => {
    var d = new Date(Date.parse(element)).toLocaleDateString();
    return d;
  });
  // console.log("pending task created_at arr", pendingDateArr);
  var pendingTaskCount = {};
  pendingDateArr.forEach(function (i) {
    pendingTaskCount[i] = (pendingTaskCount[i] || 0) + 1;
  });

  // console.log("pending task count..", pendingTaskCount);
  const uniqueDatesArr = Object.keys(pendingTaskCount);
  // console.log("dates?", uniqueDatesArr);

  //filter pending task
  const pendingUniqueTasksArr = Object.values(pendingTaskCount);
  // console.log("pending task count?", pendingUniqueTasksArr);

  // filter complete task
  const completeTaskArr = taskArr.filter((item) => item.status === 2);
  // filter array of created_at date from task array
  const completeTaskCreatedAtArr = completeTaskArr.map(
    (item) => item.created_at
  );
  const completeDateArr = completeTaskCreatedAtArr.map((element) => {
    var d = new Date(Date.parse(element)).toLocaleDateString();
    return d;
  });

  var completeTaskCount = {};
  completeDateArr.forEach(function (i) {
    completeTaskCount[i] = (completeTaskCount[i] || 0) + 1;
  });
  // const completeUniqueTasksArr = Object.values(completeTaskCount);
  // console.log("complete task count?", completeUniqueTasksArr);

  const chartData = {
    labels: uniqueDatesArr,
    datasets: [
      // yellow bars
      {
        label: "Pending Tasks",
        data: pendingUniqueTasksArr,
        backgroundColor: tailwindConfig().theme.colors.yellow[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[700],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      // {
      //   label: "Completed Tasks",
      //   data: completeUniqueTasksArr,
      //   backgroundColor: tailwindConfig().theme.colors.green[500],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.green[700],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Pending Tasks</h2>
      </header>
      {isLoading === true ? (
        <div className="flex flex-col px-5 py-2">
          <Skeleton variant="text" height={75} />
          <Skeleton variant="rectangular" height={200} />
        </div>
      ) : (
        <>
          {/* Chart built with Chart.js 3 */}
          {/* Change the height attribute to adjust the chart height */}
          <BarChart data={chartData} width={595} height={248} />
        </>
      )}
    </div>
  );
}

export default DashboardCard04;
