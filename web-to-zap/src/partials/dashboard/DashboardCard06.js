import React from "react";
import { useSelector } from "react-redux";
import DoughnutChart from "../../charts/DoughnutChart";
import { Skeleton } from "@mui/material";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard06() {
  const isLoading = useSelector((state) => state.dashboard.isLoading);

  const categoryArr = useSelector(
    (state) => state.dashboard.items[0]?.category
  );

  // filter active category
  const activeCategoryArr = categoryArr?.filter((item) => item.status === 1);
  // console.log("active category..", activeCategoryArr);
  // filter array of category id and name from active category array
  const activeCategoryIdArr = activeCategoryArr.map((item) => item.id);
  const activeCategoryNameArr = activeCategoryArr.map((item) => item.list);

  // get task array from redux state
  const taskArr = useSelector((state) => state.dashboard.items[0].task);
  const activeTaskArr = taskArr.filter((item) => item.status !== 0);

  // filter array of category id from task array
  const taskCategoryIdArr = activeTaskArr.map((item) => item.category_id);

  // compare 2 arrays and get count matching item
  const result = {};
  activeCategoryIdArr.forEach(function (item) {
    result[item] = 0;
  });

  taskCategoryIdArr.forEach(function (item) {
    if (result.hasOwnProperty(item)) {
      result[item]++;
    }
  });

  // convert the result object into array of values
  const resultArr = Object.values(result);



  const chartData = {
    labels: activeCategoryNameArr,
    datasets: [
      {
        label: "List of Categories",
        data: resultArr,
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[900],
          tailwindConfig().theme.colors.indigo[300],
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.red[900],
          tailwindConfig().theme.colors.red[300],
          tailwindConfig().theme.colors.red[600],
          tailwindConfig().theme.colors.blue[900],
          tailwindConfig().theme.colors.blue[300],
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.yellow[900],
          tailwindConfig().theme.colors.yellow[300],
          tailwindConfig().theme.colors.yellow[600],
          tailwindConfig().theme.colors.green[900],
          tailwindConfig().theme.colors.green[300],
          tailwindConfig().theme.colors.green[600],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[300],
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.indigo[900],
          tailwindConfig().theme.colors.red[300],
          tailwindConfig().theme.colors.red[600],
          tailwindConfig().theme.colors.red[900],
          tailwindConfig().theme.colors.blue[300],
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.blue[900],
          tailwindConfig().theme.colors.yellow[300],
          tailwindConfig().theme.colors.yellow[600],
          tailwindConfig().theme.colors.yellow[900],
          tailwindConfig().theme.colors.green[300],
          tailwindConfig().theme.colors.green[600],
          tailwindConfig().theme.colors.green[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">List of Categories</h2>
      </header>

      {isLoading === true ? (
        <div className="flex flex-col px-5 py-2">
          <Skeleton variant="rectangular" height={220} />
          <Skeleton variant="text" height={120} />
        </div>
      ) : (
        <>
          {/* Chart built with Chart.js 3 */}
          {/* Change the height attribute to adjust the chart height */}

          <DoughnutChart data={chartData} width={389} height={260} />
        </>
      )}
    </div>
  );
}

export default DashboardCard06;
