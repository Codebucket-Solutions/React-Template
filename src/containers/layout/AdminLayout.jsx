import Navbar from "./Navbar";
import Sidebar from "./sidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex bg-[#0B1120] min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-6 flex-1">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;
