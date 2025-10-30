document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("btn");
  if (btn) {
    btn.addEventListener("click", function() {
      alert("Сәлем! JavaScript сәтті жұмыс істеп тұр 🎉");
      btn.style.backgroundColor = "#ff8800";
      btn.textContent = "Бастың — сәтті шықты!";
    });
  } else {
    console.error("Батырма табылмады!");
  }
});
