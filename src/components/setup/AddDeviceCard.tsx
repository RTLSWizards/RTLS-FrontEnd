import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axiosCloud from "../../features/AxiosCloud";
import { device } from "../../features/Interface";
import { AxiosError } from "axios";

export const AddDeviceCard = ({
  deviceItem,
  action,
  site,
  getDeviceList,
  getDeviceSiteList,
}: {
  deviceItem: device;
  action: string;
  site: string | undefined;
  getDeviceList: () => Promise<void>;
  getDeviceSiteList: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const AddDeviceToSite = async () => {
    setLoading(true);
    await axiosCloud
      .post(
        deviceItem.type,
        JSON.stringify({
          macAddress: deviceItem.macAddress,
          type: deviceItem.type,
          sitename: site,
        })
      )
      .then(() => {
        getDeviceList();
        getDeviceSiteList();
        setLoading(false);
      })
      .catch((err: AxiosError) => {
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

  const DissasociateDeviceToSite = async () => {
    setLoading(true);
    await axiosCloud
      .put(deviceItem.type + "/dissociate/" + deviceItem.macAddress)
      .then(() => {
        getDeviceList();
        getDeviceSiteList();
        setLoading(false);
      })
      .catch((err: AxiosError) => {
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

  return (
    <>
      <Card m={5}>
        <CardBody>
          <VStack>
            <Heading size="md" as={"i"}>
              {deviceItem.macAddress}
            </Heading>
            <Button
              isLoading={loading}
              size={"xs"}
              onClick={
                action == "add"
                  ? () => AddDeviceToSite()
                  : () => DissasociateDeviceToSite()
              }
              rightIcon={action == "add" ? <AddIcon /> : <MinusIcon />}
              colorScheme={action == "add" ? "teal" : "yellow"}
            >
              {action == "add" ? "add" : "remove"}
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};
