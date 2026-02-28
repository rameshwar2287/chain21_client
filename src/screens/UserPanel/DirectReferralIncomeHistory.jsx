import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { setLoading } from "../../redux/slices/loadingSlice";
import { getAllUserDirectReferralIncomeHistory } from "../../api/user.api";
import { maskWalletAddress } from "../../utils/additionalFunc";

const DirectReferralIncomeHistory = () => {
  const dispatch = useDispatch();
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchIncomeHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUserDirectReferralIncomeHistory();
      if (response?.success) {
        setIncomeHistory(response?.data?.history || []);
        setTotalIncome(response?.data?.totalIncome || 0);
        setTodayTotal(response?.data?.todayTotal || 0);
      } else {
        toast.error(response?.message || "Failed to fetch income history");
        setIncomeHistory([]);
      }
    } catch (err) {
      toast.error("Failed to fetch direct referral income history");
      setIncomeHistory([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchIncomeHistory();
  }, []);

  const columns = [
    {
      header: "S/N",
      accessor: "_id",
      cell: (_, rowIndex) => (
        <span className="font-medium text-white">
          {rowIndex + 1 + (currentPage - 1) * pageSize}
        </span>
      ),
    },
    {
      header: "From User",
      accessor: "fromUser.username",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.fromUser?.username || "-"}
        </span>
      ),
    },
    {
      header: "From User ID",
      accessor: "fromUser.id",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.fromUser?.id || "-"}
        </span>
      ),
    },
    {
      header: "Wallet Address",
      accessor: "fromUser.account",
      cell: (row) => (
        <span className="font-medium text-white">
          {maskWalletAddress(row?.fromUser?.account) || "-"}
        </span>
      ),
    },
    {
      header: "Income Amount",
      accessor: "income",
      cell: (row) => (
        <span className="font-medium text-green-400">
          ${row?.income?.toFixed(2) || "0.00"}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "createdAt",
      cell: (row) => (
        <span className="text-slate-300">
          {new Date(row?.createdAt).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5 mt-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Direct Referral Income</p>
              <p className="text-3xl font-bold text-white mt-2">
                ${totalIncome?.toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="bg-green-500/20 p-4 rounded-full">
              <i className="fa-solid fa-users text-green-400 text-2xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Today's Direct Referral Income</p>
              <p className="text-3xl font-bold text-white mt-2">
                ${todayTotal?.toFixed(2) || "0.00"}
              </p>
            </div>
            <div className="bg-blue-500/20 p-4 rounded-full">
              <i className="fa-solid fa-calendar-day text-blue-400 text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        title="Direct Referral Income History"
        columns={columns}
        data={incomeHistory}
        totalCount={incomeHistory.length}
        pageSize={pageSize}
      />
    </div>
  );
};

export default DirectReferralIncomeHistory;
