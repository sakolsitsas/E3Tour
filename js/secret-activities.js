function showSecretHint(card) {
  const message = document.getElementById("secret-message");
  const hints = [
    "🔍 รู้มากไปแล้ว... แต่ยังไม่ถึงเวลาเปิดเผย!",
    "🤫 ภารกิจนี้จะไม่ง่ายอย่างที่คิด",
    "👀 จะกดทำไม ไม่มีอะไรร ยังไม่ได้คิดดด !",
  ];
  const index = Array.from(card.parentElement.children).indexOf(card);

  message.textContent = hints[index] || hints[0];

  card.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-3px)" },
      { transform: "translateX(3px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 220 },
  );
}
