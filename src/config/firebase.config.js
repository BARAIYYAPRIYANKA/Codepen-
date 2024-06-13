import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCQluplhFP7UTLqTok_XjjqaryiHQ4igmQ",
    authDomain: "codepen-clone-7fde5.firebaseapp.com",
    projectId: "codepen-clone-7fde5",
    storageBucket: "codepen-clone-7fde5.appspot.com",
    messagingSenderId: "799242766092",
    appId: "1:799242766092:web:5c3cd42667a02f8bfd2b29"
  };


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db};