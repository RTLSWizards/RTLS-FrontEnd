import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
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
      });
  };

  const orderBy = () => {
    console.log("modificare");
  };

  return (
    <>
      <Card m={50} minW={"40%"}>
        <CardHeader>
          <HStack alignItems={"end"}>
            <Heading size="xl" mr={"5%"}>
              {type == "anchor" ? "Anchor" : "Tag"}
            </Heading>
            <Text as={"b"} minW={"20%"}>
              Order by:
            </Text>
            <Select onChange={orderBy} size={"xs"}>
              <option value="">---</option>
              <option value="name">mac address</option>
            </Select>
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
                        onClick={() => navigate(`${type}/${device.macAddress}`)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
};
