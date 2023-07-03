import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  IconButton,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MapWindow } from "../components/MapWindow";
import { LegendTable } from "../components/LegendTable";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export const MapPage = ({
  getTimeFrequency,
}: {
  getTimeFrequency: () => number;
}) => {
  // open/close input timer
  const [showInput, setShowInput] = useState(false);

  const [inputTimer, setInputTimer] = useState<number>();
  const handleInputTimer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNum = parseInt(e.target.value);
    setInputTimer(inputNum);
  };

  const handleSaveNewTimer = () => {
    if (inputTimer != undefined) {
      const inputTimerInMs = inputTimer * 1000;
      localStorage.setItem("refreshingTime", inputTimerInMs.toString());
      location.reload();
    }
  };

  return (
    <>
      <Heading>Map</Heading>
      <HStack h={"full"} alignItems={"start"} mt={10}>
        <Card w={"70%"} h={"full"} mr={10} shadow={"2xl"}>
          <CardBody>
            <MapWindow
              deviceDetail={null}
              setDeviceDetail={undefined}
              getTimeFrequency={getTimeFrequency}
            />
          </CardBody>
        </Card>
        <Box>
          <Card shadow={"2xl"}>
            <CardBody>
              <LegendTable />
            </CardBody>
          </Card>
          <Card shadow={"2xl"} mt={5}>
            <CardBody>
              <HStack>
                <Text>Update Frequency: {getTimeFrequency() / 1000} s</Text>
                <Spacer />
                <IconButton
                  size={"xs"}
                  shadow={"md"}
                  borderRadius={"3xl"}
                  icon={<FaEdit />}
                  aria-label={"editFrequency"}
                  onClick={() => setShowInput(!showInput)}
                />
              </HStack>
              <VStack display={showInput ? "block" : "none"}>
                <Input
                  mt={2}
                  placeholder="time frequency"
                  type="number"
                  onChange={handleInputTimer}
                />
                <Button
                  mt={2}
                  w={"100%"}
                  colorScheme="facebook"
                  onClick={handleSaveNewTimer}
                >
                  Update
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </HStack>
    </>
  );
};
