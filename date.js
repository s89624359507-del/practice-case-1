const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function getDayOfWeek(day, month, year) {
  const date = new Date(year, month - 1, day);
  const days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ];

  return days[date.getDay()];
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function calculateAge(day, month, year) {
  const today = new Date();

  let age = today.getFullYear() - year;
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  if (
    currentMonth < month ||
    (currentMonth === month && currentDay < day)
  ) {
    age--;
  }

  return age;
}

function formatDate(day, month, year) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');

  return `${dd}.${mm}.${year}`;
}

async function main() {
  const day = Number(await ask('Введите день рождения: '));
  const month = Number(await ask('Введите месяц рождения: '));
  const year = Number(await ask('Введите год рождения: '));

  if (!day || !month || !year) {
    console.log('Некорректная дата');
    rl.close();
    return;
  }

  console.log('\nРезультат:');
  console.log('Дата рождения:', formatDate(day, month, year));
  console.log('День недели:', getDayOfWeek(day, month, year));
  console.log('Високосный год:', isLeapYear(year) ? 'да' : 'нет');
  console.log('Возраст:', calculateAge(day, month, year));

  rl.close();
}

main();
