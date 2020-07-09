const components = {}
components.welcomeScreen = `
    <div>Welcome to chat app</div>
`

components.registerScreen = `
        <div class="register-container">
            <div class="register-form">
                <div class="title">MindX Chat</div>
                <form action="" id="form-register">
                    <div class="name-wrapper">
                        <div class="input-wrapper">
                            <input type="text" name="firstName" placeholder="First Name ...">
                            <div class="error" id="error-first-name"></div>
                        </div>
                        <div class="input-wrapper">
                            <input type="text" name="lastName" placeholder="Last Name ...">
                            <div class="error" id="error-last-name"></div>
                    </div>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" name="email" placeholder="Email ...">
                        <div class="error" id="error-email"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" name="password" placeholder="Password ...">
                        <div class="error" id="error-password"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" name="confirmPassword" placeholder="Confirm password ...">
                        <div class="error" id="error-confirm-password"></div>
                    </div>
                    <div class="submit-wrapper">
                        <div>Already have an account? <span class="cursor-pointer" id="redirect-to-login">Login</span></div>
                        <button type="submit" class="btn">Register</button>
                    </div>
                </form>
            </div>
        </div>
`

components.loginScreen = `
        <div class="login-container">
            <div class="login-form">
                <div class="title">MindX Chat</div>
                <form action="" id="login-form">
                    <div class="input-wrapper">
                        <input type="text" name="email" placeholder="Email ...">
                        <div class="error" id="error-email"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" name="password" placeholder="Password ...">
                        <div class="error" id="error-password"></div>
                    </div>
                    <div class="submit-wrapper">
                        <div>Don't have an account? <span class="cursor-pointer" id="redirect-to-register">Register</span></div>
                        <button type="submit" class="btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
`

components.chatScreen = `
    <div class="chat-header">MindX Chat</div>        
    <div class="chat-container">
        <div class="aside-right">
            <div class="list-conversation">
            </div>
        </div>
        <div class="main">
            <div class="conversation-detail">
                <div class="conversation-title">
                    First conversation
                </div>
                <div class="list-message">
                    <div class="message their">
                    </div>
                    <div class="message mine">
                    </div>
                </div>
                <form action="" id="sendMessageForm">
                    <input class="input" type="text" autocomplete="off" name="message"
                        placeholder="Type a message ...">
                    <button class="btn"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                </form>
            </div>
        </div>
    </div>

`