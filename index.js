let block = document.querySelectorAll(".tic");
class Board {
    constructor(cheeseArray) {
        this.cheeseBoard = cheeseArray;
    }
    showBoard() {
        this.cheeseBoard.forEach((element, index) => {
            block[index].style.opacity = 1;
            switch (element) {
                case 1:
                    block[index].innerHTML = `<span id="span-${index}" class="ticSpan">X</span>`;
                    break;
                case 0:
                    block[index].innerHTML = `<span id="span-${index}" class="ticSpan"></span>`;
                    break;
                case -1:
                    block[index].innerHTML = `<span id="span-${index}" class="ticSpan">O</span>`;
                    break;
                default:
                    console.log("棋盘数据错误");
                    break;
            }
        });
    }
    iniBoard() {
        this.cheeseBoard = [1, 1, 1, 0, 0, 0, -1, -1, -1];
        this.showBoard();
        this.iniPlayerClick();
    }
    iniPlayerClick() {
        this.cheeseBoard.forEach((element, index) => {
            if (element === 1) {
                block[index].firstChild.addEventListener("click", () => {
                    this.chooseCheese(index);
                })
            }
        })
    }
    chooseCheese(i) {
        switch (this.cheeseBoard[i]) {
            case 1:
                this.showAvalible(i);
                break;
            default:
                alert("不能选中此位置");
                break;
        }
    }
    showAvalible(i) {
        let avalibeCheese = this.getAvaCheese(i);
        this.changeUnavaOpa(avalibeCheese);
    }
    changeUnavaOpa(avalibeCheese) {
        this.showBoard();
        this.iniPlayerClick();
        let i = 0;
        for (i = 0; i < 9; i++) {
            block[i].style.opacity = 0.5;
        }
        avalibeCheese.forEach((element) => {
            block[element].style.opacity = 1;
            if (avalibeCheese[0] !== element) {
                block[element].firstChild.addEventListener("click", () => {
                    this.prepreCheeseBoard = this.preCheeseBoard && this.preCheeseBoard.slice();
                    this.preCheeseBoard = this.cheeseBoard.slice();
                    this.chooseMove(avalibeCheese[0], element, 1);
                    this.AImove();
                    if (this.kickOut() !== 1) {
                        this.showBoard();
                        this.iniPlayerClick();
                        this.judgeWin();
                    }
                })
            }
        })
    }
    chooseMove(from, to, who) {
        this.cheeseBoard[from] = 0;
        this.cheeseBoard[to] = who;
    }
    // AIwin(allMove) {
    //     let j = 0;

    //     function tempMove(cheeseBoard, from, to) {
    //         cheeseBoard[from] = 0;
    //         cheeseBoard[to] = -1;
    //         if (myBoard.judgeWin(cheeseBoard) === -1) {
    //             return 1;
    //         };
    //     }
    //     allMove.some((element) => {
    //         for (let i = 1; i < element.length - 1; i++) {
    //             if (tempMove(myBoard.cheeseBoard, element[0], element[i]) === 1) {
    //                 j = 1;
    //                 break;
    //             }
    //         }
    //     })
    //     return j;
    // }
    AIwin(allMove) {
        let i, j;
        for (i = 0; i < allMove.length; i++) {
            for (j = 1; j < allMove[i].length; j++) {
                this.chooseMove(allMove[i][0], allMove[i][j], -1)
                if (this.judgeWin(1) === -1) {
                    return 1;
                } else {
                    this.chooseMove(allMove[i][j], allMove[i][0], -1);
                }
            }
        }
    }
    AImove() {
        let allMove = [];
        this.cheeseBoard.some((element, i) => {
            let avalibeCheese = [i];
            if (element === -1) {
                avalibeCheese = this.getAvaCheese(i);
            }
            if (avalibeCheese.length !== 1) {
                allMove.push(avalibeCheese);
            }
        })
        if (allMove.length === 0) {
            return;
        } else if (this.AIwin(allMove)) {
            return;
        }
        let random = Math.floor(Math.random() * (allMove.length));
        let random2 = Math.floor(Math.random() * (allMove[random].length - 1)) + 1;
        this.chooseMove(allMove[random][0], allMove[random][random2], -1);
    }
    getAvaCheese(i) {
        let avalibeCheese = [i];
        switch (i) {
            case 0:
                (this.cheeseBoard[i + 1] === 0) && avalibeCheese.push(i + 1);
                (this.cheeseBoard[i + 3] === 0) && avalibeCheese.push(i + 3);
                break;
            case 1:
                (this.cheeseBoard[i - 1] === 0) && avalibeCheese.push(i - 1);
                (this.cheeseBoard[i + 1] === 0) && avalibeCheese.push(i + 1);
                (this.cheeseBoard[i + 3] === 0) && avalibeCheese.push(i + 3);
                break;
            case 2:
                (this.cheeseBoard[i - 1] === 0) && avalibeCheese.push(i - 1);
                (this.cheeseBoard[i + 3] === 0) && avalibeCheese.push(i + 3);
                break;
            case 3:
                (this.cheeseBoard[i - 3] === 0) && avalibeCheese.push(i - 3);
                (this.cheeseBoard[i + 1] === 0) && avalibeCheese.push(i + 1);
                (this.cheeseBoard[i + 3] === 0) && avalibeCheese.push(i + 3);
                break;
            case 4:
                (this.cheeseBoard[i - 3] === 0) && avalibeCheese.push(i - 3);
                (this.cheeseBoard[i - 1] === 0) && avalibeCheese.push(i - 1);
                (this.cheeseBoard[i + 1] === 0) && avalibeCheese.push(i + 1);
                (this.cheeseBoard[i + 3] === 0) && avalibeCheese.push(i + 3);
                break;
            case 5:
                (this.cheeseBoard[i - 3] === 0) && avalibeCheese.push(i - 3);
                (this.cheeseBoard[i - 1] === 0) && avalibeCheese.push(i - 1);
                (this.cheeseBoard[i + 3] === 0) && avalibeCheese.push(i + 3);
                break;
            case 6:
                (this.cheeseBoard[i - 3] === 0) && avalibeCheese.push(i - 3);
                (this.cheeseBoard[i + 1] === 0) && avalibeCheese.push(i + 1);
                break;
            case 7:
                (this.cheeseBoard[i - 3] === 0) && avalibeCheese.push(i - 3);
                (this.cheeseBoard[i - 1] === 0) && avalibeCheese.push(i - 1);
                (this.cheeseBoard[i + 1] === 0) && avalibeCheese.push(i + 1);
                break;
            case 8:
                (this.cheeseBoard[i - 3] === 0) && avalibeCheese.push(i - 3);
                (this.cheeseBoard[i - 1] === 0) && avalibeCheese.push(i - 1);
                break;
        }
        return avalibeCheese;
    }
    kickOut() {
        if (this.cheeseBoard[4] === this.preCheeseBoard[4] &&
            (this.prepreCheeseBoard && this.prepreCheeseBoard[4] === this.preCheeseBoard[4])) {
            if (this.cheeseBoard[4] === 1) {
                {
                    let allMove = [];
                    let avalibeCheese = [4];
                    avalibeCheese = this.getAvaCheese(4);
                    if (avalibeCheese.length !== 1) {
                        allMove.push(avalibeCheese);
                    }
                    if (allMove.length === 0) {
                        return -1;
                    }
                    this.showBoard();
                    let random = Math.floor(Math.random() * (allMove.length));
                    let random2 = Math.floor(Math.random() * (allMove[random].length - 1)) + 1;
                    this.chooseMove(allMove[random][0], allMove[random][random2], 1);
                    alert("You have been kick out!");
                    setTimeout(this.showBoard.bind(this), 300);
                    setTimeout(this.iniPlayerClick.bind(this), 310);
                    setTimeout(this.judgeWin.bind(this), 350);
                    return 1;
                }
            }
        }
    }
    judgeWin(flag) {
        if ((this.cheeseBoard[0] === 1 &&
                this.cheeseBoard[4] === 1 &&
                this.cheeseBoard[8] === 1) ||
            (this.cheeseBoard[2] === 1 &&
                this.cheeseBoard[4] === 1 &&
                this.cheeseBoard[6] === 1)) {
            if (flag !== 1) {
                alert("你赢了!");
                this.iniBoard();
            }
            return 1;
        }
        if ((this.cheeseBoard[0] === -1 &&
                this.cheeseBoard[4] === -1 &&
                this.cheeseBoard[8] === -1) ||
            (this.cheeseBoard[2] === -1 &&
                this.cheeseBoard[4] === -1 &&
                this.cheeseBoard[6] === -1)) {
            if (flag !== 1) {
                alert("你输了");
                this.iniBoard();
            }
            return -1;
        }
        return 0;
    }
}
myBoard = new Board([1, 1, 1, 0, 0, 0, -1, -1, -1]);
myBoard.showBoard();
myBoard.iniPlayerClick();