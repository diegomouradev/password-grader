// SPECIFICATIONS:
    // It should accept an input that has at least 8 characters.
    // It should NOT accept more than 15 characters.

    // It should hide characters as they are typed.

    // It should update the 'requirement list' as requirements are met.
    // It should update the 'requirement list' to initial state if requirements are NOT met. (password deleted)

    // It should display 'Weak' if characters count === 8.
    // It should display 'Medium' if characters count >= 9 < 12.
    // It should display 'Strong' if characters count > 13.

    // If characters count >= 8 and requirements are met, 'confirm password input field should be enable.
    // If input value on 'confirm password' field is === to passwordPass, enable button 'check password'.
    // When 'check password button' is clicked, display alert containing 'password strength' + passwordPass.
    
// REQUIREMENTS:
    // It should have at least 10 characters.
    // It can have a maximum of 15 characters.
    // It should have at least 2 uppercase characters.
    // It should have at least 2 lowercase characters.
    // It should have at least 2 digits.
    // It should have at least 2 symbols.

(function () {
    let passwordSoFar = '';
    
    var App = {
        init: function() {
            this.setUpEventListeners();
        },
        setUpEventListeners: function() {
    
            let passwordInput = document.getElementById('password-field');
            passwordInput.addEventListener('input', function() {
                    App.buildPassword(event, passwordInput);
            });

            let passwordToggleView = document.getElementById('password-toggle');
            passwordToggleView.addEventListener('click', function(){
                App.togglePasswordView();
            });
        },
        buildPassword: function(event) {

            if(event.data){
                var inputValue =  event.data;
                passwordSoFar = passwordSoFar + inputValue;
                this.renderRequirements(passwordSoFar, inputValue);
            } else {
                passwordSoFar = '';
                let passwordInput = document.getElementById('password-field').value = '';
                this.resetRequirements(passwordSoFar);
            }
            
        },
        togglePasswordView: function() {
            
            let passwordInput = document.getElementById('password-field');
            let togglePasswordBtn = document.getElementById('password-btn');

            if(passwordInput.type === 'password'){
                passwordInput.type = 'text';
                togglePasswordBtn.classList.remove('fa-eye-slash');
                togglePasswordBtn.classList.add('fa-eye');
                

            } else {
                passwordInput.type = 'password';
                togglePasswordBtn.classList.remove('fa-eye');
                togglePasswordBtn.classList.add('fa-eye-slash');
            };
        },
        renderRequirements: function(passwordSoFar,inputValue) {

            let upperCasePass = document.getElementById('requirement__one');
            let lowerCasePass = document.getElementById('requirement__two');
            let symbolCasePass = document.getElementById('requirement__three');
            let numberCasePass = document.getElementById('requirement__four');

            if(inputValue === inputValue.toUpperCase() && isNaN(inputValue) && inputValue.match(/[^A-z\s\d][\\\^]?/g) === null) {
                if(passwordSoFar.match(/[A-Z]/g).length >= 2) {
                    upperCasePass.classList.add('passed');
                } 
            } else if(inputValue === inputValue.toLowerCase() && isNaN(inputValue) && inputValue.match(/[^A-z\s\d][\\\^]?/g) === null) {
                if(passwordSoFar.match(/[a-z]/g).length >= 2) {
                    lowerCasePass.classList.add('passed');
                }
            } else if(inputValue === Number(inputValue).toString()) {
                if(passwordSoFar.match(/[0-9]/g).length >= 2) {
                    numberCasePass.classList.add('passed');
                }
            } else if(!(passwordSoFar.match(/[^a-zA-Z0-9]/g) === null)) {
                if(passwordSoFar.match(/[^a-zA-Z0-9]/g).length >= 2) {
                    symbolCasePass.classList.add('passed');
                };
            };
            
            let passwordIsMatch = Boolean(passwordSoFar.match(/^((?=(.*[\d]){2,})(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*[^\w\d\s]){2,})).{8,15}$/g));
            
            if(passwordIsMatch) {
                let hasMinCharacter = document.getElementById('requirement__five');
                hasMinCharacter.classList.add('passed');
                this.renderStrength(passwordSoFar);
            };
        },
        resetRequirements: function (passwordSoFar) {

            let resetAllRequirements = document.querySelectorAll('li');
            resetAllRequirements.forEach(function(element) {
                element.classList.remove('passed');
            });

            let resetPasswordStrength = document.getElementById('password__strength').innerHTML = '';
        },
        renderStrength: function(passwordSoFar) {
            var passwordStrength = document.getElementById('password__strength');

            if(passwordSoFar.length === 8) {
                
                let weakInfo = {
                    strengthId: 'weak', 
                    strengthClass: 'display-strength', 
                    strengthTitle: 'Weak'
                };

                let templateStrength = `<span id='${weakInfo.strengthId}' class="${weakInfo.strengthClass}"><h3>${weakInfo.strengthTitle}</h3></span>`;

                passwordStrength.innerHTML = '';
                passwordStrength.insertAdjacentHTML('afterbegin', templateStrength);
                

            } else if(passwordSoFar.length >= 9 && passwordSoFar.length <= 12) {
                let mediumInfo = {
                    strengthId: 'medium', 
                    strengthClass: 'display-strength', 
                    strengthTitle: 'Medium'
                };

                let templateStrength = `<span id='${mediumInfo.strengthId}' class="${mediumInfo.strengthClass}"><h3>${mediumInfo.strengthTitle}</h3></span>`;

                passwordStrength.innerHTML = '';
                passwordStrength.insertAdjacentHTML('afterbegin', templateStrength);
                
            } else if (passwordSoFar.length > 13){
                let strongInfo = {
                    strengthId: 'strong', 
                    strengthClass: 'display-strength', 
                    strengthTitle: 'Strong'
                };

                let templateStrength = `<span id='${strongInfo.strengthId}' class="${strongInfo.strengthClass}"><h3>${strongInfo.strengthTitle}</h3></span>`;

                passwordStrength.innerHTML = '';
                passwordStrength.insertAdjacentHTML('afterbegin', templateStrength);
            };
        }
    };
    App.init();
})();