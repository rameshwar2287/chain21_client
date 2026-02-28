// // /* eslint-disable react/prop-types */
// // import { useState, useMemo } from "react";
// // import * as XLSX from "xlsx";
// // import Pagination from "./Pagination";
// // import { extractText } from "../../../utils/helper";

// // const DataTable = ({
// //   title,
// //   columns,
// //   data,
// //   pageSize = 10,
// //   dropdownFilters = [],
// // }) => {
// //   const [filters, setFilters] = useState({});
// //   const [filter, setFilter] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const renderDropdownFilters = () => {
// //     return dropdownFilters.map((filterItem) => (
// //       <div
// //         className="flex flex-col text-hero-primary text-sm w-full md:w-auto"
// //         key={filterItem.accessor}
// //       >
// //         <label className="mb-1">{filterItem.label}</label>
// //         <select
// //           className="input-field border border-delft-blue rounded px-2 py-1"
// //           value={filters[filterItem.accessor] || "all"}
// //           onChange={(e) =>
// //             setFilters((prev) => ({
// //               ...prev,
// //               [filterItem.accessor]: e.target.value,
// //             }))
// //           }
// //         >
// //           <option value="all">All</option>
// //           {filterItem.options.map((opt) => (
// //             <option key={opt.value} value={opt.value}>
// //               {opt.label}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //     ));
// //   };

// //   // Pehle data ko filter karein
// //   const filteredData = useMemo(() => {
// //     let filtered = data;

// //     // Apply text search filter
// //     if (filter) {
// //       const lowerCaseFilter = filter.toLowerCase();
// //       filtered = filtered?.filter((row) =>
// //         columns?.some((column) => {
// //           const content = column.searchValue
// //             ? column.searchValue(row)
// //             : row[column.accessor]?.toString();
// //           return content?.toLowerCase().includes(lowerCaseFilter);
// //         })
// //       );
// //     }

// //     // Apply dropdown filters
// //     Object.entries(filters).forEach(([accessor, selected]) => {
// //       if (selected === "all") return;

// //       filtered = filtered.filter((row) => {
// //         const col = columns.find((c) => c.accessor === accessor);
// //         const content = col?.searchValue
// //           ? col.searchValue(row)
// //           : row[accessor]?.toString().toLowerCase();

// //         return content === selected;
// //       });
// //     });

// //     return filtered;
// //   }, [data, filter, filters, columns]);

// //   // 3. Ab filtered data par pagination lagayein
// //   const totalPages = Math.ceil(filteredData?.length / pageSize);
// //   const paginatedData = useMemo(() => {
// //     const startIndex = (currentPage - 1) * pageSize;
// //     return filteredData?.slice(startIndex, startIndex + pageSize);
// //   }, [filteredData, currentPage, pageSize]);
// //   const exportToExcel = (rows) => {
// //     const formattedData = rows.map((row, index) => {
// //       const obj = {};

// //       columns.forEach((col) => {
// //         if (col.exportable === false) return; // ⛔️ Skip non-exportable columns

// //         let rawValue;
// //         if (col.cell) {
// //           try {
// //             rawValue = col.cell(row, index);
// //           } catch {
// //             rawValue = row[col.accessor];
// //           }
// //         } else {
// //           rawValue = row[col.accessor];
// //         }

// //         obj[col.header] = extractText(rawValue);
// //       });

// //       return obj;
// //     });

// //     const worksheet = XLSX.utils.json_to_sheet(formattedData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// //     XLSX.writeFile(workbook, `${title || "data"}.xlsx`);
// //   };

// //   return (
// //     <div className="card hero-glass border border-glass-border rounded-2xl p-6">
// //       <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
// //         <h2 className="text-xl font-semibold text-hero-primary">{title}</h2>

// //         {/* Search + Export Button container */}
// //         <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4">
// //           <div className="relative">
// //             <input
// //               type="text"
// //               placeholder="Search table..."
// //               value={filter}
// //               onChange={(e) => setFilter(e.target.value)}
// //               className="w-full sm:w-64 input-field border border-delft-blue rounded-full py-2 pl-10 pr-4 text-hero-primary placeholder-hero-secondary focus:outline-none focus:ring-2 focus:ring-chamoisee"
// //             />
// //           </div>

// //           {renderDropdownFilters()}

// //           {/* Export Button */}
// //           <button
// //             onClick={() => exportToExcel(filteredData)}
// //             className="btn-primary w-full md:w-auto text-sm font-medium px-4 py-2 rounded-full transition duration-200"
// //           >
// //             Export to Excel
// //           </button>
// //         </div>
// //       </div>

// //       <div className="overflow-x-auto">
// //         <table className="w-full text-left">
// //           <thead className="text-xs text-hero-secondary uppercase">
// //             <tr className="text-nowrap">
// //               {columns?.map((col) => (
// //                 <th key={col.accessor} className={`p-3 ${col.className || ""}`}>
// //                   {col.header}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody className="text-sm">
// //             {/* 4. Ab paginated data ko render karein */}
// //             {paginatedData?.map((row, rowIndex) => (
// //               <tr
// //                 key={rowIndex}
// //                 className="border-b border-delft-blue hover:bg-space-cadet/20 text-nowrap"
// //               >
// //                 {columns?.map((col) => (
// //                   <td
// //                     key={col.accessor}
// //                     className={`p-3 ${col.className || ""}`}
// //                   >
// //                     {col.cell ? col.cell(row, rowIndex) : row[col.accessor]}
// //                   </td>
// //                 ))}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //         {paginatedData?.length === 0 && (
// //           <p className="text-center text-hero-secondary py-8">No results found.</p>
// //         )}
// //       </div>

// //       {/* 5. Pagination component ko render karein agar ek se zyada page hain */}
// //       {totalPages > 1 && (
// //         <Pagination
// //           currentPage={currentPage}
// //           totalPages={totalPages}
// //           onPageChange={(page) => setCurrentPage(page)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default DataTable;

// /* eslint-disable react/prop-types */
// import { useState, useMemo } from "react";
// import * as XLSX from "xlsx";
// import Pagination from "./Pagination";
// import { extractText } from "../../../utils/helper";
// import { Search, Download, Filter } from "lucide-react";

// const DataTable = ({
//   title,
//   columns,
//   data,
//   pageSize = 10,
//   dropdownFilters = [],
// }) => {
//   const [filters, setFilters] = useState({});
//   const [filter, setFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const renderDropdownFilters = () => {
//     return dropdownFilters.map((filterItem) => (
//       <div className="flex flex-col w-full md:w-auto" key={filterItem.accessor}>
//         <label className="mb-1 text-[10px] font-bold text-[#B8860B] uppercase tracking-widest ml-1">
//           {filterItem.label}
//         </label>
//         <select
//           className="bg-[#050505] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#FFD700] transition-colors cursor-pointer"
//           value={filters[filterItem.accessor] || "all"}
//           onChange={(e) =>
//             setFilters((prev) => ({
//               ...prev,
//               [filterItem.accessor]: e.target.value,
//             }))
//           }
//         >
//           <option value="all">All Records</option>
//           {filterItem.options.map((opt) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     ));
//   };

//   const filteredData = useMemo(() => {
//     let filtered = data;
//     if (filter) {
//       const lowerCaseFilter = filter.toLowerCase();
//       filtered = filtered?.filter((row) =>
//         columns?.some((column) => {
//           const content = column.searchValue
//             ? column.searchValue(row)
//             : row[column.accessor]?.toString();
//           return content?.toLowerCase().includes(lowerCaseFilter);
//         })
//       );
//     }
//     Object.entries(filters).forEach(([accessor, selected]) => {
//       if (selected === "all") return;
//       filtered = filtered.filter((row) => {
//         const col = columns.find((c) => c.accessor === accessor);
//         const content = col?.searchValue
//           ? col.searchValue(row)
//           : row[accessor]?.toString().toLowerCase();
//         return content === selected;
//       });
//     });
//     return filtered;
//   }, [data, filter, filters, columns]);

//   const totalPages = Math.ceil(filteredData?.length / pageSize);
  
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredData?.slice(startIndex, startIndex + pageSize);
//   }, [filteredData, currentPage, pageSize]);

//   const exportToExcel = (rows) => {
//     const formattedData = rows.map((row, index) => {
//       const obj = {};
//       columns.forEach((col) => {
//         if (col.exportable === false) return;
//         let rawValue;
//         if (col.cell) {
//           try { rawValue = col.cell(row, index); } catch { rawValue = row[col.accessor]; }
//         } else { rawValue = row[col.accessor]; }
//         obj[col.header] = extractText(rawValue);
//       });
//       return obj;
//     });
//     const worksheet = XLSX.utils.json_to_sheet(formattedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, `${title || "data"}.xlsx`);
//   };

//   return (
//     <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
//       {/* Top Gold Accent Decoration */}
//       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-40"></div>

//       <div className="flex flex-col xl:flex-row justify-between xl:items-end mb-8 gap-6">
//         <div>
//           <h2 className="text-2xl font-bold font-rajdhani text-white uppercase tracking-wider">{title}</h2>
//           <p className="text-xs text-gray-500 mt-1">Immutable ledger data from blockchain</p>
//         </div>

//         <div className="flex flex-col md:flex-row items-end gap-4">
//           {/* Search Box */}
//           <div className="flex flex-col w-full md:w-auto">
//             <label className="mb-1 text-[10px] font-bold text-[#B8860B] uppercase tracking-widest ml-1">Search Records</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Find anything..."
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="w-full md:w-64 bg-[#050505] border border-[#2a2a2a] rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FFD700] transition-all"
//               />
//             </div>
//           </div>

//           {renderDropdownFilters()}

//           {/* Export Button - High Contrast Fix */}
//           <button
//             onClick={() => exportToExcel(filteredData)}
//             className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black text-xs font-black uppercase py-2.5 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 h-[38px] w-full md:w-auto min-w-[140px] cursor-pointer shadow-lg"
//           >
//             <Download size={16} strokeWidth={3} />
//             <span>EXPORT CSV</span>
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto custom-scrollbar">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b border-[#2a2a2a]">
//               {columns?.map((col) => (
//                 <th key={col.accessor} className={`p-4 text-[10px] font-bold text-[#B8860B] uppercase tracking-widest ${col.className || ""}`}>
//                   {col.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {paginatedData?.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 className="border-b border-[#1a1a1a] hover:bg-[#FFD700]/[0.02] transition-colors group"
//               >
//                 {columns?.map((col) => (
//                   <td
//                     key={col.accessor}
//                     className={`p-4 text-gray-300 group-hover:text-white transition-colors ${col.className || ""}`}
//                   >
//                     {col.cell ? col.cell(row, rowIndex) : row[col.accessor]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         {paginatedData?.length === 0 && (
//           <div className="flex flex-col items-center py-20 bg-[#050505]/50 rounded-b-2xl border border-dashed border-[#2a2a2a] mt-4">
//             <Filter size={40} className="text-[#2a2a2a] mb-4" />
//             <p className="text-gray-600 font-rajdhani uppercase tracking-widest text-sm">No encrypted records match your current filter</p>
//           </div>
//         )}
//       </div>

//       {totalPages > 1 && (
//         <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataTable;

/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";
import Pagination from "./Pagination";
import { extractText } from "../../../utils/helper";
import { Search, Download, Filter } from "lucide-react";

const DataTable = ({
  title,
  columns,
  data,
  pageSize = 10,
  dropdownFilters = [],
}) => {
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, filters]);

  const renderDropdownFilters = () => {
    return dropdownFilters.map((filterItem) => (
      <div className="flex flex-col w-full md:w-auto" key={filterItem.accessor}>
        <label className="mb-1 text-[10px] font-bold text-[#B8860B] uppercase tracking-widest ml-1">
          {filterItem.label}
        </label>
        <select
          className="bg-[#050505] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#FFD700] transition-colors cursor-pointer"
          value={filters[filterItem.accessor] || "all"}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              [filterItem.accessor]: e.target.value,
            }))
          }
        >
          <option value="all">All Records</option>
          {filterItem.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    ));
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    let filtered = [...data];

    // 1. Apply Filters
    if (filter) {
      const lowerCaseFilter = filter.toLowerCase().trim();
      filtered = filtered.filter((row) =>
        columns?.some((column) => {
          const content = column.searchValue
            ? column.searchValue(row)
            : row[column.accessor]?.toString();
          return content?.toLowerCase().includes(lowerCaseFilter);
        })
      );

      // 2. RELEVANCE SORTING: 
      // This ensures that if the search matches the 'id' or 'username' directly, 
      // it appears above sponsor matches.
      filtered.sort((a, b) => {
        const aId = a.id?.toString().toLowerCase() || "";
        const bId = b.id?.toString().toLowerCase() || "";
        
        const aMatch = aId.includes(lowerCaseFilter);
        const bMatch = bId.includes(lowerCaseFilter);

        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });
    }

    // 3. Apply Dropdown Filters
    Object.entries(filters).forEach(([accessor, selected]) => {
      if (selected === "all") return;
      filtered = filtered.filter((row) => {
        const col = columns.find((c) => c.accessor === accessor);
        const content = col?.searchValue
          ? col.searchValue(row)
          : row[accessor]?.toString().toLowerCase();
        return content === selected;
      });
    });

    return filtered;
  }, [data, filter, filters, columns]);

  const totalPages = Math.ceil(filteredData?.length / pageSize);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData?.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const exportToExcel = (rows) => {
    const formattedData = rows.map((row, index) => {
      const obj = {};
      columns.forEach((col) => {
        if (col.exportable === false) return;
        let rawValue;
        if (col.cell) {
          try { rawValue = col.cell(row, index); } catch { rawValue = row[col.accessor]; }
        } else { rawValue = row[col.accessor]; }
        obj[col.header] = extractText(rawValue);
      });
      return obj;
    });
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${title || "data"}.xlsx`);
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-40"></div>

      <div className="flex flex-col xl:flex-row justify-between xl:items-end mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-bold font-rajdhani text-white uppercase tracking-wider">{title}</h2>
          <p className="text-xs text-gray-500 mt-1">Immutable ledger data from blockchain</p>
        </div>

        <div className="flex flex-col md:flex-row items-end gap-4">
          <div className="flex flex-col w-full md:w-auto">
            <label className="mb-1 text-[10px] font-bold text-[#B8860B] uppercase tracking-widest ml-1">Search Records</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Find User ID or Sponsor..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full md:w-64 bg-[#050505] border border-[#2a2a2a] rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#FFD700] transition-all"
              />
            </div>
          </div>

          {renderDropdownFilters()}

          <button
            onClick={() => exportToExcel(filteredData)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black text-xs font-black uppercase py-2.5 px-6 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 h-[38px] w-full md:w-auto min-w-[140px] cursor-pointer shadow-lg"
          >
            <Download size={16} strokeWidth={3} />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#2a2a2a]">
              {columns?.map((col) => (
                <th key={col.accessor} className={`p-4 text-[10px] font-bold text-[#B8860B] uppercase tracking-widest text-left ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {paginatedData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-[#1a1a1a] hover:bg-[#FFD700]/[0.02] transition-colors group"
              >
                {columns?.map((col) => (
                  <td
                    key={col.accessor}
                    className={`p-4 text-gray-300 group-hover:text-white transition-colors ${col.className || ""}`}
                  >
                    {col.cell ? col.cell(row, rowIndex) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {paginatedData?.length === 0 && (
          <div className="flex flex-col items-center py-20 bg-[#050505]/50 rounded-b-2xl border border-dashed border-[#2a2a2a] mt-4">
            <Filter size={40} className="text-[#2a2a2a] mb-4" />
            <p className="text-gray-600 font-rajdhani uppercase tracking-widest text-sm">No records found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;