const studyList = document.getElementById('study-list');

// 25 
const studyDays = [
  { day: 1, topic: 'Polymorphism, Sum', targetTime: 120 },
  { day: 2, topic: 'Exception Handling, Lecture 11, Product', targetTime: 300 },
  { day: 3, topic: 'Permutation & Combination, Relation, Chemistry Viva', targetTime: 180 },
  { day: 4, topic: 'Electro Chemistry, JFET', targetTime: 150 },
  { day: 5, topic: 'EEE Lab Video, JFET', targetTime: 180 },
  { day: 6, topic: 'JFET', targetTime: 200 },
  { day: 7, topic: 'Vector, Graph', targetTime: 210 },
  { day: 8, topic: 'Inheritance', targetTime: 240 },
  { day: 9, topic: 'Operator Overloading', targetTime: 300 },
  { day: 10, topic: 'Geometry', targetTime: 110 },
  { day: 11, topic: 'Circle', targetTime: 120 },
  { day: 12, topic: 'Reaction kinetics', targetTime: 80 },
  { day: 13, topic: 'Vector Calculus', targetTime: 90 },
  { day: 14, topic: 'Scalar and Vector', targetTime: 100 },
  { day: 15, topic: 'Phase rule & Phase diagram', targetTime: 85 },
  { day: 16, topic: 'Graphs', targetTime: 120 },
  { day: 17, topic: 'Path & Connectivity', targetTime: 100 },
  { day: 18, topic: 'Euler Path', targetTime: 90 },
  { day: 19, topic: 'Circuit Hamilton Path', targetTime: 95 },
  { day: 20, topic: 'BJT', targetTime: 80 },
  { day: 21, topic: 'Bipoar Junction Transistor', targetTime: 110 },
  { day: 22, topic: 'Field Effect Transistor', targetTime: 120 },
  { day: 23, topic: 'Bipoar Junction Transistor', targetTime: 85 },
  { day: 24, topic: 'Vector', targetTime: 100 },
  { day: 25, topic: 'Circle', targetTime: 75 }
];

// Countdown Timer
const examDate = new Date("2024-12-15T10:00:00");
const countdownElement = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const timeDifference = examDate - now;

  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);
    countdownElement.textContent = `Final Exam: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    countdownElement.textContent = "Exam Day!";
  }
}

setInterval(updateCountdown, 1000);



// ডাটা localStorage থেকে লোড
function loadData(day) {
  const savedData = localStorage.getItem(`day-${day}`);
  return savedData ? parseInt(savedData) : null;
}

// ডাটা localStorage এ সেভ
function saveData(day, time) {
  localStorage.setItem(`day-${day}`, time);
}

// প্রতিটি দিনের জন্য কার্ড তৈরি
studyDays.forEach(({ day, topic, targetTime }) => {
  const card = document.createElement('div');
  card.classList.add('study-card');

  card.innerHTML = `
    <div class="study-header">
      <h2>Day ${day}: ${topic}</h2>
    </div>
    <p class="target-time">Target: ${targetTime} minutes</p>
    <input type="number" placeholder="Enter actual time" class="input-time" value="${loadData(day) || ''}">
    <div class="status">
      <span class="status-text"></span>
      <span class="status-icon"></span>
    </div>
  `;

  const inputTimeField = card.querySelector('.input-time');
  const statusText = card.querySelector('.status-text');
  const statusIcon = card.querySelector('.status-icon');

  // ইনপুট টাইম পরিবর্তন হলে স্ট্যাটাস আপডেট এবং ডাটা সেভ
  inputTimeField.addEventListener('input', () => {
    const inputTime = parseInt(inputTimeField.value);

    if (!isNaN(inputTime)) {
      saveData(day, inputTime); // ডাটা সেভ localStorage এ

      if (inputTime >= targetTime) {
        statusText.textContent = 'Complete';
        statusText.classList.add('complete');
        statusText.classList.remove('incomplete');
        statusIcon.textContent = '✔️';
      } else {
        statusText.textContent = 'Incomplete';
        statusText.classList.add('incomplete');
        statusText.classList.remove('complete');
        statusIcon.textContent = '❌';
      }
    } else {
      // যদি ইনপুট ফাঁকা থাকে, কোনও টেক্সট বা আইকন দেখাবেন না
      statusText.textContent = '';
      statusIcon.textContent = '';
      localStorage.removeItem(`day-${day}`); // ফাঁকা হলে ডাটা রিমুভ
    }
  });

  // পেজ লোড হলে স্ট্যাটাস আপডেট
  const savedTime = loadData(day);
  if (savedTime !== null) {
    inputTimeField.value = savedTime;
    if (savedTime >= targetTime) {
      statusText.textContent = 'Complete';
      statusText.classList.add('complete');
      statusText.classList.remove('incomplete');
      statusIcon.textContent = '✔️';
    } else {
      statusText.textContent = 'Incomplete';
      statusText.classList.add('incomplete');
      statusText.classList.remove('complete');
      statusIcon.textContent = '❌';
    }
  }

  studyList.appendChild(card);
});
