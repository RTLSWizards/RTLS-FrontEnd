import { Flex, Icon, Link } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import { FaSearchLocation } from "react-icons/fa";

export const Logo = ({
  navigate,
  collapse,
}: {
  navigate: NavigateFunction;
  collapse: boolean;
}) => {
  return (
    <Flex
      w="full"
      alignItems="center"
      flexDirection={collapse ? "row" : "column"}
    >
      <Link
        display="flex"
        alignItems="center"
        fontWeight={"bold"}
        fontSize={18}
        _hover={{ textDecoration: "none" }}
        onClick={() => navigate("/")}
      >
        <Icon as={FaSearchLocation} fontSize={22} m="0" />
        {collapse ? <></> : <>RTLS APTAR</>}
      </Link>
    </Flex>
  );
};
