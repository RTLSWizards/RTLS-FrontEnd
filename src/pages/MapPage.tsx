import { Card, CardBody, HStack, Heading } from "@chakra-ui/react";
import { MapWindow } from "../components/MapWindow";
import { LegendTable } from "../components/LegendTable";

export const MapPage = () => {
  return (
    <>
      <Heading pl={100}>Map</Heading>
      <HStack w={"100%"} h={"100%"} alignItems={"start"}>
        <Card w={"70%"} h={"80%"} m={10} shadow={"2xl"}>
          <CardBody>
            <MapWindow deviceDetail={null} setDeviceDetail={undefined} />
          </CardBody>
        </Card>
        <Card mt={10} shadow={"2xl"}>
          <CardBody>
            <LegendTable />
          </CardBody>
        </Card>
      </HStack>
    </>
  );
};
