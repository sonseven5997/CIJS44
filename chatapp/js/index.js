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
    //templateQueryDatabase()
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if (user.emailVerified) {
                model.currentUser = {
                    displayName: user.displayName,
                    email: user.email
                }
                view.setActiveScreen('chatScreen')
            }
            else {
                view.setActiveScreen('chatScreen')
                alert('Please verify your email')
            }
            
        }
        else {
            view.setActiveScreen('registerScreen')
        }
    })
}

// templateQueryDatabase = () => {
//     const docID = 'UUKn5sd3CxmQ5V6a9WUE'
    
//     //get one
//     // firebase.firestore().collection('users').doc(docID).get().then((res) => {
//     //     console.log(getDataFromDoc(res))
//     //     console.log(res.data())
//     // }).catch((err) => {
//     //     console.log(err)
//     // })
//     //get many
//     firebase.firestore().collection('users').where('name','==','Nguyen Van A').get().then((res) => {
//         console.log(res)
//         console.log(getDataFromDocs(res.docs))
//     })
//     //create
//     const datatoCreate = {
//         name: 'Create',
//         age: 18,
//         email: 'sonseven5997@gmail.com',
//         phoneNumber: ['0123321']
//     }
//     firebase.firestore().collection('users').add(datatoCreate).then(res => {
//         alert('Added!')
//     })
//     //update
    // const docIDUpdate = '3OjGKkmLYrEnWN5Ca5l2'
    // const dataToUpdate = {
    //     age: 20,
    //     address: "HN",
    //     phone: firebase.firestore.FieldValue.arrayUnion('01210102')  ********************** //update da co san
    // }
    // firebase.firestore().collection('users').doc(docIDUpdate).update(dataToUpdate).then(res => {
    //     alert('Updated!')
    // })

//     //delete
//     const docIDdelete = 'nci5ekYz2AcSFlJ82Xnm'
//     firebase.firestore().collection('users').doc(docIDdelete).delete().then(res => {
//         alert('Deleted!')
//     })

// }


// getDataFromDoc = (doc) => {
//     const data = doc.data()
//     data.id = doc.id
//     return data
// }

// getDataFromDocs = (docs) => {
//     return docs.map(getDataFromDoc)
// }