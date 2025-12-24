import { Outlet } from "react-router-dom";
import useSmoothScroll from "../hooks/useSmoothScroll";
import ParticlesBackground from "../components/three/ParticlesBackground";
import Sidebar from "../components/common/Sidebar";

const MainLayout = () => {
  useSmoothScroll();
  return (
    <div className="min-h-screen">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-20">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
