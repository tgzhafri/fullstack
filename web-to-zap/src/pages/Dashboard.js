import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// import Loader from "react-loader-spinner";
import { Skeleton } from "@mui/material";

import {
  fetchDashboard,
  pendingTaskCountGroupByDate,
  completeTaskCountGroupByDate,
} from "../reducers/dashboardReducer";
import {
  fetchCompleteTaskCountGroupByCategory,
  fetchPendingTaskCountGroupByCategory,
} from "../reducers/categoryReducer";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";

import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard0402 from "../partials/dashboard/DashboardCard04_2";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard0702 from "../partials/dashboard/DashboardCard07_2";

function Dashboard() {
  const token = useSelector((state) => state.users.token);
  const isLoading = useSelector((state) => state.dashboard.isLoading);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.users.items.id);

  useEffect(() => {
    if (token.length === 0) {
      navigate("/");
    } else {
      const input = {
        token: token,
        user_id: user_id,
      };
      console.log("dashboard input?", input);
      dispatch(fetchDashboard(input));
      dispatch(pendingTaskCountGroupByDate(input));
      dispatch(completeTaskCountGroupByDate(input));
      dispatch(fetchPendingTaskCountGroupByCategory(input));
      dispatch(fetchCompleteTaskCountGroupByCategory(input));
    }
  }, [token, user_id, navigate, dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      {isLoading === true ? (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              <WelcomeBanner />
              {/* Cards */}
              <div className="grid grid-cols-12 gap-6">
                {/* Bar chart (Pending) - DashboardCard04*/}
                <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                  <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">
                      Pending Tasks
                    </h2>
                  </header>

                  <div className="flex flex-col px-5 py-2">
                    <Skeleton variant="text" height={75} />
                    <Skeleton variant="rectangular" height={200} />
                  </div>
                </div>
                {/* Bar chart (Completed) - DashboardCard04 */}
                <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
                  <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">
                      Pending Tasks
                    </h2>
                  </header>

                  <div className="flex flex-col px-5 py-2">
                    <Skeleton variant="text" height={75} />
                    <Skeleton variant="rectangular" height={200} />
                  </div>
                </div>
                {/* Doughnut chart (List of categories) - DashboardCard06 */}
                <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
                  <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">
                      List of Categories
                    </h2>
                  </header>
                  <div className="flex flex-col px-5 py-2">
                    <Skeleton variant="rectangular" height={220} />
                    <Skeleton variant="text" height={120} />
                  </div>
                </div>
                {/* Table (Category Details)  - DashboardCard07*/}
                <div className="flex flex-col col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
                  <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">
                      Pending Task Category Details
                    </h2>
                  </header>
                  <div className="flex flex-col px-5 py-2">
                    <Skeleton variant="rectangular" height={320} />
                    <Skeleton variant="text" height={80} />
                  </div>
                </div>
                {/* <DashboardCard0702 /> */}
                <div className="flex flex-col col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
                  <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">
                      Completed Task Category Details
                    </h2>
                  </header>
                  <div className="flex flex-col px-5 py-2">
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton variant="text" height={80} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              <WelcomeBanner />
              {/* Cards */}
              <div className="grid grid-cols-12 gap-6">
                {/* Bar chart (Pending) */}
                <DashboardCard04 />
                {/* Bar chart (Completed) */}
                <DashboardCard0402 />
                {/* Doughnut chart (List of categories) */}
                <DashboardCard06 />
                {/* Table (Category Details) */}
                <DashboardCard07 />
                <DashboardCard0702 />
                {/* Card (Tasks) */}
                {/* <DashboardCard10 /> */}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
