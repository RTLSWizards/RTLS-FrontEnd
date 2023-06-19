import { Box, Heading, HStack } from "@chakra-ui/react";
import { DeviceGrid } from "../components/DeviceGrid";

export const DeviceGridPage = () => {
  return (
    <>
      <Heading>Devices</Heading>
      <Box>
        <HStack alignItems={"start"}>
          <DeviceGrid type="anchor" />
          <DeviceGrid type="tag" />
        </HStack>
      </Box>
    </>
  );
};
