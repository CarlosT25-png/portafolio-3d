import { db } from "../store/Firebase";
import { ref, set, get } from "firebase/database";

const scoresRef = ref(db, '/scores')

// Interface

interface UserScore {
  name: string,
  score: number
}

export const addNewScore = ( data: UserScore ) => {
  set(scoresRef, data)
  .then(() => {
    console.log("Data inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  })
}

export const getScores = () => {
  get(scoresRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const scores: UserScore[] = Object.values(snapshot.val());
        console.log("Scores:", scores);
        // Do something with the scores
      } else {
        console.log("No scores found");
      }
    })
    .catch((error) => {
      console.error("Error retrieving scores:", error);
    });
};