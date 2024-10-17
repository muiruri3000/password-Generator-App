


//Initialize Global Values. 
const inputDisplay = document.getElementById('passwordDisplay');
const sliderInput = document.getElementById('passSlider');
const generate = document.getElementById('generate');
const slideToValue = document.getElementById('slideToValue');
const btnDisplay = document.getElementById('btnDisplay');
const bars = document.querySelectorAll('.levl'); 
const strengthCat = document.querySelector('#strengthCat'); 




//copy function on button. 

btnDisplay.addEventListener('click',()=>{

 
   navigator.clipboard.writeText(inputDisplay.textContent)
   .then(()=>{
    alert('Copied Successfully!');    
   }).catch(err=>{
    console.error('Copy Failed!', err);
   })


});




sliderInput.oninput = function(){
    let length = this.value; 
    
    slideToValue.innerHTML = length;

    let min = this.min ? this.min : 0
    let max = this.min ? this.max: 100
    let percent = ((length - min) / (max-min)) * 100;
    this.style.background = `linear-gradient(to right, green ${percent}%, lightgrey ${percent}%)`;
   

}

document.addEventListener('submit',(e) => {
    
    e.preventDefault();
    


   const {useLowerCase,useNumbers,useUpperCase,useSymbols} = captureCheckboxState();
   const {password = '', strengthRate=0} = generatePassword(useLowerCase,useNumbers,useUpperCase,useSymbols,sliderInput.value) 

    updatePasswordDisplay(password);
    resetBarsColors();
    updateStrengthRate(strengthRate);
    updateStrengthCategory(strengthRate);



}); 

function updatePasswordDisplay(password){
    if(password){

        inputDisplay.innerHTML = password; 
    }else{
        inputDisplay.innerHTML = '<b>Please mark a checkbox!</b>'; 
    
    }
    
}

function resetBarsColors(){
   bars.forEach((bar,index)=>{
       if(index < bars.length){

           bar.style.backgroundColor = 'grey';
       }
   })

}


function updateStrengthRate(strengthRate){
    for(let i = 0; i < strengthRate; i++) {
        bars[i].style.backgroundColor = '#F8CD65';
    }
}

function updateStrengthCategory(strengthRate){
    const category = ['too weak','weak','medium','strong'];
    strengthCat.textContent = category[strengthRate -1];
}
function captureCheckboxState(){
 
    const useUpperCase = document.getElementById('uppercase').checked; //called within the function 
    const useLowerCase = document.getElementById('lowercase').checked;//to ensure the actual state
    const useNumbers = document.getElementById('numbers').checked;//is captured
    const useSymbols = document.getElementById('symbols').checked;
    
    return {useUpperCase,useLowerCase,useSymbols,useNumbers};

}
function generatePassword(useLowerCase,useNumbers,useUpperCase,useSymbols,passwordLength){
 
    let strengthRate = 0;
    let password = ''; 
    let charPool = '';
    
    let charSet = {
        nums:'123456789',
        symbs:'!@#$%&()_+[]{}<>?',
        uppercase:'ABCDEGFHIJKLMNOPQRSTUVWXYZ',
        lowercase:'abcdefghijklmnopqrstuvwxyz',
        
    }
    
    const enabledOptions = [
        {condition: useLowerCase, chars:charSet.lowercase},
        {condition: useUpperCase, chars:charSet.uppercase },
        {condition:useNumbers,chars:charSet.nums},
        {condition:useSymbols,chars:charSet.symbs},
    ]
    

    enabledOptions.forEach(option=>{
        if(option.condition){
            strengthRate++;
            password += getRandomChar(option.chars);
            charPool +=option.chars;
        }
    });

    if(!charPool){
        alert('Please mark atleast one checkbox!');
        return {password:'',strengthRate:0};
    }
    
    for(let i = password.length; i<passwordLength; i++){
        password += getRandomChar(charPool);
    }

    password = shuffleString(password);
 
    return {password,strengthRate}; 
}

function getRandomChar(charSet){
    return charSet[Math.floor(Math.random()*charSet.length)];
    
}
function shuffleString(str){
    return str.split('').sort(()=>0.5 - Math.random()).join('');
}



