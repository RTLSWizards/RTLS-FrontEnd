import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ConfirmModal } from "../../components/setup/ConfirmModal";
import { useEffect, useState } from "react";
import { device } from "../../features/Interface";
import axiosCloud, { ENDPOINT } from "../../features/AxiosCloud";
import { AxiosError } from "axios";
import { AddDeviceCard } from "../../components/setup/AddDeviceCard";
import { ErrorNetElement } from "../../components/ErrorNetElement";

export const SetupNewAnchors = ({
  site,
  setActiveStep,
  activeStep,
  loading,
  setLoading,
  errorNet,
  setErrorNet,
}: {
  site: string | undefined;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorNet: boolean;
  setErrorNet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deviceList, setDeviceList] = useState<device[]>();
  const [deviceSiteList, setDeviceSiteList] = useState<device[]>();

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
      <Stack>
        {errorNet ? (
          <>
            <ErrorNetElement api={getDeviceList} />
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
                <HStack>
                  <Box m={50}>
                    {deviceList?.length != 0 ? (
                      <>
                        <Heading textAlign={"center"}>New Anchors </Heading>
                        <SimpleGrid columns={4} spacing={5} marginBottom={5}>
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
                      </>
                    ) : (
                      <>
                        {" "}
                        <Heading textAlign={"center"} color={"gray"} mt={50}>
                          No new anchors{" "}
                        </Heading>
                      </>
                    )}
                  </Box>
                  <Box height="50vh">
                    <Divider orientation="vertical" />
                  </Box>
                  {deviceSiteList?.length !== 0 ? (
                    <Box m={50}>
                      <Heading textAlign={"center"}>Actived anchors</Heading>
                      <SimpleGrid columns={4} spacing={5} marginBottom={5}>
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
                    </Box>
                  ) : (
                    <>
                      {" "}
                      <Heading
                        textAlign={"center"}
                        color={"gray"}
                        mt={50}
                        ml={50}
                      >
                        No setted anchors{" "}
                      </Heading>
                    </>
                  )}
                </HStack>
                <center>
                  <Button
                    variant={"solid"}
                    colorScheme="leaf"
                    size={"lg"}
                    backgroundColor="#559c8b"
                    w={500}
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
