import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  useColorMode,
} from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { NavigateFunction } from "react-router-dom";
import { items } from "../../../features/navItems";
import { FaDoorOpen } from "react-icons/fa";

export const Navigation = ({
  navigate,
  collapse,
}: {
  navigate: NavigateFunction;
  collapse: boolean;
}) => {
  const { colorMode } = useColorMode();
  const colorScheme = colorMode === "dark" ? "white" : "black";

  return (
    <List w="full">
      {items.map((item, index) => (
        <ListItem key={index}>
          <NavItem
            item={item}
            navigate={navigate}
            collapse={collapse}
            colorScheme={colorScheme}
          />
        </ListItem>
      ))}
      {/* logout site is out cause is not a link */}
      <ListItem>
        <Box
          display="flex"
          alignItems="center"
          my={collapse ? 4 : 6}
          justifyContent="center"
        >
          {collapse ? (
            <Button
              rounded={"3xl"}
              variant={"ghost"}
              onClick={() => {
                localStorage.removeItem("site");
                location.reload();
              }}
            >
              <ListIcon as={FaDoorOpen} fontSize={22} ml={2} />
            </Button>
          ) : (
            <>
              <Box
                gap={2}
                display="flex"
                alignItems="center"
                _hover={{ textDecoration: "none", color: colorScheme }}
                color={"gray"}
                fontWeight="medium"
                w="full"
                justifyContent={collapse ? "center" : ""}
              >
                <ListIcon
                  as={FaDoorOpen}
                  fontSize={22}
                  m="0"
                  onClick={() => {
                    localStorage.removeItem("site");
                    location.reload();
                  }}
                />
                logout site
              </Box>
            </>
          )}
        </Box>
      </ListItem>
    </List>
  );
};
