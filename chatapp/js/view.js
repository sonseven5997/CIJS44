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
                    content: sendMessageForm.message.value,
                    createdAt: new Date().toISOString()
                }
                console.log(message)
                if (sendMessageForm.message.value.trim() !== ''){
                    model.addMessage(message)
                }
                sendMessageForm.message.value = ''
                model.loadConversations()
                model.listenConversationsChange()
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
    for (let i=0; i<model.currentConversation.messages.length; i++){
        view.addMessage(model.currentConversation.messages[i])
    }
}

view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.classList.add('conversation')
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-user">${conversation.users.length}</div>
    `
    document.querySelector('.list-conversation').appendChild(conversation)
}

view.showConversations = () => {
    for (oneConversation of model.conversations) {
        view.addConversation(oneConversation)
    }
}