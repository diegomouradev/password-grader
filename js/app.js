(function () {
    // let inputValue;
    let passwordSoFar = '';

    var App = {
        init: function() {
            this.setUpEventListeners();
        },
        setUpEventListeners: function() {
    
            let passwordInput = document.getElementById('password');
            passwordInput.addEventListener('input', function() {
                App.checkInput(event);
            });       
        },
        checkInput: function(event) {
            
            let inputValue = event.data;
            passwordSoFar = passwordSoFar + inputValue;

            if (passwordSoFar.length >= 10) {
                this.renderRequirements(passwordSoFar);
    
            } else if (passwordSoFar.length < 10) {
                this.renderRequirements(inputValue);
            }
            
        },
        renderRequirements: function(inputValue) {
            
            if(inputValue && passwordSoFar.length < 10) {
    
                if(inputValue.match(/[A-Z]/g)) {
                    let upperCasePass = document.getElementById('requirement__one');
                    upperCasePass.classList.add('passed');
                } else if (inputValue.match(/[a-z]/g)) {
                    let lowerCasePass = document.getElementById('requirement__two');
                    lowerCasePass.classList.add('passed');
                } else if (inputValue.match(/[^a-zA-Z0-9]/g)) {
                    let symbolCasePass = document.getElementById('requirement__three');
                    symbolCasePass.classList.add('passed');
                } else if (inputValue.match(/[\d]/g)) {
                    let numberCasePass = document.getElementById('requirement__four');
                    numberCasePass.classList.add('passed');
                };
            } else {

                let passwordIsMatch = Boolean(passwordSoFar.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/g));
                
                if(passwordIsMatch === true) {
                    let passwordPass = document.getElementById('requirement__five');
                    passwordPass.classList.add('passed');
                };
            };
        }
    };
    App.init();
})();