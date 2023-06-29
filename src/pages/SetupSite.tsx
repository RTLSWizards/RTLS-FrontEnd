import { SiteGrid } from "../components/setup/SiteGrid";

export const SetupSite = ({
  setActiveStep,
  setSite,
  site,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setSite: React.Dispatch<React.SetStateAction<string>>;
  site: string | undefined;
}) => {
  return (
    <SiteGrid setActiveStep={setActiveStep} setSite={setSite} site={site} />
  );
};
