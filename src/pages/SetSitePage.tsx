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
import axiosCloud, { ENDPOINT } from "../features/AxiosCloud";
import { AxiosError } from "axios";
import { Site } from "../features/Interface";

export const SetSitePage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const [site, setSite] = useState("");
  const [siteList, setSiteList] = useState<Site[]>();
  const [name, setName] = useState<string>();

  const getSiteList = () => {
    setLoading(true);

    axiosCloud
      .get(ENDPOINT.site)
      .then((res) => {
        setSiteList(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
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

  const handleSubmit = () => {
    if (site != "") {
      localStorage.setItem("site", site);
      location.reload();
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

  useEffect(
    () => getSiteList(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Stack alignItems={"center"}>
      <>
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
          <Button width={"100%"} colorScheme="yellow" mb={50}>
            Register a new site
          </Button>
        </Box>
      </>
    </Stack>
  );
};
