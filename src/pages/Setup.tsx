import {
  Container,
  Heading,
  Text,
  Divider,
  Select,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Box,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

export const Setup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container
      minWidth={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      p={5}
    >
      <Heading size={"lg"} marginBottom={5}>
        Benvenuto, qui potrai configurare il tuo sistema di tracciamento in
        tempo reale!
      </Heading>
      <Heading size={"sm"} marginBottom={2}>
        Istruzioni per l'uso:
      </Heading>
      <Text marginBottom={3}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium, Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
        repudiandae consequuntur voluptatum laborum numquam blanditiis harum
        quisquam eius sed odit fugiat iusto fuga praesentium
      </Text>
      <Divider marginBottom={5} />
      <Select
        size={"lg"}
        variant={"filled"}
        maxWidth={"550px"}
        backgroundColor="#559c8b"
        marginBottom={"5rem"}
        placeholder="-- Seleziona la sede --"
      ></Select>
      <Box marginInline={"20rem"} marginBottom={"3rem"}>
        <SimpleGrid
          spacing={4}
          marginBottom={5}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          <DeviceCard number={1} />
          <DeviceCard number={2} />
          <DeviceCard number={3} />
          <DeviceCard number={4} />
        </SimpleGrid>
        <Button
          variant={"solid"}
          size={"lg"}
          width={"100%"}
          backgroundColor="#559c8b"
          onClick={onOpen}
        >
          Conferma
        </Button>
      </Box>
      <ConfirmModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

interface DeviceCardProps {
  number?: number;
}

const DeviceCard = (props: DeviceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Anchor {props.number}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Posizione:</Text>
        <FormLabel>X</FormLabel>
        <Input />
        <FormLabel>Y</FormLabel>
        <Input />
      </CardBody>
    </Card>
  );
};

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confermi?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Una volta confermato le ancore si attiveranno.</ModalBody>
        <ModalFooter>
          <Button backgroundColor="#559c8b" mr={3}>
            Conferma
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Annulla
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
