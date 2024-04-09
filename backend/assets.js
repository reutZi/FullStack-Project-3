// ----------------------- Function to handle user login-------------------------
function handleLogin(user) {
  // Set user information in cookie with expiration time of 6 hours
  setCookie("user", JSON.stringify(user), 6);
}

// ----------------------- Function to handle user logout-------------------------
function handleLogout() {
  localStorage.setItem("update", "false");
  deleteCookie("user");
  window.parent.location.href = "../index.html";
}

// ----------------------- Function to show alert for under development features----
function showAlert() {
  alert("This feature is still under development.");
}

// ----------------------- Function to reset failed login attempts-------------------
function resetFailedAttempts() {
  // Reset failed login attempts to 0
  localStorage.setItem('failedAttempts', 0);
}
