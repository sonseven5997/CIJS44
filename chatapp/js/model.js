const model = {}
model.currentUser = undefined
model.collectionName = 'conversations'
model.currentConversation = undefined
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
    firebase.firestore().collection(model.collectionName).where('users','array-contains',model.currentUser.email).get().then(res => {
        const data = ultis.getDataFromDocs(res.docs) 
        model.conversations = data
        //console.log(data)
        if (data.length > 0){
            model.currentConversation = data[0]
            view.showCurrentConversation()
        }
       // console.log(ultis.getDataFromDocs(res.docs))
    })
}

model.addMessage = (message) => {
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message),
    }
    firebase.firestore().collection(model.collectionName).doc(model.docID).update(dataToUpdate)
}

model.listenConversationsChange = () => {
    let isFirstRun = false
    firebase.firestore().collection(model.collectionName).where('users','array-contains',model.currentUser.email)
    .onSnapshot((res) => {
        const docChanges = res.docChanges()
        console.log(docChanges)
        if (!isFirstRun){
            isFirstRun = true
            return
        }
        for (oneChange of docChanges) {
            const type = oneChange.type
            const oneChangeData = ultis.getDataFromDoc(oneChange.doc)
            console.log(oneChangeData)
            if (oneChangeData.id === model.currentConversation.id) {
                model.currentConversation = oneChangeData
                view.addMessage(oneChangeData.messages.length-1)
            }
        }
    })
}