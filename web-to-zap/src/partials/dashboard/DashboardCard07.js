import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

function DashboardCard07() {
  const isLoading = useSelector((state) => state.dashboard.isLoading);
  const pending = useSelector((state) => state.categories.pending.taskCount);

  // console.log("pending?", pending);
  // console.log("completed", completed);

  // const pendingCountArr = pending.map((item) => item.count);
  // const sum = pendingCountArr.reduce((partial_sum, a) => partial_sum + a, 0);
  // console.log("pending count", sum);
  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">
          Pending Task Category Details
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">
                    Category List Name
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Pending Tasks Count
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Category ID</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {isLoading === true ? (
              <tbody>
                <tr>
                  <td className="p-2">
                    <Skeleton variant="rectangular" height={250} />
                  </td>
                  <td className="p-2">
                    <Skeleton variant="rectangular" height={250} />
                  </td>
                  <td className="p-2">
                    <Skeleton variant="rectangular" height={250} />
                  </td>
                </tr>
              </tbody>
            ) : (
              <>
                <tbody className="text-sm font-medium divide-y divide-gray-100">
                  {/* Row */}

                  {pending !== undefined ? (
                    pending.map((item, i) => (
                      <tr key={i}>
                        <td className="p-2">
                          <div className="flex items-center">
                            <div className="text-gray-800">
                              {item.category_name}
                            </div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-green-500">
                            {item.count}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-light-blue-500">
                            {item.category_id}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-gray-500">
                      <td className="p-2 ">
                        <div className="flex items-center">
                          <div className="text-gray-800">N/A</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-green-500">N/A</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-light-blue-500">
                          N/A
                        </div>
                      </td>
                    </tr>
                  )}
                  {/* Row Ends */}
                </tbody>
                {/* Row TOTAL starts */}
                <thead className="text-sm uppercase font-bold text-gray-700 bg-gray-200 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">TOTAL COUNT</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        {pending !== undefined ? (
                          pending
                            .map((item) => item.count)
                            .reduce((partial_sum, a) => partial_sum + a, 0)
                        ) : (
                          <></>
                        )}
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">-</div>
                    </th>
                  </tr>
                </thead>
                {/* Row TOTAL ends */}
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
