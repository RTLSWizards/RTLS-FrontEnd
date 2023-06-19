import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  IconButton,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

// LOGICS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// FEATURES
import { device } from "../features/Interface";
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud";

// COMPONENTS
import { MapWindow } from "../components/MapWindow";
import { DrawerForm } from "../components/DrawerForm";
import { AxiosError } from "axios";

export const DevicePage = () => {
  const param = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState<string>();
  const openDrawerForm = () => {
    setSelectedModal("drawer");
    onOpen();
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [singleDevice, setSingleDevice] = useState<device>();
  const toast = useToast();

  const getContact = async () => {
    await axiosCloud
      .get(
        param.type == "tag"
          ? ENDPOINT.tag + "/mac/" + param.macAddress
          : ENDPOINT.anchor + "/mac/" + param.macAddress
      )
      .then((result) => {
        setSingleDevice(result.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.message == "Network Error") {
          toast({
            status: "error",
            title: "Server Error",
            variant: "solid",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
  };

  useEffect(() => {
    getContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card w={"80%"}>
        <CardHeader>
          <HStack>
            <Heading size="md">
              {param.type == "anchor" ? "Anchor Detail" : "Tag Detail"}
            </Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <HStack>
            <Text as={"b"}>Mac Address:</Text>
            {loading ? (
              <Skeleton height="20px" w={"20%"} />
            ) : (
              <Text fontSize="sm">{singleDevice?.macAddress}</Text>
            )}
            <Text as={"b"} size="md" m={2}>
              Last position:
            </Text>
            <Text as={"b"}>X:</Text>
            {loading ? (
              <Skeleton height="15px" w={"20%"} />
            ) : (
              <Text fontSize="sm">
                {" "}
                {singleDevice?.positions[0]
                  ? `${singleDevice?.positions[0].x.toFixed(2)}`
                  : "NaN"}
              </Text>
            )}
            <Text as={"b"}>Y:</Text>
            {loading ? (
              <Skeleton height="15px" w={"20%"} />
            ) : (
              <Text fontSize="sm">
                {singleDevice?.positions[0]
                  ? `${singleDevice?.positions[0].y.toFixed(2)}`
                  : "NaN"}
              </Text>
            )}
            {singleDevice?.type == "anchor" ? (
              <IconButton
                icon={<FaEdit />}
                aria-label={"edit"}
                rounded={"3xl"}
                onClick={() => openDrawerForm()}
              />
            ) : (
              <></>
            )}
          </HStack>
        </CardBody>
      </Card>
      <Card w={"80%"} h={"80%"} mt={10}>
        <CardBody>
          {singleDevice ? (
            <MapWindow
              deviceDetail={singleDevice}
              setDeviceDetail={setSingleDevice}
            />
          ) : (
            <>
              <Skeleton height="100%" />
            </>
          )}
        </CardBody>
      </Card>
      {selectedModal == "drawer" && singleDevice ? (
        <DrawerForm
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          device={singleDevice}
          getContact={getContact}
        />
      ) : (
        <></>
      )}
    </>
  );
};
