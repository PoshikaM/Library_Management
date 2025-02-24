function Sidebar() {
    return (
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5">
        {/* Sidebar Title */}
        <h2 className="text-xl font-bold mb-6">Menu</h2>
  
        {/* Sidebar Links */}
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">About</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Services</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Clients</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Contact</li>
        </ul>
      </div>
    );
  }
  
export default Sidebar;