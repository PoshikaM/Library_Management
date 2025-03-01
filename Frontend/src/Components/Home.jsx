// import { Link } from "react-router-dom";
// import Sidebar from "./SideNav";

// function Home() {
//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
//       <Sidebar/>
//       <div className="flex-1 ml-50 p-6">
//         <h1 className="text-4xl font-bold text-white mb-6">
//           Welcome to the Library Management System
//         </h1>

//         <div className="grid grid-cols-3 gap-6">
//           {[
//             { path: "/top-borrowed-books", label: "Top 3 Borrowed Books" },
//             { path: "/outstanding-books", label: "Outstanding Books" },
//             { path: "/never-borrowed-books", label: "Never Borrowed Books" },
//           ].map((item, index) => (
//             <Link key={index} to={item.path}>
//               <div className="bg-white text-gray-800 p-5 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
//                 <h2 className="text-lg font-semibold">{item.label}</h2>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="grid grid-cols-3 gap-6 mt-8">
//           {[
//             { path: "/manageBooks", label: "Manage Books" },
//             { path: "/manageMembers", label: "Manage Members" },
//             { path: "/manageIssuance", label: "Manage Issuance" },
//           ].map((item, index) => (
//             <Link key={index} to={item.path}>
//               <div className="bg-white text-gray-800 p-5 rounded-lg shadow-md text-center transition-transform transform hover:scale-105">
//                 <h2 className="text-lg font-semibold">{item.label}</h2>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <img
//           className="mt-10 rounded-lg shadow-lg w-full max-h-96 object-cover"
//           src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
//           alt="Library"
//         />
//       </div>
//     </div>
//   );
// }

// export default Home;

import { Link } from "react-router-dom";
import Sidebar from "./SideNav";

function Home() {
  return (
    <div className="flex h-screen overflow-hidden ml-50 mr-0">
      {/* Sidebar (fixed width) */}
      <Sidebar />

      {/* Main Content (fills remaining space) */}
      <div className="flex-1 p-6 bg-gradient-to-r from-blue-500 to-green-500 overflow-auto">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to the Library Management System
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {[
            { path: "/top-borrowed-books", label: "Top 3 Borrowed Books" },
            { path: "/outstanding-books", label: "Outstanding Books" },
            { path: "/never-borrowed-books", label: "Never Borrowed Books" },
          ].map((item, index) => (
            <Link key={index} to={item.path}>
              <div className="bg-white text-gray-800 p-5 rounded-lg shadow-md text-center transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold">{item.label}</h2>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { path: "/manageBooks", label: "Manage Books" },
            { path: "/manageMembers", label: "Manage Members" },
            { path: "/manageIssuance", label: "Manage Issuance" },
          ].map((item, index) => (
            <Link key={index} to={item.path}>
              <div className="bg-white text-gray-800 p-5 rounded-lg shadow-md text-center transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold">{item.label}</h2>
              </div>
            </Link>
          ))}
        </div>

        <img
          className="mt-10 rounded-lg shadow-lg w-full max-h-96 object-cover"
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Library"
        />
      </div>
    </div>
  );
}

export default Home;
