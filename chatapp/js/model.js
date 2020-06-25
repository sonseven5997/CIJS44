const model = {}
model.currentUser = undefined
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