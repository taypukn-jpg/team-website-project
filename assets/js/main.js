document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");

  if (btn) {
    btn.addEventListener("click", () => {
      alert("✅ JavaScript сәтті жұмыс істеп тұр!");
      btn.style.backgroundColor = "#28a745";
      btn.style.color = "#fff";
      btn.textContent = "Бәрі дұрыс 🎉";
    });
  } else {
    console.error("❌ Батырма табылмады!");
  }
});

