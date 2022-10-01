let isDOBOpen = false;
let DateofBirth;
const settingcog = document.getElementById('settingIcon');
const settingContentEl = document.getElementById('settingContent');
const initialText = document.getElementById('initialText');
const afterDOBBtnTxt = document.getElementById('afterDOBBtnTxt');
const dobButton = document.getElementById('dobButton');
const dobinput = document.getElementById('dobinput');

const yearel = document.getElementById('year');
const monthel = document.getElementById('month');
const dayel = document.getElementById('day');
const hourel = document.getElementById('hour');
const minutesel = document.getElementById('minutes');
const secondsel = document.getElementById('seconds');

const makeTwodigitnumber = (number) => {
    return number > 9 ? number : `0${number}`;
}



const toggleDateOfBirthSelector = () => {
    if(isDOBOpen)
    {
        settingContentEl.classList.add('hide');
    }
    else{
        settingContentEl.classList.remove('hide');
    }
    isDOBOpen = true;
   
}


const updateAge = () => {
    
    const currentDate = new Date();
    const datediff = currentDate - DateofBirth;
    const year = Math.floor(datediff/(1000 * 60 * 60 * 24 * 365));
    const month = Math.floor(datediff/(1000 * 60 * 60 * 24 * 365) % 12);
    const day = Math.floor(datediff/(1000 * 60 * 60 * 24 ) % 30);
    const hour = Math.floor(datediff/(1000 * 60 * 60 ) % 24);
    const minute = Math.floor(datediff/(1000 * 60 ) % 60);
    const second = Math.floor(datediff/(1000 ) % 60);
    
     yearel.innerHTML = makeTwodigitnumber(year);
     monthel.innerHTML = makeTwodigitnumber(month);
     dayel.innerHTML = makeTwodigitnumber(day);
     hourel.innerHTML = makeTwodigitnumber(hour);
     minutesel.innerHTML = makeTwodigitnumber(minute);
     secondsel.innerHTML = makeTwodigitnumber(second);
     

}



const localstorageGetter = () => {
    const year = localStorage.getItem('year');
    console.log(year);
    const month = localStorage.getItem('month');
    console.log(month);
    const date = localStorage.getItem('date');
    console.log(date);
     if (year && month && date){
         DateofBirth = new Date(year,month,date);
     }
     updateAge();
}

const contentToggler = () => {
    updateAge()
    if(DateofBirth)
    {
        localStorage.setItem("year",DateofBirth.getFullYear());
        localStorage.setItem("month",DateofBirth.getMonth());
        localStorage.setItem("date",DateofBirth.getDate());
        initialText.classList.add('hide');
        afterDOBBtnTxt.classList.remove('hide');
        setInterval(() => {
           updateAge() 
        }, 1000);
    }
    else{
        afterDOBBtnTxt.classList.add('hide');
        initialText.classList.remove('hide');
    }
}



const   setDoBHandler = () => {
    const dateString = dobinput.value;
    DateofBirth = dateString ? new Date( dateString) : null;
  
    if(DateofBirth)
    {
        localStorage.setItem("year",DateofBirth.getFullYear());
        localStorage.setItem("month",DateofBirth.getMonth());
        localStorage.setItem("date",DateofBirth.getDate());
    }
        
    
     setInterval(() => {
        updateAge() 
     }, 1000);
     contentToggler();
} 


localstorageGetter();
contentToggler();
setDoBHandler();


settingcog.addEventListener('click',toggleDateOfBirthSelector)
dobButton.addEventListener('click',setDoBHandler)