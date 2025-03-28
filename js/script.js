// Select elements
const loanAmountInput = document.getElementById('loan-amount');
const loanTermInput = document.getElementById('loan-term');
const calculateBtn = document.getElementById('calculate-btn');
const monthlyPaymentDisplay = document.getElementById('monthly-payment');
const totalPaymentDisplay = document.getElementById('total-payment');

// Fixed interest rate
const interestRate = 29; // 29% annual interest rate

// Maximum loan term in months
const maxLoanTerm = 36;

// Calculate monthly payment
function calculateLoan() {
    const loanAmount = parseFloat(loanAmountInput.value) || 0;
    let loanTerm = parseFloat(loanTermInput.value) || 1;

    // Validate loan term to ensure it's within the allowed range
    if (loanTerm > maxLoanTerm) {
        alert(`Perioada maximă de împrumut este de ${maxLoanTerm} luni. Valoarea ta a fost ajustată la ${maxLoanTerm} luni.`);
        loanTerm = maxLoanTerm; // Adjust the loan term to the maximum allowed value
    }

    if (loanAmount <= 0 || loanTerm <= 0) {
        alert('Te rog introdu valori valide.');
        return;
    }

    // Convert annual interest rate to monthly rate
    const monthlyInterestRate = (interestRate / 100) / 12;

    // Calculate monthly payment using the formula:
    // M = P * (J / (1 - (1 + J)^(-N)))
    // Where:
    // M = monthly payment
    // P = loan amount
    // J = monthly interest rate
    // N = loan term in months
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm);
    const denominator = Math.pow(1 + monthlyInterestRate, loanTerm) - 1;

    if (denominator === 0) {
        alert("Eroare de calcul: Te rog verifică valorile introduse.");
        return;
    }

    const monthlyPayment = (loanAmount * numerator) / denominator;

    // Calculate total payment
    const totalPayment = monthlyPayment * loanTerm;

    // Display results
    monthlyPaymentDisplay.textContent = monthlyPayment.toFixed(2);
    totalPaymentDisplay.textContent = totalPayment.toFixed(2);
}

// Add event listener to calculate button
calculateBtn.addEventListener('click', calculateLoan);