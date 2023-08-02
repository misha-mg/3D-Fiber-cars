import { Canvas, useFrame } from "@react-three/fiber";
import { Gltf, Scroll, ScrollControls, useScroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import theatreState from "./fly.json";
import "./index.css";

import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";

export default function App() {
  const sheet = getProject("Fly Through", { state: theatreState }).sheet(
    "Scene"
  );

  console.log(useScroll());

  return (
    <>
      <div id="model-focus"></div>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls pages={5} damping={1}>
          <SheetProvider sheet={sheet}>
            <Scroll>
              <Scene />
            </Scroll>
          </SheetProvider>
        </ScrollControls>
      </Canvas>
    </>
  );
}

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  // our callback will run on every animation frame
  useFrame(() => {
    const focus = document.getElementById("model-focus");

    if (
      scroll.offset <= 0.6569948086671727 &&
      scroll.offset >= 0.5869948086671727
    ) {
      focus.classList.add("model-focus");
    } else {
      focus.classList.remove("model-focus");
    }

    if (
      scroll.offset <= 0.2309551679529786 &&
      scroll.offset >= 0.1709551679529786
    ) {
      focus.classList.add("model-focus1");
    } else {
      focus.classList.remove("model-focus1");
    }

    // console.log(scroll.offset);

    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });
  const bgColor = "silver";

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <Gltf
        src="/MERCEDES.glb"
        position={[5, 0, -7]}
        castShadow
        receiveShadow
      />
      <Gltf src="/porsche.glb" castShadow receiveShadow />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}
