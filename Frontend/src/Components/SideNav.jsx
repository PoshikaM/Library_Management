// import { Link } from "react-router-dom";

// function Sidebar() {
//     return (
//       <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5">
//         {/* Sidebar Title */}
//         <h1 className="text-xl font-bold mb-6 p-7">Library Management</h1>
  
//         {/* Sidebar Links */}
//         <ul className="space-y-4">
//           <Link to='/member'>
//             <li className="hover:bg-gray-700 p-4 rounded-md cursor-pointer">Members</li>
//           </Link>
//           <Link to='book'>
//             <li className="hover:bg-gray-700 p-4 rounded-md cursor-pointer">Books</li>
//           </Link>
//           <Link to='issuance'>
//             <li className="hover:bg-gray-700 p-4 rounded-md cursor-pointer">Issuance</li>
//           </Link>
//         </ul>
//       </div>
//     );
//   }
  
// export default Sidebar;

// import { Link } from "react-router-dom";
// import { Users, Book, ClipboardList } from "lucide-react";

// function Sidebar() {
//   return (
//     <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 shadow-lg">
//       {/* Sidebar Title */}
//       <h1 className="text-2xl font-bold mb-8 text-center">Library Management</h1>

//       {/* Sidebar Links */}
//       <ul className="space-y-3">
//         <Link to="/member">
//           <li className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer">
//             <Users size={20} />
//             <span>Members</span>
//           </li>
//         </Link>
//         <Link to="/book">
//           <li className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer">
//             <Book size={20} />
//             <span>Books</span>
//           </li>
//         </Link>
//         <Link to="/issuance">
//           <li className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer">
//             <ClipboardList size={20} />
//             <span>Issuance</span>
//           </li>
//         </Link>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

import { Link } from "react-router-dom";
import { Users, Book, ClipboardList } from "lucide-react";

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">Library Management</h1>

      <ul className="space-y-3">
        <Link to="/member">
          <li className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer">
            <Users size={20} />
            <span>Members</span>
          </li>
        </Link>
        <Link to="/book">
          <li className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer">
            <Book size={20} />
            <span>Books</span>
          </li>
        </Link>
        <Link to="/issuance">
          <li className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer">
            <ClipboardList size={20} />
            <span>Issuance</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
