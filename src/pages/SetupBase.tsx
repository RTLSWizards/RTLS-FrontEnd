import {
  Box,
  Center,
  HStack,
  IconButton,
  Spacer,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { SetupPage } from "./SetupPage";
import { SetupSite } from "./SetupSite";
import { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SetupNewDevices } from "./SetupNewDevices";
import { SetupSuccessfull } from "./SetupSuccessfull";
import { SetupTag } from "./SetupTag";

export const SetupBase = () => {
  const navigate = useNavigate();
  const [site, setSite] = useState<string>("");
  const steps = [
    { title: "Site", description: "Select a site" },
    { title: "Setup new Anchors", description: "" },
    { title: "Setup positions Anchors", description: "" },
    { title: "Setup tags", description: "" },
    { title: "Review", description: "Review" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: -1,
    count: steps.length,
  });

  const checkActiveStep = () => {
    switch (activeStep) {
      case -1:
        return <SetupPage setActiveStep={setActiveStep} />;
      case 0:
        return (
          <SetupSite
            setActiveStep={setActiveStep}
            setSite={setSite}
            site={site}
          />
        );
      case 1:
        return (
          <SetupNewDevices
            site={site}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <SetupTag
            site={site}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 3:
        return (
          <SetupTag
            site={site}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 4:
        return <SetupSuccessfull />;
      default:
        break;
    }
  };

  return (
    <Box w={"100%"} h={activeStep != 1 ? "90vh" : "full"} minH={"90vh"}>
      <Box shadow={"2xl"} borderRadius="3xl" m={30} h={"full"}>
        <Stepper index={activeStep} m={50} pt={50}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <HStack>
          <IconButton
            aria-label={"back"}
            icon={<ArrowBackIcon />}
            ml={10}
            onClick={() => {
              activeStep != -1 ? setActiveStep(activeStep - 1) : null;
            }}
          />
          <Spacer />
          <IconButton
            aria-label={"back"}
            icon={<FaHome />}
            mr={10}
            onClick={() => {
              navigate("/");
            }}
          />
        </HStack>
        <Center>{checkActiveStep()}</Center>
      </Box>
    </Box>
  );
};
