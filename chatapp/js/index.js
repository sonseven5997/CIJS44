window.onload = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyD6GPsSeJRGbFysgbddsagnnVETTrlvgho",
        authDomain: "chat-ci-44-5997.firebaseapp.com",
        databaseURL: "https://chat-ci-44-5997.firebaseio.com",
        projectId: "chat-ci-44-5997",
        storageBucket: "chat-ci-44-5997.appspot.com",
        messagingSenderId: "125787160417",
        appId: "1:125787160417:web:6e9ddd882f529ab1d0cf20"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase.app().name)
    view.setActiveScreen('registerScreen')
}