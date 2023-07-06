import {
  Box,
  Button,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DeviceGrid } from "../components/DeviceGrid";
import { MdBuild } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const DeviceGridPage = ({
  getTimeFrequency,
}: {
  getTimeFrequency: () => number;
}) => {
  const navigate = useNavigate();

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setTimer(getTimeFrequency() / 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <>
      <Box>
        <Stack direction={"row"}>
          <Heading>Devices</Heading>
          <Spacer />
          <VStack>
            <Button
              mt={10}
              mr={20}
              rightIcon={<MdBuild />}
              colorScheme="gray"
              onClick={() => {
                localStorage.removeItem("isSetted");
                navigate("/setup");
              }}
            >
              Make setup
            </Button>
            <Text mr={20}>Next Request: {timer} s</Text>
          </VStack>
        </Stack>
        <HStack alignItems={"start"}>
          <DeviceGrid type="anchor" />
          <DeviceGrid type="tag" />
        </HStack>
      </Box>
    </>
  );
};
