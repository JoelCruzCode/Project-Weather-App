function toggleDisplay(...nodes) {
  const elements = [...nodes];
  elements.forEach((element) => element.classList.toggle("hidden"));
}

function validateForm(form) {
  const locationInput = document.forms[form.name].location;
  const daysInput = document.forms[form.name].num_days;
  if (locationInput.value === "") {
    alert("Location must be filled out");
    return false;
  }
  if (daysInput.value === "") {
    daysInput.value = "1";
  }
  return true;
}

export { toggleDisplay, validateForm };
