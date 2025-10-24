import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function NgoLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: 256 }}>
        <Navbar />
        <main className="flex-1 p-8 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}

export default NgoLayout;
