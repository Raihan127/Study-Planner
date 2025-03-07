const studyList = document.getElementById('study-list');

const studyDays = [
  { day: 1, topic: '15.02.25   Math-3', targetTime: 120 },
  { day: 1, topic: 'DSD', targetTime: 60 },


  { day: 1, topic: '16.02.25   Java', targetTime: 120 },
  { day: 1, topic: 'Math-3', targetTime: 60 },


  { day: 2, topic: '17.02.25    DS', targetTime: 90 },
  { day: 2, topic: 'Math-3', targetTime: 60 },


  { day: 3, topic: '18.02.25    DS', targetTime: 90 },
  { day: 3, topic: 'Bangla', targetTime: 45},
  { day: 3, topic: 'Math-3', targetTime: 60},


  { day: 4, topic: '19.02.25    Java', targetTime: 45 },
  
/*
  { day: 5, topic: 'OP-AMP, Tree', targetTime: 120 },
  { day: 5, topic: 'Euler Path, Exception Handling ', targetTime: 90 },
  { day: 5, topic: 'Reaction Kinetics', targetTime: 90 },
  { day: 5, topic: 'Polymorphism, Tree', targetTime: 90 },
  { day: 5, topic: 'Phase rule, 2nd Degree', targetTime: 120 }, */
];

// Countdown Timer
const examDate = new Date("2025-03-11T10:00:00");
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
