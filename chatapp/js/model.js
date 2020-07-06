const model = {}
model.currentUser = undefined
model.collectionName = 'conversations'
model.curentConversation = undefined
model.docID = '7nP89Y7Ob32MtpwrHycn'
model.register = (firstName, lastName, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log(user)
        alert('Register success, please check your email!')
        firebase.auth().currentUser.sendEmailVerification()
        firebase.auth().currentUser.updateProfile({
            displayName : firstName + ' ' + lastName
        })
        view.setActiveScreen('loginScreen')
    }).catch((err) => {
        console.log(err)
        alert(err.message)
    })
}

model.login = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        console.log(user)
        if (user.user.emailVerified) {
            model.currentUser = {
                displayName: user.user.displayName,
                email: user.user.email
            }
            view.setActiveScreen('chatScreen')
        } else {
            alert('Please verify your email!')
        }
    }).catch((err) => {
        alert(err.message)
        console.log(err)
    })
}

model.loadConversations = () => {
    firebase.firestore().collection(model.collectionName).get().then(res => {
        const data = ultis.getDataFromDocs(res.docs) 
        if (data.length > 0){
            model.curentConversation = data[0]
            view.showCurrentConversation()
        }
        console.log(ultis.getDataFromDocs(res.docs))
    })
}