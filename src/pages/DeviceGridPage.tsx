import { Box, Button, Heading, HStack, Spacer, Stack } from "@chakra-ui/react";
import { DeviceGrid } from "../components/DeviceGrid";
import { MdBuild } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const DeviceGridPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <Stack direction={"row"}>
          <Heading>Devices</Heading>
          <Spacer />
          <Button
            mt={10}
            mr={20}
            rightIcon={<MdBuild />}
            onClick={() => navigate("/setup")}
          >
            Make setup
          </Button>
        </Stack>
        <HStack>
          <DeviceGrid type="anchor" />
          <DeviceGrid type="tag" />
        </HStack>
      </Box>
    </>
  );
};
