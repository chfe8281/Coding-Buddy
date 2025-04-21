document.addEventListener("DOMContentLoaded", () => {
    // Restore checkbox state if previously saved
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    document.getElementById("rememberMe").checked = rememberMe;
    // Optional: auto-fill username if saved
    if (rememberMe) {
      const savedUsername = localStorage.getItem("savedUsername");
      const savedPass=localStorage.getItem("savedPass");
      if (savedUsername && savedPass) {
        document.getElementById("username").value = savedUsername;
        document.getElementById("password").value = savedPass;
      }
    }

    // Save on form submission
    document.querySelector("form").addEventListener("submit", () => {
      const remember = document.getElementById("rememberMe").checked;
      localStorage.setItem("rememberMe", remember);

      if (remember) {
        const password= document.getElementById("password").value;
        const username = document.getElementById("username").value;
        localStorage.setItem("savedUsername", username);
        localStorage.setItem("savedPass",password);
      } else {
        localStorage.removeItem("savedPass");
        localStorage.removeItem("savedUsername");
      }
    });
  });
