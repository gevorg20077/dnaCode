class DNASequence {
  constructor(valueDNA) {
    this.valueDNA = valueDNA.toUpperCase()
  }

  #isValid() {
    return /^[ACGT ]+$/.test(this.valueDNA)
  }

  toRNA() {
    if (!this.#isValid()) {
      throw new Error("Your DNA is incorrect");
    }

    return this.#convertDNAtoRNA()
  }

  #convertDNAtoRNA() {
    return this.valueDNA
      .replace(/A/g, "U")
      .replace(/C/g, "x")
      .replace(/G/g, "C")
      .replace(/T/g, "A")
      .replace(/x/g, "G")
  }
}

class DNASequenceDisplay {
  constructor(result) {
    this.result = result
  }

  displayResult(result) {
    this.#removeElementIfExists(".DNA_to_RNA__error_DNA")
    this.#removeElementIfExists(".DNA_to_RNA__value_RNA")
    const textRNA = this.#createHTMLElement('p', "DNA_to_RNA__value_RNA", "RNA: " + result)
    document.querySelector(".DNA_to_RNA__input_DNA").parentElement.insertAdjacentElement('beforeend', textRNA)
  }

  displayError(errorMessage) {
    this.#removeElementIfExists(".DNA_to_RNA__value_RNA")
    this.#removeElementIfExists(".DNA_to_RNA__error_DNA")
    const errorDNA = this.#createHTMLElement('p', "DNA_to_RNA__error_DNA", errorMessage.message)
    document.querySelector(".DNA_to_RNA__input_DNA").parentElement.insertAdjacentElement('beforeend', errorDNA)
  }

  #createHTMLElement(tagName, className, textContent) {
    const element = document.createElement(tagName)
    element.classList.add(className)
    element.textContent = textContent
    return element
  }

  #removeElementIfExists(selector) {
    const element = document.querySelector(selector)
    if (element) {
      element.remove()
    }
  }
}

document.querySelector(".DNA_to_RNA").addEventListener("submit", function (event) {
  event.preventDefault()

  const dnaInput = document.querySelector(".DNA_to_RNA__input_DNA")
  const dnaValue = dnaInput.value;

  const dnaToRna = new DNASequence(dnaValue)
  const dnaDisplay = new DNASequenceDisplay()

  try {
    const result = dnaToRna.toRNA()
    dnaDisplay.displayResult(result)
  } catch (errorMessage) {
    dnaDisplay.displayError(errorMessage)
  }
})