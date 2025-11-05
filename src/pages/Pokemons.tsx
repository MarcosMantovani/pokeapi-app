import { MainLayout } from "../components";
import BasePageLayout from "../components/BasePageLayout";

const Pokemons = () => {
  return (
    <BasePageLayout
      sx={{
        display: "flex",
        margin: "0 auto",
        height: "100vh",
        width: { xs: "100%", md: "70%" },
      }}
    >
      <MainLayout />
    </BasePageLayout>
  );
};

export default Pokemons;
