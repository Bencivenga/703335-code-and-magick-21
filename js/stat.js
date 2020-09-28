'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_GAP = 10;
const TEXT_X = 120;
const TEXT_Y = 40;
const LINE_HEIGHT = 20;
const HISTOGRAM_MAX_HEIGHT = 150;
const BAR_X = 150;
const BAR_Y = 245;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_INDENT = BAR_WIDTH + BAR_GAP;


// отрисовка облака
const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// получаем макс значение из массива
const getMaxValue = (arr) => {
  let maxValue = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }
  return maxValue;
};

// Получаем цвет столбца
const getPlayerColor = (playerName) => {
  return (playerName === `Вы`) ? `rgba(255, 0, 0, 1)` :
    `hsl(240, ` + (Math.floor(Math.random() * 100)) + `%, 50%)`;
};

// Построение гистограммы
const buildHistogram = (ctx, currentTime, currentName, maxTime, i) => {
  let playerTime = Math.round(currentTime);
  let barHeight = playerTime * HISTOGRAM_MAX_HEIGHT / maxTime;

  ctx.fillStyle = getPlayerColor(currentName);
  ctx.fillRect(BAR_X + i * BAR_INDENT, BAR_Y, BAR_WIDTH, barHeight * -1);

  ctx.fillStyle = `#000`;
  ctx.fillText(playerTime, BAR_X + i * BAR_INDENT, BAR_Y - barHeight - LINE_HEIGHT / 2);
  ctx.fillText(currentName, BAR_X + i * BAR_INDENT, BAR_Y + LINE_HEIGHT);
};
// Отрисовка статистики
window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура! Вы победили!`, TEXT_X, TEXT_Y);
  ctx.fillText(`Список результатов:`, TEXT_X, TEXT_Y + LINE_HEIGHT);

  let maxTime = getMaxValue(times);

  for (let i = 0; i < times.length; i++) {
    buildHistogram(ctx, times[i], names[i], maxTime, i);
  }
};
