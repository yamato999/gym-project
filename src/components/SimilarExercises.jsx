import { Box, Stack, Typography } from "@mui/material";
import HorizonalScrollBar from "./HorizonalScrollBar";
import Loader from "./Loader";

function SimilarExercises({ targetMuscleExercises, equipmentExercises }) {
  return (
    <Box
      sx={{
        mt: {
          lg: "100px",
          xs: "0",
        },
      }}
    >
      <Typography variant="h3" mb={5}>
        Exercises that target the same muscle group
      </Typography>
      <Stack
        direction="row"
        sx={{
          p: "2",
          position: "relative",
        }}
      >
        {targetMuscleExercises.length ? (
          <HorizonalScrollBar data={targetMuscleExercises} />
        ) : (
          <Loader />
        )}
      </Stack>
      <Typography variant="h3" mb={5}>
        Exercises that uses the same equipment
      </Typography>
      <Stack
        direction="row"
        sx={{
          p: "2",
          position: "relative",
        }}
      >
        {equipmentExercises.length ? (
          <HorizonalScrollBar data={equipmentExercises} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
}

export default SimilarExercises;
