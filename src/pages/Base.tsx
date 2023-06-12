import { Box, HStack, IconButton } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { Sidebar } from "../components/base/Sidebar";

export const Base = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <HStack w={"full"} h={"100vh"} p={2}>
      <Sidebar collapse={collapse} />
      {/* button for collapse */}
      <Box as="main" w="full" h="full" shadow={"2xl"} borderRadius="3xl">
        <IconButton
          aria-label="Menu Colapse"
          icon={<MdMenu />}
          top={6}
          left={6}
          onClick={() => {
            setCollapse(!collapse);
          }}
        />
        <Outlet />
      </Box>
    </HStack>
  );
};
