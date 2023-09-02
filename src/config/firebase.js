import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAOIWwQSMdljEwIkERR65riE7nxW1TigRU",
  authDomain: "upx6-tin1.firebaseapp.com",
  projectId: "upx6-tin1",
  storageBucket: "upx6-tin1.appspot.com",
  messagingSenderId: "1032261187804",
  appId: "1:1032261187804:web:c80af9d66cc3a122f35c19",
  measurementId: "G-26YXLQTBHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

console.log("Firebase initialized successfully!");
function addTestData() {
  const testRef = ref(database, 'test/data');
  set(testRef, {
    name: "Sample Data",
    description: "This is a test entry."
  });
}
