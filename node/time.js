function displayTime() {
  const time = new Date().toLocaleTimeString();
  console.log(time);
}

function displayDate() {
  const date = new Date().toLocaleDateString();
  console.log(date);
}

module.exports = {
  displayTime,
  displayDate,
};
