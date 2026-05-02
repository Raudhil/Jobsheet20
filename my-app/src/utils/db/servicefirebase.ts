import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./firebase";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data();
}

export async function signIn(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const q = query(collection(db, "users"), where("email", "==", normalizedEmail));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  if (data.length > 0) {
    return data[0];
  }

  return null;
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const normalizedEmail = userData.email.trim().toLowerCase();
  const q = query(
    collection(db, "users"),
    where("email", "==", normalizedEmail)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));

  if (data.length > 0) {
    callback({
      status: "error",
      message: "Email already exists",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await addDoc(collection(db, "users"), {
    ...userData,
    email: normalizedEmail,
    password: hashedPassword,
    role: "member",
  });

  callback({
    status: "success",
    message: "User registered successfully",
  });
}

export async function signInWithGoogle(userData: any, callback: any) {
  try {
    const normalizedEmail = (userData.email as string).trim().toLowerCase();
    const payload = {
      ...userData,
      email: normalizedEmail,
    };

    const q = query(
      collection(db, "users"),
      where("email", "==", normalizedEmail)
    );

    const querySnapshot = await getDocs(q);
    const data: any = querySnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    if (data.length > 0) {
      payload.role = data[0].role;
      await updateDoc(doc(db, "users", data[0].id), payload);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: payload,
      });
    } else {
      payload.role = "member";
      await addDoc(collection(db, "users"), payload);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: payload,
      });
    }
  } catch {
    callback({
      status: false,
      message: "Failed to register user with Google",
    });
  }
}
