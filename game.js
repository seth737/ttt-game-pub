const lib = (function () {
  /*
	interface SquareState {
	    player: Player | null;
	}
    
	type BoardState = SquareState[][];
    
	interface GameState {
	    board: BoardState;
	    turn: Player;
	}
	*/

  const ns = {};

  const Player = (ns.Player = {
    Human: 1,
    Computer: 2,
  });

  ns.defaultGameState = (size = 3) => {
    return { board: emptyBoard(size), turn: Player.Human };
  };

  const emptyBoard = (size /* number */) /*: BoardState*/ => {
    const board /*: BoardState*/ = [];
    for (let x = 0; x < size; x++) {
      board.push([]);
      for (let y = 0; y < size; y++) {
        board[x].push({ player: null });
      }
    }
    return board;
  };

  const cloneBoard = (board /*: BoardState*/) /*: BoardState*/ => {
    const newBoard = emptyBoard(board.length);
    for (let x = 0; x < newBoard.length; x++) {
      for (let y = 0; y < newBoard[x].length; y++) {
        newBoard[x][y] = { player: board[x][y].player };
      }
    }
    return newBoard;
  };

  ns.computerMove = (board /*: BoardState*/) /*: Promise<BoardState> */ => {
    return new Promise((resolve) => {
      const newBoard = cloneBoard(board);
      loopX: for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
          if (board[x][y].player === null) {
            newBoard[x][y].player = Player.Computer;
            break loopX;
          }
        }
      }
      setTimeout(() => resolve(newBoard), Math.random() * 5000 + 1000);
    });
  };

  ns.humanMove = (
    board /*: BoardState*/,
    x /*: number*/,
    y /*: number*/
  ) /*: BoardState */ => {
    const newBoard = cloneBoard(board);
    if (newBoard[x] && newBoard[x][y] && newBoard[x][y].player === null) {
      newBoard[x][y].player = Player.Human;
      return newBoard;
    }

    throw new Error(`Invalid move: ${x},${y}`);
  };

  ns.checkWinner = (board /*: BoardState*/) /*: Player | null */ => {
    let winner;

    winner = checkVertWinner(board);
    if (winner) {
      return winner;
    }

    winner = checkHorizWinner(board);
    if (winner) {
      return winner;
    }

    winner = checkDiagDownWinner(board);
    if (winner) {
      return winner;
    }

    winner = checkDiagUpWinner(board);
    if (winner) {
      return winner;
    }

    return null;
  };

  const checkVertWinner = (board /*: BoardState*/) /*: Player | null*/ => {
    for (let x = 0; x < board.length; x++) {
      let human = [];
      let computer = [];
      for (let y = 0; y < board.length; y++) {
        if (board[x][y].player === Player.Human) {
          human.push(1);
        } else if (board[x][y].player === Player.Computer) {
          computer.push(1);
        }
      }
      if (human.length === board.length) {
        return Player.Human;
      }
      if (computer.length === board.length) {
        return Player.Computer;
      }
    }
    return null;
  };

  const checkHorizWinner = (board /*: BoardState*/) /*: Player | null */ => {
    for (let y = 0; y < board.length; y++) {
      let human = [];
      let computer = [];
      for (let x = 0; x < board.length; x++) {
        if (board[x][y].player === Player.Human) {
          human.push(1);
        } else if (board[x][y].player === Player.Computer) {
          computer.push(1);
        }
      }
      if (human.length === board.length) {
        return Player.Human;
      }
      if (computer.length === board.length) {
        return Player.Computer;
      }
    }
    return null;
  };

  const checkDiagDownWinner = (board /*: BoardState*/) /*: Player | null */ => {
    // check diagonal wins
    let human = [];
    let computer = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board.length; y++) {
        if (x === y) {
          if (board[x][y].player === Player.Human) {
            human.push(1);
          } else if (board[x][y].player === Player.Computer) {
            computer.push(1);
          }
        }
      }
    }
    if (human.length === board.length) {
      return Player.Human;
    }
    if (computer.length === board.length) {
      return Player.Computer;
    }
    return null;
  };

  const checkDiagUpWinner = (board /*: BoardState*/) /*: Player | null */ => {
    // check diagonal wins
    let human = [];
    let computer = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = board.length - 1; y >= 0; y--) {
        if (x + y === board.length - 1) {
          if (board[x][y].player === Player.Human) {
            human.push(1);
          } else if (board[x][y].player === Player.Computer) {
            computer.push(1);
          }
        }
      }
    }
    if (human.length === board.length) {
      return Player.Human;
    }
    if (computer.length === board.length) {
      return Player.Computer;
    }
    return null;
  };
  return ns;
})();
