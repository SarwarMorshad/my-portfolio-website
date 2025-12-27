import { Outlet } from "react-router-dom";
import useSmoothScroll from "../hooks/useSmoothScroll";
import ParticlesBackground from "../components/three/ParticlesBackground";

const MainLayout = () => {
  useSmoothScroll();
  return (
    <div className="min-h-screen">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Main Content Area */}
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
