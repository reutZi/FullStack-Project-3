// ----------------------- Function to handle user login-------------------------
function handleLogin(user) {
  setCookie("user", JSON.stringify(user), 6);
}

// ----------------------- Function to reset failed login attempts-------------------
function resetFailedAttempts() {
  localStorage.setItem("failedAttempts", 0);
}
