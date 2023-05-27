import { db } from "../store/Firebase";
import { ref, set } from "firebase/database";

const databaseRef = ref(db, '/scores')

// Interface

interface UserScore {
  name: string,
  score: number
}

export const addNewScore = ( data: UserScore ) => {
  set(databaseRef, data)
  .then(() => {
    console.log("Data inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  })
}