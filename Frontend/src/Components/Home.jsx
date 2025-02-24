import { Link } from "react-router-dom";
import Sidebar from "./SideNav";

function Home() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content - Shifted Right */}
      <div className="flex-1 ml-64 p-5">
        <h1 className="text-3xl font-bold">Welcome to the Library Management System</h1>

        <div className="container mx-auto p-4">
            {/* <h2 className="text-2xl font-bold mb-4">Four Equal Columns</h2> */}
            <div className="grid grid-cols-4 gap-8 mt-10">
                <Link to="/book">
                    <div className="bg-gray-400 p-4 h-48">
                        <h2 className="text-lg font-semibold">Books</h2>
                        {/* <p>Some text..</p> */}
                    </div>
                </Link>
                <Link to="/member">
                    <div className="bg-gray-500 p-4 h-48">
                        <h2 className="text-lg font-semibold">Members</h2>
                        {/* <p>Some text..</p> */}
                    </div>
                </Link>
                <Link to='/issuance'>
                    <div className="bg-gray-300 p-4 h-48">
                        <h2 className="text-lg font-semibold">Issuance</h2>
                        {/* <p>Some text..</p> */}
                    </div>
                </Link>
                <Link to='/taskDetails'>
                    <div className="bg-gray-200 p-4 h-48">
                        <h2 className="text-lg font-semibold">Task Details</h2>
                    </div>
                </Link>
            </div>
        </div>
        <img className="mt-10" src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
      </div>
    </div>
  );
}

export default Home;
