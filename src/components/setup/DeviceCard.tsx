import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

export const DeviceCard = ({ mac }: { mac: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const [positionX, setPositionX] = useState<number>();
  const handleXInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNum = parseFloat(e.target.value);
    setPositionX(inputNum);
  };

  const [positionY, setPositionY] = useState<number>();
  const handleYInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNum = parseFloat(e.target.value);
    setPositionY(inputNum);
  };

  return (
    <>
      <Card m={5}>
        <CardHeader>
          <Heading size="md" as={"i"}>
            {mac}
          </Heading>
        </CardHeader>
        <CardBody>
          <Button onClick={onOpen}>Open</Button>
        </CardBody>
      </Card>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Register a new site</DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px" mt={5}>
              <HStack>
                <Text>X</Text>
                <Input
                  id="x"
                  onChange={handleXInput}
                  placeholder="Please enter position X"
                  size={"xs"}
                  type="number"
                  required
                />
              </HStack>
              <HStack>
                <Text>Y</Text>
                <Input
                  id="y"
                  onChange={handleYInput}
                  placeholder="Please enter position Y"
                  size={"xs"}
                  type="number"
                  required
                />
              </HStack>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
