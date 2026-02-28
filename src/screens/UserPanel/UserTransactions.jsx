// import React, { useEffect, useState } from "react";
// import { setLoading } from "../../redux/slices/loadingSlice";
// import DataTable from "../../components/Screen/UserPanel/DataTable";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { NumberFormatCommas } from "../../utils/FormatText";
// import { useLocation } from "react-router-dom";
// import { isToday } from "../../utils/helper";
// import { getAllUserTransactions } from "../../api/user.api";

// const UserTransactions = () => {
//   const [allTransactions, setAllTransactions] = useState([]);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const data = location?.state;
//   const fetchAllTransactions = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await getAllUserTransactions();
//       if(response?.success){
//         // Ensure data is always an array
//         const transactionsData = Array.isArray(response?.data) 
//           ? response?.data 
//           : Array.isArray(response?.data?.transactions) 
//           ? response?.data?.transactions 
//           : Array.isArray(response?.data?.history)
//           ? response?.data?.history
//           : [];
//         setAllTransactions(transactionsData);
//       } else {
//         toast.error(response?.message || "Something went wrong");
//         setAllTransactions([]);
//       }
//     } catch (err) {
//       console.log(err);
//       setAllTransactions([]);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
//   useEffect(() => {
//     fetchAllTransactions();
//   }, []);

//   const filteredIncomeHistory =
//   data === "today" && Array.isArray(allTransactions)
//     ? allTransactions.filter((item) => isToday(new Date(item.createdAt)))
//     : Array.isArray(allTransactions) ? allTransactions : [];

//   const columns = [
//     {
//       header: "User Id",
//       accessor: "id",
//       cell: (row) => <span className="font-medium text-white">{row?._id}</span>,
//     },
//     {
//       header: "Wallet Address",
//       accessor: "id",
//       cell: (row) => <span className="font-medium text-white">{row?._id}</span>,
//     },
//     {
//       header: "Transaction ID",
//       accessor: "id",
//       cell: (row) => <span className="font-medium text-white">{row?._id}</span>,
//     },
//     {
//       header: "Type",
//       accessor: "type",
//       cell: (row) => <span className="text-slate-300">{row?.type}</span>,
//     },
//     {
//       header: "Amount",
//       accessor: "amount",
//       cell: (row) => {
//         return row?.type === "investment" ? (
//           <span className="font-semibold text-green-400">
//             <NumberFormatCommas value={row?.amount} />
//           </span>
//         ) : (
//           <span className="font-semibold text-red-400">
//             <NumberFormatCommas value={row?.investment} />
//           </span>
//         );
//       },
//     },

//     {
//       header: "Date",
//       accessor: "date",
//       cell: (row) => (
//         <span className="text-slate-300">
//           {new Date(row?.createdAt)?.toLocaleDateString()}
//         </span>
//       ),
//     },
//     {
//       header: "Status",
//       accessor: "status",
//       className: "text-center",
//       cell: (row) => {
//         return row.status === "Processing" ? (
//           <span className="px-2 py-1 text-xs font-semibold text-yellow-200 bg-yellow-500/20 rounded-full">
//             {row.status}
//           </span>
//         ) : row.status === "Cancelled" ? (
//           <span className="px-2 py-1 text-xs font-semibold text-red-200 bg-red-500/20 rounded-full">
//             {row.status}
//           </span>
//         ) : (
//           <span className="px-2 py-1 text-xs font-semibold text-green-200 bg-green-500/20 rounded-full">
//             {row.status}
//           </span>
//         );
//       },
//     },
//   ];
//   return (
//     <DataTable
//       title="All Transactions"
//       columns={columns}
//       data={filteredIncomeHistory}
//       pageSize={10}
//     />
//   );
// };

// export default UserTransactions;


import React, { useEffect, useState } from "react";
import { setLoading } from "../../redux/slices/loadingSlice";
import DataTable from "../../components/Screen/UserPanel/DataTable";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { NumberFormatCommas } from "../../utils/FormatText";
import { useLocation } from "react-router-dom";
import { isToday } from "../../utils/helper";
import { getAllUserTransactions } from "../../api/user.api";

const UserTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state;

  const fetchAllTransactions = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUserTransactions();
      
      if (response?.success) {
        // Updated logic to extract the transactions array correctly from your response structure
        const transactionsData = response?.data?.transactions || 
                                response?.data?.history || 
                                (Array.isArray(response?.data) ? response?.data : []);
        
        setAllTransactions(transactionsData);
      } else {
        toast.error(response?.message || "Something went wrong");
        setAllTransactions([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setAllTransactions([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  // Filter logic for "Today" view
  const filteredIncomeHistory =
    data === "today" && Array.isArray(allTransactions)
      ? allTransactions.filter((item) => isToday(new Date(item.createdAt)))
      : Array.isArray(allTransactions) 
      ? allTransactions 
      : [];

  const columns = [
    {
      header: "User Id",
      accessor: "user.id",
      cell: (row) => (
        <span className="font-medium text-white">
          {row?.user?.id || "N/A"}
        </span>
      ),
    },
    {
      header: "Wallet Address",
      accessor: "user.account",
      cell: (row) => (
        <span className="font-mono text-xs text-slate-300 break-all max-w-[150px] block">
          {row?.user?.account || "N/A"}
        </span>
      ),
    },
    {
      header: "Transaction ID",
      accessor: "_id",
      cell: (row) => (
        <span className="text-xs text-slate-400">
          {row?._id?.substring(0, 12)}...
        </span>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row) => (
        <span className={`text-sm font-medium ${row?.type === 'Deposit' ? 'text-blue-400' : 'text-purple-400'}`}>
          {row?.type}
        </span>
      ),
    },
    {
      header: "Amount",
      accessor: "investment",
      cell: (row) => {
        // Determine value based on your schema fields
        const value = row?.investment || row?.amount || 0;
        const isPositive = row?.type === "Deposit" || row?.type === "investment";
        
        return (
          <span className={`font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? "+" : "-"}$<NumberFormatCommas value={value} />
          </span>
        );
      },
    },
    {
      header: "Date",
      accessor: "createdAt",
      cell: (row) => (
        <span className="text-slate-300">
          {row?.createdAt ? new Date(row?.createdAt).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      className: "text-center",
      cell: (row) => {
        const status = row?.status || "Success";
        const getStatusStyles = (stat) => {
          switch (stat) {
            case "Processing": return "text-yellow-200 bg-yellow-500/20";
            case "Cancelled": return "text-red-200 bg-red-500/20";
            default: return "text-green-200 bg-green-500/20";
          }
        };

        return (
          <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${getStatusStyles(status)}`}>
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <DataTable
        title="Team Transaction History"
        columns={columns}
        data={filteredIncomeHistory}
        pageSize={10}
      />
    </div>
  );
};

export default UserTransactions;