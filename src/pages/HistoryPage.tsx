import {
  Heading,
  Stack,
  Box,
  Select,
  SimpleGrid,
  Input,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const HistoryPage = () => {
  return (
    <>
      <Heading marginBottom={5}>History</Heading>
      <Stack width={"100%"} height={"100%"} padding={3} alignItems={"center"}>
        <SimpleGrid columns={3} spacing={5} marginBottom={5} width={"90%"}>
          <Box>
            <Select placeholder="Site" required></Select>
          </Box>
          <Box>
            <Select placeholder="Machine" required></Select>
          </Box>
          <Box>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
          </Box>
        </SimpleGrid>
        <Button variant={"solid"} colorScheme="teal" rightIcon={<SearchIcon />}>
          Search
        </Button>
      </Stack>
    </>
  );
};
