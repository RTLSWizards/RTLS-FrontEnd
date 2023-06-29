import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ConfirmModalProps } from "../../features/Interface";

export const ConfirmModal = (props: ConfirmModalProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confermi?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Una volta confermato le ancore si attiveranno.</ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3}>
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
