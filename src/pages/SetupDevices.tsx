import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeviceCard } from "../components/setup/DeviceCard";
import { ConfirmModal } from "../components/setup/ConfirmModal";
import { useEffect, useState } from "react";
import { device } from "../features/Interface";
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud";
import { AxiosError } from "axios";
import { WarningIcon } from "@chakra-ui/icons";

export const SetupDevices = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deviceList, setDeviceList] = useState<device[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorNet, setErrorNet] = useState<boolean>(false);

  const toast = useToast();

  const getDeviceList = async () => {
    setErrorNet(false);
    setLoading(true);
    axiosCloud
      .get(ENDPOINT.anchor + "PERCORSOCONGETBYSITE")
      .then((res) => {
        setDeviceList(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        setErrorNet(true);
        if (err.message == "Network Error" || err.code == "ERR_NETWORK") {
          toast({
            status: "error",
            title: "Server Error",
            variant: "solid",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
  };

  useEffect(() => {
    getDeviceList();
  }, []);

  return (
    <>
      <Stack alignItems={"center"}>
        {!errorNet ? (
          <>
            <Stack h={"70vh"} alignItems={"center"}>
              <WarningIcon w={8} h={8} color="red.500" mt={100} />
              <Heading mb={5}>Something was wrong!</Heading>
              <Button colorScheme="red" mb={5} onClick={getDeviceList}>
                Refresh
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {loading ? (
              <>
                <Stack h={"70vh"} alignItems={"center"}>
                  <Spinner size="xl" mt={150} />
                </Stack>
              </>
            ) : (
              <>
                <Heading textAlign={"center"}>
                  Esegui il setup dei dispositivi
                </Heading>
                <center>
                  <SimpleGrid columns={5} spacing={5} marginBottom={5}>
                    {deviceList?.map((deviceItem, index) => (
                      <Box key={index}>
                        <DeviceCard mac={deviceItem.macAddress} />
                      </Box>
                    ))}
                    <Box>
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                      <DeviceCard mac="221" />
                    </Box>
                  </SimpleGrid>
                  <Button
                    variant={"solid"}
                    colorScheme="leaf"
                    size={"lg"}
                    backgroundColor="#559c8b"
                    onClick={onOpen}
                    m={5}
                  >
                    Conferma
                  </Button>
                </center>
              </>
            )}
          </>
        )}
      </Stack>
      <ConfirmModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
