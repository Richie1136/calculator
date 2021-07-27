class Calculator {
  constructor(previousOperan, currentOperan) {
    this.previousOperan = previousOperan
    this.currentOperan = currentOperan
    this.clear()
  }
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  addNumb(number) {
    if (number == '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseanOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.computeNumber()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  computeNumber() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const cur = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(cur)) return
    switch (this.operation) {
      case '+':
        computation = prev + cur
        break;
      case '-':
        computation = prev - cur
        break;
      case '*':
        computation = prev * cur
        break
      case '/':
        computation = prev / cur
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  updateDisplay() {
    this.currentOperand.innerText = this.currentOperand
    this.previousOperand.innerText = this.previousOperand
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const dataButtons = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const del = document.querySelector('[data-delete]')
const clear = document.querySelector('[data-clear]')
const previousOperan = document.querySelector('[data-previous-operand]')
const currentOperan = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperan, currentOperan)


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumb(button.innerText)
    calculator.updateDisplay()
  })
})

dataButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseanOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equals.addEventListener('click', button => {
  calculator.computeNumber()
  calculator.updateDisplay()
})

clear.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})


del.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})