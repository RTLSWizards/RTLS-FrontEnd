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
import { WarningIcon } from "@chakra-ui/icons";

export const SiteGrid = ({
  setActiveStep,
  setSite,
  site,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setSite: React.Dispatch<React.SetStateAction<string>>;
  site: string | undefined;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorNet, setErrorNet] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [siteList, setSiteList] = useState<Site[]>();
  const [name, setName] = useState<string>();

  const getSiteList = () => {
    setErrorNet(false);
    setLoading(true);

    axiosCloud
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
    console.log(site);

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
    () => getSiteList(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Stack alignItems={"center"}>
      {errorNet ? (
        <>
          <WarningIcon w={8} h={8} color="red.500" mt={100} />
          <Heading mb={5}>Something was wrong!</Heading>
          <Button colorScheme="red" mb={5} onClick={getSiteList}>
            Refresh
          </Button>
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
            <Button
              variant="outline"
              isLoading={loading}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAdd}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};
