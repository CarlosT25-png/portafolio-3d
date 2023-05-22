import { Image } from "@react-three/drei";

const Poster = () => {
  return (
    <Image position={[ 0.586, 0.803, -0.108 ]} scale={[0.16, 0.285]}  toneMapped url="/textures/bedroomScene/poster.jpg" />
  );
}

export default Poster;