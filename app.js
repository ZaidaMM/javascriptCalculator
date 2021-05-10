const calculator = document.querySelector('.calculator-grid');
const keys = calculator.querySelector('.data-keys');
const display = document.querySelector('#display');
 // convert string into a float(incl decimal places)
 const calculate = (n1, operator, n2) => {
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2); 
  } else if (operator === 'divide' ){
    result = parseFloat(n1) / parseFloat(n2);
  }
  return result
}


keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType

  if(!action) {
    if(displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
      display.textContent = keyContent;
    } else {
      display.textContent = displayedNum + keyContent;
    }
    calculator.dataset.previousKeyType = 'number'

    //Remove .is-selected class from all keys
    Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-selected'));

   
  }
  if(
    action === 'add' || 
    action === 'subtract' || 
    action === 'multiply' || 
    action === 'divide' 
  ){
    // Calculate firstValue, operator, secondValue 
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
       const calcValue = calculate(firstValue, operator, secondValue)
       display.textContent = calcValue
       calculator.dataset.firstValue = calcValue
    } else {
      calculator.dataset.firstValue = displayedNum;

      const previousKeyType = calculator.dataset.previousKeyType
    }
  

    // Add .is-selected class to operator
    key.classList.add('is-selected')
    // Add attribute
    calculator.dataset.previousKeyType = 'operator';    
    calculator.dataset.operator = action;

    
  }
   

  if (action === 'decimal') {
    if (!displayedNum.includes('.')) {
    display.textContent = displayedNum + '.';
    } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
      display.textContent = '0.';
    }
    calculator.dataset.previousKeyType = 'decimal';
  }
  if (action === 'clear') {
    calculator.dataset.firstValue = '';
    calculator.dataset.modValue = '';
    calculator.dataset.operator = '';

    calculator.dataset.previousKeyType = '';

    display.textContent = 0;

    calculator.dataset.previousKeyType = 'clear';
  }


  if (action === 'delete') {
    display.textContent = 0
    calculator.dataset.previousKeyType = 'delete';
  }
  if (action === 'calculate') {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    if (firstValue) {
      if (previousKeyType === 'calculate') {
        firstValue = displayedNum
        secondValue = calculator.dataset.modValue;
       
      }
      display.textContent = calculate(firstValue, operator, secondValue);
      // Set modValue attribute to sevondValue (modifier value)
    calculator.dataset.modValue = secondValue;
    calculator.dataset.previousKeyType = 'calculate';
    }
   
   
    
    }
  }
  


});

 