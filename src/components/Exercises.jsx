import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Stack, Box, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

function Exercises({ exercises, setExercises, bodyPart }) {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastExercise = currentPage * 9;
  const indexOfFirstExercise = indexOfLastExercise - 9;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  console.log(bodyPart);
  useEffect(() => {
    const fetchExercisesData = async () => {
      let exerciseData = [];
      if (bodyPart === "all") {
        exerciseData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises?limit=300",
          exerciseOptions
        );
      } else {
        exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(exerciseData);
    };
    fetchExercisesData();
  }, [bodyPart]);
  return (
    <Box
      id="exercises"
      sx={{
        mt: {
          lg: "110px",
        },
      }}
      mt="50px"
      p="20px"
    >
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{
          gap: {
            lg: "110px",
            xs: "50px",
          },
        }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / 9)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
}

export default Exercises;
