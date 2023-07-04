import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const SetupModal = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isSetted = localStorage.getItem("isSetted");
    isSetted ? setOpen(false) : setOpen(true);
  }, []);

  const navigateToSetup = () => {
    setOpen(false);
    navigate("setup");
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eseguire Setup devices?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={navigateToSetup}>
              Esegui il setup
            </Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Chiudi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Outlet />
    </>
  );
};
