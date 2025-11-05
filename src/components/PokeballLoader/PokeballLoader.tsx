import { Box } from "@mui/material";
import styles from "./PokeballLoader.module.css";

export default function PokeballLoader() {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.ball} />
    </Box>
  );
}
