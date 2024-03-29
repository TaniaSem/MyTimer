const refs = {
  timerFace: document.querySelector(".timer"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

let deltaTime;

const intervalId = setInterval(() => {
  const startTime = 1710212400417;
  // const moonLanding = new Date("October 09, 2022 20:20:00 GMT+03:00");
  deltaTime = startTime - Date.now();
  const timeComponents = convertMs(deltaTime);
  // console.log(timeComponents);
  updateTimerFace(timeComponents);
  onStopTimer();
}, 1000);

function onStopTimer() {
  if (deltaTime === 0 || deltaTime <= 1000) {
    clearInterval(intervalId);
  }
}

// console.log(Date.now());
// let ms = Date.parse('2024-03-11T20:00:00.417-07:00');
// console.log(ms);

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
