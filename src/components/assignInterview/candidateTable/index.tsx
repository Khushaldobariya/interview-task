
// "use client";
// import { CANDIDATE, columns } from "@/constant";
// import { Card, CardBody } from "@heroui/card";
// import {
//   getKeyValue,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@heroui/table";
// import { Tab, Tabs } from "@heroui/tabs";
// import { Pagination } from "@heroui/pagination";
// import React, { useState, useEffect, useMemo } from "react";

// interface Candidate {
//   key: string;
//   name: string;
//   email: string;
//   phone: string;
//   specialty: string;
//   date: string;
//   status: "Pending" | "Scheduled" | "Completed" | "Cancelled";
// }

// interface TabItem {
//   id: "Pending" | "Scheduled" | "Completed" | "Cancelled";
//   label: string;
// }

// interface CandidateTableProps {
//   searchCriteria: string;
// }

// const CandidateTable: React.FC<CandidateTableProps> = ({ searchCriteria }) => {
//   const [selectedStatus, setSelectedStatus] = useState<
//     "Pending" | "Scheduled" | "Completed" | "Cancelled"
//   >("Scheduled");

//   const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     const filtered = CANDIDATE.filter((candidate) => {
//       // Check if the candidate matches the selected status
//       const statusMatch = candidate.status === selectedStatus;

//       // Check if the candidate matches the search criteria in any field
//       const searchMatch =
//         candidate.name.toLowerCase().includes(searchCriteria.toLowerCase()) ||
//         candidate.email.toLowerCase().includes(searchCriteria.toLowerCase()) ||
//         candidate.phone.toLowerCase().includes(searchCriteria.toLowerCase()) ||
//         candidate.specialty.toLowerCase().includes(searchCriteria.toLowerCase()) ||
//         candidate.date.toLowerCase().includes(searchCriteria.toLowerCase()) ||
//         candidate.key.toLowerCase().includes(searchCriteria.toLowerCase());

//       return statusMatch && searchMatch;
//     });

//     setFilteredCandidates(filtered as Candidate[]);
//     setCurrentPage(1); // Reset to the first page when the status or search criteria changes
//   }, [selectedStatus, searchCriteria]);

//   const pages = Math.ceil(filteredCandidates.length / rowsPerPage);

//   const items = useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return filteredCandidates.slice(start, end);
//   }, [page, filteredCandidates]);

//   const getTabsWithCount = (candidates: Candidate[]): TabItem[] => {
//     const count = candidates.reduce(
//       (acc, item) => {
//         acc[item.status] += 1;
//         return acc;
//       },
//       { Pending: 0, Scheduled: 0, Completed: 0, Cancelled: 0 }
//     );

//     return [
//       { id: "Pending", label: `Pending (${count.Pending})` },
//       { id: "Scheduled", label: `Scheduled (${count.Scheduled})` },
//       { id: "Completed", label: `Completed (${count.Completed})` },
//       { id: "Cancelled", label: `Cancelled (${count.Cancelled})` },
//     ];
//   };

//   const tabs = getTabsWithCount(CANDIDATE as Candidate[]);

//   const handlePageChange = (page: number) => {
//     setPage(page);
//   };

//   return (
//     <div className="flex w-full flex-col">
//       <Tabs
//         aria-label="Dynamic tabs"
//         items={tabs}
//         selectedKey={selectedStatus}
//         color="secondary"
//         onSelectionChange={(key) =>
//           setSelectedStatus(
//             key as "Pending" | "Scheduled" | "Completed" | "Cancelled"
//           )
//         }
//       >
//         {(item) => (
//           <Tab key={item.id} title={item.label}>
//             <Table
//               aria-label="Candidate table"
//               bottomContent={
//                 <div className="flex w-full justify-center">
//                   <Pagination
//                     isCompact
//                     showControls
//                     showShadow
//                     color="secondary"
//                     page={page}
//                     total={pages}
//                     onChange={(page) => setPage(page)}
//                   />
//                 </div>
//               }
//             >
//               <TableHeader columns={columns}>
//                 {(column) => (
//                   <TableColumn key={column.key}>{column.label}</TableColumn>
//                 )}
//               </TableHeader>
//               <TableBody items={items}>
//                 {(item) => (
//                   <TableRow key={item.key}>
//                     {(columnKey) => (
//                       <TableCell>{getKeyValue(item, columnKey)}</TableCell>
//                     )}
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </Tab>
//         )}
//       </Tabs>
//     </div>
//   );
// };

// export default CandidateTable;
"use client";
import { CANDIDATE, columns } from "@/constant";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Tab, Tabs } from "@heroui/tabs";
import { Pagination } from "@heroui/pagination";
import React, { useState, useEffect, useMemo } from "react";

interface Candidate {
  key: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  date: string;
  status: "Pending" | "Scheduled" | "Completed" | "Cancelled";
}

interface TabItem {
  id: "Pending" | "Scheduled" | "Completed" | "Cancelled";
  label: string;
}

interface SearchCriteria {
  candidateName: string;
  email: string;
  candidateId: string;
  phoneNumber: string;
  specialty: string;
}

interface CandidateTableProps {
  searchCriteria: SearchCriteria;
}

const CandidateTable: React.FC<CandidateTableProps> = ({ searchCriteria }) => {
  const [selectedStatus, setSelectedStatus] = useState<
    "Pending" | "Scheduled" | "Completed" | "Cancelled"
  >("Scheduled");

  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    console.log("Search Criteria:", searchCriteria);

    const filtered = CANDIDATE.filter((candidate) => {
      const statusMatch = candidate.status === selectedStatus;

      const searchMatch =
        (searchCriteria.candidateName === "" ||
          candidate.name.toLowerCase().includes(searchCriteria.candidateName.toLowerCase())) &&
        (searchCriteria.email === "" ||
          candidate.email.toLowerCase().includes(searchCriteria.email.toLowerCase())) &&
        (searchCriteria.phoneNumber === "" ||
          candidate.phone.toLowerCase().includes(searchCriteria.phoneNumber.toLowerCase())) &&
        (searchCriteria.specialty === "" ||
          candidate.specialty.toLowerCase().includes(searchCriteria.specialty.toLowerCase())) &&
        (searchCriteria.candidateId === "" ||
          candidate.key.toLowerCase().includes(searchCriteria.candidateId.toLowerCase()));

      return statusMatch && searchMatch;
    });

    console.log("Filtered Candidates:", filtered);
    setFilteredCandidates(filtered as Candidate[]);
  }, [selectedStatus, searchCriteria]);

  const pages = Math.ceil(filteredCandidates.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredCandidates.slice(start, end);
  }, [page, filteredCandidates]);

  const getTabsWithCount = (candidates: Candidate[]): TabItem[] => {
    const count = candidates.reduce(
      (acc, item) => {
        acc[item.status] += 1;
        return acc;
      },
      { Pending: 0, Scheduled: 0, Completed: 0, Cancelled: 0 }
    );

    return [
      { id: "Pending", label: `Pending (${count.Pending})` },
      { id: "Scheduled", label: `Scheduled (${count.Scheduled})` },
      { id: "Completed", label: `Completed (${count.Completed})` },
      { id: "Cancelled", label: `Cancelled (${count.Cancelled})` },
    ];
  };

  const tabs = getTabsWithCount(CANDIDATE as Candidate[]);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        selectedKey={selectedStatus}
        color="secondary"
        onSelectionChange={(key) =>
          setSelectedStatus(
            key as "Pending" | "Scheduled" | "Completed" | "Cancelled"
          )
        }
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Table
              aria-label="Candidate table"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default CandidateTable;