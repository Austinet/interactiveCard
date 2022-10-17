let cardForm = document.getElementById('card-form')
let completed = document.getElementById('completed')
let errorCodesArray = document.querySelectorAll('.errorContainer');
let inputsArray = document.querySelectorAll('input')
let continueBtn = document.getElementById('continue-btn')

//Card display
let holder = document.querySelector('.card-user')
let userCardNumber = document.querySelector('.card-number')
let userCardExpiryMonth = document.querySelector('#card-month')
let userCardExpiryYear = document.querySelector('#card-year')
let userCvc = document.querySelector('.cvc-number')

//oninput event listeners to update card 
cardForm.cardHolder.addEventListener("input", ()=>{
  holder.innerHTML = cardForm.cardHolder.value;
})

cardForm.cardNumber.addEventListener("input", ()=>{
  userCardNumber.innerHTML = cardForm.cardNumber.value;
})

cardForm.cvc.addEventListener("input", ()=>{
  userCvc.innerHTML = cardForm.cvc.value;
})

cardForm.cardExpiryMonth.addEventListener("input", ()=>{
  userCardExpiryMonth.innerHTML = cardForm.cardExpiryMonth.value;
})

cardForm.cardExpiryYear.addEventListener("input", ()=>{
  userCardExpiryYear.innerHTML = cardForm.cardExpiryYear.value;
})

//Error handlers

function errorHandler(element, index, errorType) {
  //Error codes
  let blankInput = "Can't be blank"
  let wrongFormat = "Wrong format, numbers only"

  if(errorType === "blank") {
    errorCodesArray[element].innerHTML = blankInput
  } else {
    errorCodesArray[element].innerHTML = wrongFormat
  }

  errorCodesArray[element].style.display='block'
  inputsArray[index].classList.add('red-outline')
}

cardForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  inputsArray.forEach(element => {
    element.classList.remove('red-outline')
  })

  errorCodesArray.forEach(element => {
    element.style.display = 'none';
  })

//Basic validation
 if(cardForm.cardHolder.value.trim() === "") {
    errorHandler(0, 0, "blank")
  } else if (cardForm.cardNumber.value.trim() === "" || !(/^[0-9\s]+$/.test(cardForm.cardNumber.value))) {
    let errorCodeType = cardForm.cardNumber.value.trim() === "" ?  "blank" : "Wrong format"
    errorHandler(1, 1, errorCodeType)
  } else if (cardForm.cardExpiryMonth.value.trim() === "" || isNaN(cardForm.cardExpiryMonth.value)) {
     errorCodeType = cardForm.cardExpiryMonth.value.trim() === "" ?  "blank" : "Wrong format"
     errorHandler(2, 2, errorCodeType)
  } else if (cardForm.cardExpiryYear.value.trim() === "" || isNaN(cardForm.cardExpiryYear.value)) {
    errorCodeType = cardForm.cardExpiryYear.value.trim() === "" ?  "blank" : "Wrong format"
    errorHandler(2, 3, errorCodeType)
  } else if (cardForm.cvc.value.trim() === "" || isNaN(cardForm.cvc.value)) {
    errorCodeType = cardForm.cvc.value.trim() === "" ?  "blank" : "Wrong format"
    errorHandler(3, 4, errorCodeType)
  } else {
    let newUser = {
      cardHolder: cardForm.cardHolder.value,
      cardNumber: cardForm.cardNumber.value,
      cvc: cardForm.cvc.value,
      cardExpiryMonth: cardForm.cardExpiryMonth.value,
      cardExpiryYear: cardForm.cardExpiryYear.value
    }

    inputsArray.forEach(element => {
      element.value = ""
    })
 
    cardForm.classList.add('hidden')
    completed.classList.remove('hidden')
 
   printCardDetails(newUser)
  }
})

//Display card details on the card
function printCardDetails(newUser) {
    userCardNumber.innerHTML = newUser.cardNumber
    holder.innerHTML = newUser.cardHolder
    userCardExpiryMonth.innerHTML = newUser.cardExpiryMonth
    userCardExpiryYear.innerHTML = newUser.cardExpiryYear
    userCvc.innerHTML = newUser.cvc
}


//Reset card using the complete button
continueBtn.addEventListener('click', ()=>{
    window.location = './'
})