import { Link, Box, Button, useColorMode, ListIcon } from "@chakra-ui/react";
import { NavLink, NavigateFunction, useLocation } from "react-router-dom";
import { navItem } from "../../../features/Interface";

export const NavItem = ({
  item,
  navigate,
  collapse,
}: {
  item: navItem;
  navigate: NavigateFunction;
  collapse: boolean;
}) => {
  const { label, icon, path } = item;
  const { colorMode } = useColorMode();
  const location = useLocation();
  const isDark = colorMode === "dark" ? "white" : "black";
  const navigateToPath = () => {
    if (path === "/") {
      localStorage.removeItem("token");
    }
    navigate(path);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      my={collapse ? 4 : 6}
      justifyContent="center"
    >
      {collapse ? (
        <Button rounded={"3xl"} variant={"ghost"}>
          <Link
            gap={2}
            display="flex"
            alignItems="center"
            fontWeight="medium"
            w="full"
            justifyContent={collapse ? "center" : ""}
            _hover={{ textDecoration: "none", color: isDark }}
            onClick={() => {
              navigateToPath();
            }}
          >
            <ListIcon as={icon} fontSize={22} m="0" />
          </Link>
        </Button>
      ) : (
        <>
          <Box
            gap={2}
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "none", color: isDark }}
            fontWeight="medium"
            color={location.pathname === path ? isDark : "gray"}
            w="full"
            justifyContent={collapse ? "center" : ""}
            onClick={() => {
              navigateToPath();
            }}
          >
            <ListIcon as={icon} fontSize={22} m="0" />
            {!collapse && <NavLink to={path}>{label}</NavLink>}
          </Box>
        </>
      )}
    </Box>
  );
};
