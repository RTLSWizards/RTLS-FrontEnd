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

  const getContact = async () => {
    try {
      setLoading(true);
      await axiosCloud
        .get(
          param.type == "tag"
            ? ENDPOINT.tag + "/mac/" + param.macAddress
            : ENDPOINT.anchor + "/mac/" + param.macAddress
        )
        .then((result) => {
          setSingleDevice(result.data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    getContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card m={10}>
        <CardHeader>
          <HStack>
            <Heading size="md">{`${param.type} detail`}</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <HStack>
            <Text as={"b"}>macAddress:</Text>
            {loading ? (
              <Skeleton height="15px" w={"100px"} />
            ) : (
              <Text fontSize="sm">{singleDevice?.macAddress}</Text>
            )}
            <Heading size="sm" m={2}>
              Last position:
            </Heading>
            <Text as={"b"}>X:</Text>
            {loading ? (
              <Skeleton height="15px" w={"100px"} />
            ) : (
              <Text fontSize="sm"> {singleDevice?.positions[0].x}</Text>
            )}
            <Text as={"b"}>Y:</Text>
            {loading ? (
              <Skeleton height="15px" w={"100px"} />
            ) : (
              <Text fontSize="sm">{singleDevice?.positions[0].y}</Text>
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
      <Card w={"80%"} h={"60%"} m={10}>
        <CardBody>
          {singleDevice ? (
            <MapWindow
              deviceDetail={singleDevice}
              setDeviceDetail={setSingleDevice}
            />
          ) : (
            <></>
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
