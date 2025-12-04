import React from "react";

const Sidebar = (): React.JSX.Element => {
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        <i className="fas fa-bookmark mr-2"></i> Bookmark Property
      </button>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        <i className="fas fa-share mr-2"></i> Share Property
      </button>
    </>
  );
};

export default Sidebar;
