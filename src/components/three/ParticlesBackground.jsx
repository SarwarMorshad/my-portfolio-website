import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      background: {
        color: {
          value: "#0f0f1a",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
            parallax: {
              enable: true,
              force: 60,
              smooth: 10,
            },
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.5,
              color: "#f472b6",
            },
          },
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: ["#6366f1", "#22d3ee", "#f472b6"],
        },
        links: {
          color: "#6366f1",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce",
            top: "bounce",
            bottom: "bounce",
            left: "bounce",
            right: "bounce",
          },
        },
        number: {
          density: {
            enable: true,
            area: 500,
          },
          value: 150,
          limit: {
            mode: "delete",
            value: 200,
          },
        },
        opacity: {
          value: {
            min: 0.3,
            max: 0.7,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: 1,
            max: 4,
          },
        },
        life: {
          count: 0,
          duration: {
            value: 0,
          },
        },
        reduceDuplicates: false,
      },
      detectRetina: true,
      pauseOnBlur: false,
      pauseOnOutsideViewport: false,
    }),
    []
  );

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
};

export default ParticlesBackground;
