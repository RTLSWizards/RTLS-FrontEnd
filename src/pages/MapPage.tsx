import { Heading } from "@chakra-ui/react";
import { MapWindow } from "../components/MapWindow";

export const MapPage = () => {
  return (
    <>
      <Heading pl={100}>Map</Heading>
      <MapWindow />
    </>
  );
};
