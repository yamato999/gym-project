import { useEffect, useEffects, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { exerciseOptions, youtubeOptions, fetchData } from "../utils/fetchData";

import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

function ExerciseDetail() {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";
      const exerciseDetail = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetail);

      const exerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetail.name}`,
        youtubeOptions
      );
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExerciseData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetail.target}`,
        exerciseOptions
      );
      setTargetMuscleExercises(targetMuscleExerciseData);

      const equipmentExerciseData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetail.equipment}`,
        exerciseOptions
      );
      setEquipmentExercises(equipmentExerciseData);
    };
    fetchExerciseData();
  }, [id]);
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
}

export default ExerciseDetail;
