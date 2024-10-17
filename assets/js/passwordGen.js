
const inputDisplay = document.getElementById('passwordDisplay');
const sliderInput = document.getElementById('passSlider');
const generate = document.getElementById('generate');
const slideToValue = document.getElementById('slideToValue');
const btnDisplay = document.getElementById('btnDisplay');
const bars = document.querySelectorAll('.levl'); 
const strengthCat = document.querySelector('#strengthCat'); 




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
    
    const values =  captureCheckboxState();

   const {useLowerCase,useNumbers,useUpperCase,useSymbols} = values; 
const result = generatePassword(useLowerCase,useNumbers,useUpperCase,useSymbols,sliderInput.value) 
const {password = '', strengthRate=0} = result;

if(password){

    inputDisplay.innerHTML = password; 
}else{
    inputDisplay.innerHTML = '<b>Please mark a checkbox!</b>'; 

}

// Reset all bars to grey
for(let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = 'grey';
}

// Set the first 'strengthRate' bars to red
for(let i = 0; i < strengthRate; i++) {
    bars[i].style.backgroundColor = '#F8CD65';
}

// Update the strength category text
switch (strengthRate) {
    case 1:
        strengthCat.textContent = 'Too Weak';
        break;
    case 2:
        strengthCat.textContent = 'Weak';
        break;
    case 3:
        strengthCat.textContent = 'Medium';
        break;
    case 4:
        strengthCat.textContent = 'Strong';
        break;
    default:
        strengthCat.textContent = '';
}

}); 


function captureCheckboxState(){
 
    const useUpperCase = document.getElementById('uppercase').checked; //called within the function 
    const useLowerCase = document.getElementById('lowercase').checked;//to ensure the actual state
    const useNumbers = document.getElementById('numbers').checked;//is captured
    const useSymbols = document.getElementById('symbols').checked;
    
    return {useUpperCase,useLowerCase,useSymbols,useNumbers};

}
function generatePassword(useLowerCase,useNumbers,useUpperCase,useSymbols,passwordLength){
    let nums = '123456789'; 
    let symbs = '!@#$%&()_+[]{}<>?';
    let uppercase = 'ABCDEGFHIJKLMNOPQRSTUVWXYZ'; 
    let lowercase = 'abcdefghijklmnopqrstuvwxyz'; 
    let strengthRate = 0; 
    
    
    let password = ''; 
    let charPool = '';
    if(useUpperCase){
        strengthRate += 1;
        charPool += uppercase; 
        password += uppercase[Math.floor(Math.random() * uppercase.length)]; //atleast one
    }


    if(useLowerCase){
        strengthRate += 1;
        charPool += lowercase; 
        password += lowercase[Math.floor(Math.random() * lowercase.length)]; 
    }

    if(useNumbers){
        strengthRate += 1;
        charPool += nums; 
        password += nums[Math.floor(Math.random() * nums.length)]; 

    }
    if(useSymbols){
        strengthRate += 1;
        charPool += symbs; 
        password += symbs[Math.floor(Math.random() * symbs.length)]; 
    }

    if(!charPool){
        alert('Please mark atleast one checkbox!');
        return {password:'',strengthRate:0};
    }

    for(let i = password.length; i< passwordLength; i++){
        password += charPool[Math.floor(Math.random() * charPool.length)]; 
    }


    password = password.split('').sort(()=>0.5 - Math.random()).join('');
    return {password,strengthRate}; 
}



