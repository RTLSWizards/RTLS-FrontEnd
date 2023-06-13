import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  IconButton,
  Skeleton,
  SkeletonCircle,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud.ts";
import { device } from "../features/Interface.tsx";
import { useNavigate } from "react-router-dom";

export const DeviceGrid = ({ type }: { type: string }) => {
  const [loading, setLoading] = useState(true);
  const [deviceList, setDeviceList] = useState<device[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      getDevice();
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDevice = async () => {
    await axiosCloud
      .get(type == "anchor" ? ENDPOINT.anchor : ENDPOINT.tag)
      .then((result) => {
        setDeviceList(result.data);
        setLoading(false);
      });
  };

  return (
    <>
      <Card m={50} minW={"40%"}>
        <CardHeader>
          <HStack alignItems={"end"}>
            <Heading size="xl" mr={"5%"}>
              {type == "anchor" ? "Anchor" : "Tag"}
            </Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="striped" colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>mac Address</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <SkeletonCircle size="10" />
                    </Td>
                  </Tr>
                ) : (
                  <>
                    {deviceList?.map((device, index) => (
                      <Tr key={index}>
                        <Td>{device.macAddress}</Td>
                        <Td>
                          <IconButton
                            size={"xs"}
                            shadow={"md"}
                            borderRadius={"3xl"}
                            icon={<FaSearch />}
                            aria-label={"detail"}
                            onClick={() =>
                              navigate(`${type}/${device.macAddress}`)
                            }
                          />
                        </Td>
                      </Tr>
                    ))}
                  </>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
};
