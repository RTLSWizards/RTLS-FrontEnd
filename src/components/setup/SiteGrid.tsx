import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosCloud, { ENDPOINT } from "../../features/AxiosCloud";
import { Site } from "../../features/Interface";
import { AxiosError } from "axios";
import { ErrorNetElement } from "../ErrorNetElement";

export const SiteGrid = ({
  setActiveStep,
  setSite,
  site,
  loading,
  setLoading,
  errorNet,
  setErrorNet,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setSite: React.Dispatch<React.SetStateAction<string>>;
  site: string | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorNet: boolean;
  setErrorNet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [siteList, setSiteList] = useState<Site[]>();
  const [name, setName] = useState<string>();

  const getSiteList = async () => {
    setErrorNet(false);
    setLoading(true);

    await axiosCloud
      .get(ENDPOINT.site)
      .then((res) => {
        setSiteList(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        setErrorNet(true);
        if (err.message == "Network Error" || err.code == "ERR_NETWORK") {
          toast({
            status: "error",
            title: "Server Error",
            variant: "solid",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (site != "") {
      setActiveStep(1);
    } else {
      toast({
        status: "error",
        title: "Please, select a site.",
        variant: "solid",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    await axiosCloud
      .post(ENDPOINT.site, JSON.stringify({ name }), {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setLoading(false);
        getSiteList();
        onClose();
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        console.log("err.code");
        if (err.message == "Network Error" || err.code == "ERR_NETWORK") {
          toast({
            status: "error",
            title: "Server Error",
            variant: "solid",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
  };

  useEffect(
    () => {
      getSiteList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Stack alignItems={"center"}>
      {errorNet ? (
        <>
          <ErrorNetElement api={getSiteList} />
        </>
      ) : (
        <>
          {loading ? (
            <Spinner size="xl" mt={150} />
          ) : (
            <Box>
              <Heading textAlign={"center"}>Select the site</Heading>
              <Select
                mt={50}
                mb={50}
                variant={"filled"}
                placeholder="ex. demo site"
                onChange={(e) => {
                  setSite(e.target.value);
                }}
              >
                {siteList?.map((site, index) => (
                  <option key={index} value={site.name}>
                    {site.name}
                  </option>
                ))}
              </Select>
              <Button
                width={"100%"}
                colorScheme="teal"
                mb={10}
                onClick={handleSubmit}
              >
                Confirm
              </Button>
              <Button
                width={"100%"}
                colorScheme="yellow"
                mb={50}
                onClick={onOpen}
              >
                Register a new site
              </Button>
            </Box>
          )}
        </>
      )}

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Register a new site</DrawerHeader>
          <DrawerBody>
            <FormControl isRequired>
              <FormLabel>Site name</FormLabel>
              <Input onChange={handleName} />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" isLoading={loading} onClick={handleAdd}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};
