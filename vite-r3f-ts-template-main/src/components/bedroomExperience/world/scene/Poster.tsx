import { Image } from "@react-three/drei";

const Poster = () => {
  return (
    <Image position={[ 0.6453, 0.804, -0.062]} scale={[0.16, 0.285]} rotation={[ 0, -Math.PI * 0.025, 0]} toneMapped url="/textures/bedroomScene/poster.jpg" />
  );
}

export default Poster;