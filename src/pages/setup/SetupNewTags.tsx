import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { device } from "../../features/Interface";
import axiosCloud, { ENDPOINT } from "../../features/AxiosCloud";
import { AxiosError } from "axios";
import { AddDeviceCard } from "../../components/setup/AddDeviceCard";
import { ErrorNetElement } from "../../components/ErrorNetElement";

export const SetupNewTags = ({
  site,
  setActiveStep,
  activeStep,
}: {
  site: string | undefined;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
}) => {
  const [deviceList, setDeviceList] = useState<device[]>();
  const [deviceSiteList, setDeviceSiteList] = useState<device[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorNet, setErrorNet] = useState<boolean>(false);

  const toast = useToast();

  const getDeviceList = async () => {
    setErrorNet(false);
    setLoading(true);
    await axiosCloud
      .get(ENDPOINT.tag + "/site/null")
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
      .get(ENDPOINT.tag + "/site/" + site)
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
              <HStack>
                <Box m={50}>
                  {deviceList?.length != 0 ? (
                    <>
                      <Heading textAlign={"center"}>New tags</Heading>
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
                        No new tags{" "}
                      </Heading>
                    </>
                  )}
                </Box>
                <Box height="50vh">
                  <Divider orientation="vertical" />
                </Box>
                <Box>
                  {deviceSiteList?.length != 0 ? (
                    <>
                      <Heading textAlign={"center"}>Actived Tags</Heading>
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
                <Button
                  variant={"solid"}
                  colorScheme="teal"
                  size={"lg"}
                  backgroundColor="#559c8b"
                  m={5}
                  onClick={() => {
                    if (site != undefined) {
                      setActiveStep(activeStep + 1);
                    }
                  }}
                >
                  Confirm
                </Button>
              </HStack>
            )}
          </>
        )}
      </Stack>
    </>
  );
};
