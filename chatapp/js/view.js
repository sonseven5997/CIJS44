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
            model.listenConversationsChange()
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
            })
            document.getElementById('new-conversation').addEventListener('click', () => {
                view.setActiveScreen('createConversationScreen')
            })
            break;
        case 'createConversationScreen' :
            document.getElementById('app').innerHTML = components.createConversationScreen
            document.getElementById('back-to-chat').addEventListener('click', () => {
              view.backToChatScreen()  
            })
            const createConversationForm = document.getElementById('create-conversation-form')
            createConversationForm.addEventListener('submit',(e) => {
                e.preventDefault()
                const data = {
                    title: createConversationForm.title.value,
                    friendEmail: createConversationForm.email.value
                }
                controller.createConversation(data)
            })
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
    document.querySelector('.list-message').innerHTML = ''
    for (let i=0; i<model.currentConversation.messages.length; i++){
        view.addMessage(model.currentConversation.messages[i])
    }
    document.querySelector('.conversation-detail .conversation-title').innerHTML = model.currentConversation.title
    view.addUsers()
}

view.addConversation = (conversation) => {
    const conversationWrapper = document.createElement('div')
    conversationWrapper.classList.add('conversation')
    if (conversation.id === model.currentConversation.id) {
        conversationWrapper.classList.add('current')
    }
    conversationWrapper.innerHTML = `
    <div class="conversation-title">${conversation.title}</div>
    <div class="conversation-num-user">${conversation.users.length} users</div>
    `
    document.querySelector('.list-conversation').appendChild(conversationWrapper)
    // const allConversations = document.querySelectorAll('.conversation')
    //         console.log(allConversations.length)
    //         for (let i=0; i<allConversations.length; i++) {
    //             allConversations[i].addEventListener('click', (e) => {
    //                 document.querySelector('.list-message').innerHTML = ''
    //                 model.currentConversation = model.conversations.find((x) => {
    //                     return x.id === allConversations[i].id
    //                 })
    //                 view.showCurrentConversation()
    //                 allConversations[i].classList.add('current')
    //                 for (let j=0; j<allConversations.length; j++){
    //                     if(j!==i){
    //                         allConversations[j].classList.remove('current')
    //                     }
    //                 }
    //             })
    //         }
    conversationWrapper.addEventListener('click', () => {
        document.querySelector('.current').classList.remove('current')
        conversationWrapper.classList.add('current')
        model.changeCurrentConversation(conversation.id)
    })
}

view.showConversations = () => {
    for (oneConversation of model.conversations) {
        view.addConversation(oneConversation,oneConversation.id)
    }
}

view.backToChatScreen = () => {
    document.getElementById('app').innerHTML = components.chatScreen
    const sendMessageForm = document.querySelector('#sendMessageForm')
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
    })
    document.getElementById('new-conversation').addEventListener('click', () => {
        view.setActiveScreen('createConversationScreen')
    })
    view.showConversations()
    view.showCurrentConversation()
}

view.addUsers = () => {
    document.querySelector('.list-users').innerText = ''
    for (let i=0; i<model.currentConversation.users.length; i++) {
        let userWrapper = document.createElement('div')
        userWrapper.classList.add('user')
        userWrapper.innerText = model.currentConversation.users[i]
        document.querySelector('.list-users').appendChild(userWrapper)
    }
}