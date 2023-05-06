import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyDgcIYGpFovWyEWo4UC0aEah56ABMfhpDE',
  authDomain: 'hangmi-scoreboard.firebaseapp.com',
  projectId: 'hangmi-scoreboard',
  storageBucket: 'hangmi-scoreboard.appspot.com',
  messagingSenderId: '231528633919',
  appId: '1:231528633919:web:adfedfb9cf19f7ca344a8a',
  databaseURL:
    'https://hangmi-scoreboard-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
