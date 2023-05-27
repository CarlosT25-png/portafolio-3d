import { db } from "../store/Firebase";
import { ref, set, get, orderByChild, limitToLast, DataSnapshot, query } from "firebase/database";
import { v4 } from 'uuid';

// Interface
export interface UserScore {
  name: string;
  score: number;
}

export const addNewScore = async (data: UserScore) => {
  set(ref(db, 'scores/' + v4()), data)
    .then(() => {
      console.log("Data inserted successfully");
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
    });
};

export const getHighestScores = async () => {
  const q = query(ref(db, 'scores/'), orderByChild("score"), limitToLast(5));

  try {
    const snapshot: DataSnapshot = await get(q);
    const scores: UserScore[] = [];
    snapshot.forEach((childSnapshot) => {
      scores.push(childSnapshot.val() as UserScore);
    });
    return scores;
    // Do something with the highest scores
  } catch (error) {
    console.error("Error retrieving highest scores:", error);
  }
};