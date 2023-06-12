import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Skeleton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { device } from "../features/Interface";
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud";

export const DevicePage = () => {
  const param = useParams();

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
          console.log(singleDevice);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
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
            <Heading size="md">Contact detail</Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <HStack>
            <Text as={"b"}>id:</Text>
            {loading ? (
              <Skeleton height="15px" w={"100px"} />
            ) : (
              <Text fontSize="sm"> {singleDevice?.id}</Text>
            )}
            <Spacer />
            <Text as={"b"}>macAddress:</Text>
            {loading ? (
              <Skeleton height="15px" w={"100px"} />
            ) : (
              <Text fontSize="sm">{singleDevice?.macAddress}</Text>
            )}
            <Spacer />
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};
