let picked = [];
const winningLines = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 4, 8],
  [2, 4, 6],
];

const cells = $('.board td');

console.log(cells);

const resetBoard = () => {
  cells.each(function (index) {
    $(this).on('click', () => playerMove(this, index));
    $(this).text(index + 1);
    $(this).addClass('player');
  });
  picked = [];
};

resetBoard();

const isWinner = () =>
  new Promise((res, rej) => {
    winningLines.forEach((line) => {
      const first = $(cells[line[0]]);
      const second = $(cells[line[1]]);
      const third = $(cells[line[2]]);

      if (first.text() === second.text() && second.text() === third.text()) {
        const winner = $(`#${first.text()}-score`);
        winner.text(parseInt(winner.text()) + 1);

        cells.each(function () {
          $(this).off();
        });
        resetBoard();
        res(true);
      }
    });
    res(false);
});

const playerMove = async (obj, index) => {
  picked.push(index);
  $(obj).off('click');
  $(obj).text('O');

  if (await isWinner())
    return; 
  if (picked.length === 9) {
    resetBoard();
    return;
  }
  // move for X
  let randomCellIndex = Math.floor(Math.random() * (8 + 1));
  while (picked.includes(randomCellIndex)) {
    randomCellIndex = Math.floor(Math.random() * (8 + 1));
  }

  picked.push(randomCellIndex);
  $(cells[randomCellIndex]).off('click');
  $(cells[randomCellIndex]).text('X');

  if (await isWinner()) {
    return;
  }
};