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

export const ConfirmModal = ({
  isOpen,
  onClose,
  setActiveStep,
  site,
  activeStep,
}: {
  isOpen: boolean;
  onClose: () => void;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  site: string | undefined;
  activeStep: number;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Once confirmed the anchors will activate</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => {
              if (site != undefined) {
                setActiveStep(activeStep + 1);
              }
            }}
          >
            Confirm
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Back
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
