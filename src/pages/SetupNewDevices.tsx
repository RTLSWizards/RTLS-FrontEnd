import {
  Box,
  Button,
  Divider,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ConfirmModal } from "../components/setup/ConfirmModal";
import { useEffect, useState } from "react";
import { device } from "../features/Interface";
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud";
import { AxiosError } from "axios";
import { WarningIcon } from "@chakra-ui/icons";
import { AddDeviceCard } from "../components/setup/AddDeviceCard";

export const SetupNewDevices = ({
  site,
  setActiveStep,
  activeStep,
}: {
  site: string | undefined;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deviceList, setDeviceList] = useState<device[]>();
  const [deviceSiteList, setDeviceSiteList] = useState<device[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorNet, setErrorNet] = useState<boolean>(false);

  const toast = useToast();

  const getDeviceList = async () => {
    setErrorNet(false);
    setLoading(true);
    await axiosCloud
      .get(ENDPOINT.anchor + "/site/null")
      .then((res) => {
        setDeviceList(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setErrorNet(true);
        setLoading(false);
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

  const getDeviceSiteList = async () => {
    setErrorNet(false);
    setLoading(true);
    await axiosCloud
      .get(ENDPOINT.anchor + "/site/" + site)
      .then((res) => {
        setDeviceSiteList(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setErrorNet(true);
        setLoading(false);
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
    getDeviceSiteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack alignItems={"center"}>
        {errorNet ? (
          <>
            <Stack h={"70vh"} alignItems={"center"}>
              <WarningIcon w={8} h={8} color="red.500" mt={100} />
              <Heading mb={5}>Something went wrong!</Heading>
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
                  Add the new devices to the site{" "}
                </Heading>
                <center>
                  <SimpleGrid columns={5} spacing={5} marginBottom={5}>
                    {deviceList?.map((deviceItem, index) => (
                      <Box key={index}>
                        <AddDeviceCard
                          deviceItem={deviceItem}
                          action={"add"}
                          site={site}
                          getDeviceList={() => getDeviceList()}
                          getDeviceSiteList={() => getDeviceSiteList()}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                  <Divider />
                  <Heading textAlign={"center"}>
                    Or dissociate devices to the site
                  </Heading>
                  <SimpleGrid columns={5} spacing={5} marginBottom={5}>
                    {deviceSiteList?.map((deviceItem, index) => (
                      <Box key={index}>
                        <AddDeviceCard
                          deviceItem={deviceItem}
                          action={"disassociate"}
                          site={site}
                          getDeviceList={() => getDeviceList()}
                          getDeviceSiteList={() => getDeviceSiteList()}
                        />
                      </Box>
                    ))}
                  </SimpleGrid>
                  <Button
                    variant={"solid"}
                    colorScheme="leaf"
                    size={"lg"}
                    backgroundColor="#559c8b"
                    onClick={onOpen}
                    m={5}
                  >
                    Confirm
                  </Button>
                </center>
              </>
            )}
          </>
        )}
      </Stack>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        setActiveStep={setActiveStep}
        site={site}
        activeStep={activeStep}
      />
    </>
  );
};
