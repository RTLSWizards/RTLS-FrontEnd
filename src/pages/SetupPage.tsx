import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

export const SetupPage = ({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Stack>
      <Box textAlign={"center"} m={50}>
        <Heading size={"lg"} marginBottom={5}>
          Benvenuto nella pagina di setup del sistema RTLS!
        </Heading>
        <Text marginBottom={3}>
          Per avviare il tracciamento, è importante posizionare le ancore nei
          punti desiderati all'interno dell'area che desideri monitorare.
          Assicurati di misurare le dimensioni della stanza utilizzando uno
          strumento e inserisci le coordinate corrette delle ancore. La prima
          ancora è posizionata di default a (0.1) e rimane fissa. Una volta
          inserite tutte le informazioni, sarai pronto per avviare il
          tracciamento.
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          m={50}
          onClick={() => setActiveStep(0)}
        >
          Iniziamo!
        </Button>
      </Box>
    </Stack>
  );
};
