import firebase from 'firebase'; // 4.8.1

class Fire {
  constructor() {
    var config={
      apiKey: "AIzaSyBkpt6HFwXiU09qrc7Jk1BvWLGsDx5U9j4",
      authDomain: "login2-6d807.firebaseapp.com",
      databaseURL: "https://login2-6d807.firebaseio.com",
      projectId: "login2-6d807",
      storageBucket: "login2-6d807.appspot.com",
      messagingSenderId: "803075299968",
      appId: "1:803075299968:web:7abd54fb0b5a88d3e92465",
      measurementId: "G-VPMHGQ9VLC"
    };
    if(!(firebase.apps.length)){
      const fb = firebase.initializeApp(config);}
    this.observeAuth();
  }
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
