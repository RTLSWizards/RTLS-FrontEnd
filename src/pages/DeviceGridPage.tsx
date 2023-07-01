import { Box, Button, Heading, HStack, Spacer, Stack } from "@chakra-ui/react";
import { DeviceGrid } from "../components/DeviceGrid";
import { MdBuild } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const DeviceGridPage = () => {
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setTimer(getTimeFrequency() / 1000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [timer]);

  const getTimeFrequency = () => {
    const timer = localStorage.getItem("refreshingTime");
    if (timer) {
      return parseInt(timer);
    } else {
      return 2000;
    }
  };

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
        {/* <Text>Next Request: {timer} s</Text> */}
        <HStack>
          <DeviceGrid type="anchor" />
          <DeviceGrid type="tag" />
        </HStack>
      </Box>
    </>
  );
};
