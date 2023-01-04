const characterValue = document.querySelector('#password-length');
const characterValueDisplay = document.querySelector('.password-length__value');
const passwordResult = document.querySelector('#password');
const defaultPassword = "P4$5W0rD!";

characterValue.addEventListener('input', function(e) {
    characterValueDisplay.textContent = characterValue.value;

    let target = e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = (val - min) * 100 / (max -min) + '% 100%'
    if (parseInt(characterValue.value) === 0){
        passwordResult.classList.add('text-blur')
    }else{
        passwordResult.classList.remove('text-blur')
    }

});

// Copy to clipboard
const copyBtn = document.querySelector('.copy-icon');
const copyWarning = document.querySelector('.copy-password__label');
copyBtn.addEventListener('click', () => {
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(passwordResult.textContent);
            console.log('Copied to clipboard!');
            copyWarning.classList.remove('hidden');
            setTimeout(() => {
                copyWarning.classList.add('hidden');
            },5000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    }
    copyToClipboard();
})

function checkPasswordStrength(password) {
    // Set the default strength to 0
    let strength = 0;
  
    // Check the length of the password
    if (password.length >= 8) {
      strength += 1;
    }
    if (password.length >= 12) {
      strength += 1;
    }
    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      strength += 2;
    }
  
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      strength += 2;
    }
  
    // Check for numbers
    if (/[0-9]/.test(password)) {
      strength += 2;
    }
  
    // Check for special characters
    if (/[!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      strength += 2;
    }
    if(password.length <= 4){
        strength -= 3;
    }
    if (password.length <= 8){
        strength -= 2;
    }
    // Return the strength
    return strength;
  }
//Generate password

function generatePassword(length, options) {
    if (parseInt(length)===0){
        return "";
    }
    //4 options
        //1. Lowercase //value 2
        //2. Uppercase //value 1
        //3. Numbers // value 3
        //4. Symbol // value 4
    const charOptions = [];
    charOptions.push("abcdefghijklmnopqrstuvwxyz");
    charOptions.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    charOptions.push("0123456789");
    charOptions.push("!@#$%^&*()_+-=[]{}|;':,.<>?");


    let password = "";
    let randOptions;
    for (let i = 0; i < length; i++) {
        let character;
        while (character === undefined){
            randOptions = Math.floor(Math.random() * 4)
            if (options[randOptions]){
                character = charOptions[randOptions].charAt(Math.floor(Math.random() * charOptions[randOptions].length)) ;
            }
        }
      password += character;
    }

    return password;
  }

const uppercaseCheck = document.querySelector('#password-uppercase'); 
const lowercaseCheck = document.querySelector('#password-lowercase');
const numbersCheck = document.querySelector('#password-numbers');
const symbolsCheck = document.querySelector('#password-symbols')

const generateBtn = document.querySelector('.generate-password__button');

const strengthMsg = document.querySelectorAll('.strength-msg');
const strengthBars = document.querySelectorAll('.strength-bar__item')
generateBtn.addEventListener('click', () => {
    for (let i = 0; i < 4; i++){
        strengthBars[i].classList.remove('s');
        strengthBars[i].classList.remove('m');
        strengthBars[i].classList.remove('w');
        strengthBars[i].classList.remove('tw');
        if (!strengthMsg[i].classList.contains('hidden')){
            strengthMsg[i].classList.add('hidden');
        }
    }
    
    const option = [
             uppercaseCheck.checked,
             lowercaseCheck.checked,
             numbersCheck.checked,
             symbolsCheck.checked
    ]
    if (characterValue.value > 0){
    const password = generatePassword(characterValue.value, option);    
    const passwordStrength = checkPasswordStrength(password);  
    let n;
    let active;
    
    if (passwordStrength >=7){
        n=4;
        active = "s";
    }else if (passwordStrength > 5){
        n=3;
        active = "m";
    }else if (passwordStrength >= 3){
        n=2;
        active = "w";
    }
    else {
        n = 1;
        active = "tw";
    }
    // console.log(passwordStrength,n,active);
    for (let i = 0; i < n; i++){
        strengthBars[i].classList.add(active);
    }
    strengthMsg[n - 1].classList.remove('hidden')
    passwordResult.textContent = password;
}
})