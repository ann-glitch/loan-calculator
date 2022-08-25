//listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//calculate results
function calculateResults() {
  console.log("calculating....");

  //DOM
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //assign input values
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100;
  const calculatedPayments = parseFloat(years.value);

  //compute monthly payment
  const simpleInterest = principal * calculatedInterest * calculatedPayments;
  const monthly = simpleInterest / 12;

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value =
      simpleInterest / (calculatedInterest * calculatedPayments).toFixed(2);
    totalInterest.value = simpleInterest.toFixed(2);

    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

//show error message
function showError(error) {
  document.getElementById("results").style.display = "block";
  document.getElementById("loading").style.display = "none";

  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  card.insertBefore(errorDiv, heading);

  //clear error message after 2seconds
  setTimeout(clearError, 2000);
}

//clear error message
function clearError() {
  document.querySelector(".alert").remove();
}
