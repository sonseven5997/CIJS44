const controller = {}
controller.register = (registerInfo) => {
    if(registerInfo.firstName ===  '') {
        document.getElementById('error-first-name').innerText = 'Please input first name'
    }
    if(registerInfo.lastName === '') {
        document.getElementById('error-last-name').innerText = 'Please input last name'
    }
    if(registerInfo.email.indexOf('@') < 1) {
        document.getElementById('error-email').innerText = 'Your email is not validated. Please try again.'
    }
    if(registerInfo.password.length < 6) {
        document.getElementById('error-password').innerText = 'Your password is not validated. Please try again.'
        document.getElementById('error-confirm-password').innerText  = 'Your password is not validated. Please try again.'
    }
    if(registerInfo.confirmPassword !== registerInfo.password) {
        document.getElementById('error-confirm-password').innerText  = 'Confirm password wrong.'
    }
}

// controller.login = (loginInfo) => {

// }