const controller = {}
controller.register = (registerInfo) => {
    if (registerInfo.firstName === '') {
        view.setErrorMessage('error-first-name', 'Please input first name')
    } else {
        view.setErrorMessage('error-first-name', '')
    }
    if (registerInfo.lastName === '') {
        view.setErrorMessage('error-last-name', 'Please input last name')
    } else {
        view.setErrorMessage('error-last-name', '')
    }
    if (registerInfo.email ===  '') {
        view.setErrorMessage('error-email', 'Your email is not validated. Please try again.')
    } else {
        view.setErrorMessage('error-email', '')
    }
    if (registerInfo.password === '') {
        view.setErrorMessage('error-password', 'Your password is not validated. Please try again.')
        view.setErrorMessage('error-confirm-password', 'Your password is not validated. Please try again.')
        return
    } else {
        view.setErrorMessage('error-password', '')
        view.setErrorMessage('error-confirm-password', '')
    }
    if (registerInfo.confirmPassword !== registerInfo.password) {
        view.setErrorMessage('error-confirm-password', 'Confirm password wrong.')
        return
    } else {
        view.setErrorMessage('error-confirm-password', '')
    }
    if (registerInfo.firstName !== '' && registerInfo.lastName !== '' && registerInfo.email !== '' && registerInfo.password !== '') {
        model.register(registerInfo.firstName, registerInfo.lastName, registerInfo.email, registerInfo.password)
    }
}

controller.login = ({ email, password }) => {
    if (email === '') {
        view.setErrorMessage('error-email', 'Please input email')
    } else {
        view.setErrorMessage('error-email', '')
    }
    if (password === '') {
        view.setErrorMessage('error-password', 'Please input password')
    } else {
        view.setErrorMessage('error-password', '')
    }
    if(email !== '' && password !== ''){
        model.login(email,password)
    }
}

controller.createConversation = ({title, friendEmail}) => {
    view.setErrorMessage('conversation-name-error', title === '' ? 'Please input title' : '')
    view.setErrorMessage('conversation-email-error', friendEmail === '' ? 'Please input friend email' : '')
    if (title !== '' && friendEmail !== '') {
        model.createConversation({
            title,
            users: [friendEmail,model.currentUser.email],
            createdAt: new Date().toISOString(),
            messages: []
        })
    }
}

controller.addUser = (email) => {
    view.setErrorMessage('add-user-email-error', email === '' ? 'Please input email' : '')
    model.addUser(email)
}

controller.validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}