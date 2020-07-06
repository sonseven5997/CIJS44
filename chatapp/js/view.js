const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'registerScreen':
            document.getElementById('app').innerHTML = components.registerScreen
            const registerForm = document.getElementById('form-register')
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const registerInfo = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value
                }
                controller.register(registerInfo)
            })
            const redirectToLogin = document.getElementById('redirect-to-login')
            redirectToLogin.addEventListener('click', (e) => {
                view.setActiveScreen('loginScreen')
            })
            break;
        case 'loginScreen':
            document.getElementById('app').innerHTML = components.loginScreen
            const loginForm = document.getElementById('login-form')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const loginInfo = {
                    email: loginForm.email.value,
                    password: loginForm.password.value
                }
                controller.login(loginInfo)
            })
            const redirectToRegister = document.getElementById('redirect-to-register')
            redirectToRegister.addEventListener('click', (e) => {
                view.setActiveScreen('registerScreen')
            })
            break;
        case 'chatScreen' :
            document.getElementById('app').innerHTML = components.chatScreen
            const sendMessageForm = document.querySelector('#sendMessageForm')
            model.loadConversations()
            sendMessageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const message = {
                    owner: model.currentUser.email,
                    content: sendMessageForm.message.value
                }
                const messageToUpdate = {
                    'messages.content': firebase.firestore.FieldValue.arrayUnion(message.content)
                }
                if (sendMessageForm.message.value.trim() !== ''){
                    view.addMessage(message)
                    //view.addMessage(messageFromBot)
                }
                sendMessageForm.message.value = ''
                firebase.firestore().collection(model.collectionName).doc(model.docID).update(messageToUpdate).then(res => {
                    
                })
            })
            
            break;
    }
}

view.setErrorMessage = (elementID, message) => {
    document.getElementById(elementID).innerText = message
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message')
    if (model.currentUser.email === message.owner) {
        messageWrapper.classList.add('mine')
        messageWrapper.innerHTML = `
            <div class="content">${message.content}</div>
        `
    }
    else {
        messageWrapper.classList.add('their')
        messageWrapper.innerHTML = `
            <div class="owner">${message.owner}</div>
            <div class="content">${message.content}</div>
        `
    }
    const listMessage = document.querySelector('.list-message')
    listMessage.scrollTop = listMessage.scrollHeight
    document.querySelector('.list-message').appendChild(messageWrapper)
}

view.showCurrentConversation = () => {
    for (let i=0; i<model.currentConversation.content.length; i++){
        let message = {
            owner: model.currentConversation.owner,
            content: model.currentConversation.content[i]
        }
        view.addMessage(message)
    }
}