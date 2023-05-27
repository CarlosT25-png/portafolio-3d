import { db } from "../store/Firebase";
import { ref, set, get, orderByChild, limitToLast, DataSnapshot, query } from "firebase/database";
import { v4 } from 'uuid';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Auth
const USER_EMAIL = import.meta.env.VITE_EMAIL!;
const USER_PWD = import.meta.env.VITE_PASSWORD!;

// Interface
export interface UserScore {
  name: string;
  score: number;
}

export const addNewScore = async (data: UserScore) => {
  // Authenticate the user
  const auth = getAuth();
  try {
    console.log(USER_EMAIL)
    await signInWithEmailAndPassword(auth, USER_EMAIL, USER_PWD);
    console.log("User authenticated successfully");
  } catch (error) {
    console.error("Error authenticating user:" + USER_EMAIL, error);
    return;
  }

  console.log(data);
  set(ref(db, 'scores/' + v4()), data)
    .then(() => {
      console.log("Data inserted successfully");
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
    });
};

export const getHighestScores = async () => {
  // Authenticate the user
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, USER_EMAIL, USER_PWD);
    console.log("User authenticated successfully");
  } catch (error) {
    console.error("Error authenticating user:", error);
    return;
  }

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