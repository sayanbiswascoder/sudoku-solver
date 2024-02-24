class Solver{
    game = []
    number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    noteOfCell = {
        "C1":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
        "C2":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
        "C3":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
        "C4":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
        "C5":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
        "C6":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
        "C7":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
        "C8":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
        "C9":{
            "1":[],
            "2":[],
            "3":[],
            "4":[],
            "5":[],
            "6":[],
            "7":[],
            "8":[],
            "9":[],
        },
    }
    blankBox = 0
    constructor(game){
        this.game = game;
    }
    getNumInColumn(inx){
        let num = []
        for(let i = 0; i< 9;i++){
            if(Number.isInteger(this.game[i][inx])){
                num.push(this.game[i][inx])
            }
        }
        return num;
    }

    getNumInCell(row, col){
        let num = []
        for(let i = Math.floor(row / 3) * 3; i< (Math.floor(row / 3)*3) + 3;i++){
            for(let j = Math.floor(col / 3)*3; j< (Math.floor(col / 3)*3) + 3;j++){
                if(Number.isInteger(this.game[i][j])){
                    num.push(this.game[i][j])
                }
            }
        }
        return num
    }

    invertNoteArray(num){
        let numb = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        for(let i=0;i< num.length;i++){
            numb.splice(numb.indexOf(num[i]), 1)
        }
        return numb
    }

    objectNote(row, col, arr){
        for(let i in arr){
            this.noteOfCell[`C${((Math.floor(row/3) * 3) + Math.floor(col / 3)) + 1}`][`${arr[i]}`].push([row, col])
        }
    }

    note(){
        let num = [];
        for(let i = 0;i < this.game.length;i++){
            for(let j = 0;j < this.game[i].length;j++){
                if(!Number.isInteger(this.game[i][j])){
                    this.blankBox++;
                    num = this.game[i].filter(e=> Number.isInteger(e))
                    num = num.concat(this.getNumInColumn(j))
                    num = num.concat(this.getNumInCell(i, j))
                    num = Array.from(new Set(num)).sort()
                    num = this.invertNoteArray(num)
                    this.objectNote(i, j, num)
                    this.game[i][j] = num;
                }
            }
        }
    }

    removeNumFromNoteArrayRow(row, val){
        for(let i = 0;i < 9;i++){

            if(!Number.isInteger(this.game[row][i])){
                this.game[row][i].includes(val) ? this.game[row][i].splice(this.game[row][i].indexOf(val),1) : ""
            }
        }
        for(let i = 1;i<=3;i++){
            for(let j = this.noteOfCell[`C${Math.floor(row / 3) * 3 + i}`][`${val}`].length - 1;j>= 0;j--){
                if(this.noteOfCell[`C${Math.floor(row / 3) * 3 + i}`][`${val}`].length > 0){
                    if(this.noteOfCell[`C${Math.floor(row / 3) * 3 + i}`][`${val}`][j][0] == row){
                        this.noteOfCell[`C${Math.floor(row / 3) * 3 + i}`][`${val}`].splice(j, 1)
                    }
                }
            }
        }
    }

    removeNumFromNoteArrayCol(col, val){
        for(let i = 0;i < 9;i++){
            if(!Number.isInteger(this.game[i][col])){
                this.game[i][col].includes(val) ? this.game[i][col].splice(this.game[i][col].indexOf(val),1) : console.log()
            }
        }
        for(let i = 1;i<=9;i+=3){
            for(let j = this.noteOfCell[`C${Math.floor(col / 3) + i}`][`${val}`].length - 1;j>= 0;j--){
                if(this.noteOfCell[`C${Math.floor(col / 3) + i}`][`${val}`].length > 0){
                    if(this.noteOfCell[`C${Math.floor(col / 3) + i}`][`${val}`][j][1] == col){
                        this.noteOfCell[`C${Math.floor(col / 3) + i}`][`${val}`].splice(j, 1)
                    }
                }
            }
        }
    }

    removeNumFromNoteArrayCel(row, col, val){
        for(let i = Math.floor(row / 3) * 3; i< (Math.floor(row / 3)*3) + 3;i++){
            for(let j = Math.floor(col / 3)*3; j< (Math.floor(col / 3)*3) + 3;j++){
                if(!Number.isInteger(this.game[i][j])){
                    this.game[i][j].includes(val) ? this.game[i][j].splice(this.game[i][j].indexOf(val),1) : console.log()
                }
            }
        }
        this.noteOfCell[`C${((Math.floor(row/3) * 3) + Math.floor(col / 3)) + 1}`][`${val}`] = []
    }

    removeNumIfAllredyOccupied(row, col, value){
        for(let i = 1;i<=9;i++){
            for(let j = this.noteOfCell[`C${(Math.floor(row / 3) * 3) + Math.floor(col / 3) + 1}`][`${i}`].length - 1;j>=0;j--){
                let arr = this.noteOfCell[`C${(Math.floor(row / 3) * 3) + Math.floor(col / 3) + 1}`][`${i}`][j]
                if(arr[0] == row && arr[1] == col){
                    this.noteOfCell[`C${(Math.floor(row / 3) * 3) + Math.floor(col / 3) + 1}`][`${i}`].splice(j, 1)
                }
            }
        }
    }

    removeNumFromNoteArray(row, col, value){
        this.removeNumFromNoteArrayRow(row, value);
        this.removeNumFromNoteArrayCol(col, value);
        this.removeNumFromNoteArrayCel(row, col, value);
        this.removeNumIfAllredyOccupied(row, col, value);
    }

    putValue(row, col, value){
        this.game[row][col] = value;
        this.blankBox -= 1;
        this.removeNumFromNoteArray(row, col, value);
    }


    checkIfOneInNoteArray(){
        for(let i = 0;i < this.game.length;i++){
            for(let j = 0;j < this.game[i].length;j++){
                if(!Number.isInteger(this.game[i][j])){
                    if(this.game[i][j].length == 1){
                        this.putValue(i, j, this.game[i][j][0])
                    }
                }
            }
        }
    }

    chekIfOneInCell(){
        for(let i =1;i<=9;i++){
            for(let j =1;j<=9;j++){
                let arr = this.noteOfCell[`C${i}`][`${j}`];
                if(arr.length == 1){
                    let row = arr[0][0]
                    let col = arr[0][1]
                    this.putValue(row, col, j)
                }else if(arr.length == 2){
                    if(Array.from(new Set([arr[0][0], arr[1][0]])).length == 1){
                        let tempArr = [arr[0], arr[1]]
                        this.removeNumFromNoteArrayRow(arr[0][0], j)
                        this.noteOfCell[`C${i}`][`${j}`] = [...this.noteOfCell[`C${i}`][`${j}`], tempArr[0], tempArr[1]]
                        for (let k = 0; k < 2; k++) {
                            this.game[tempArr[k][0]][tempArr[k][1]].push(j)
                        }
                    }else if(Array.from(new Set([arr[0][1], arr[1][1]])).length == 1){
                        let tempArr = [arr[0], arr[1]]
                        this.removeNumFromNoteArrayCol(arr[0][1], j)
                        this.noteOfCell[`C${i}`][`${j}`].push(...tempArr);
                        for (let k = 0; k < 2; k++) {
                            this.game[tempArr[k][0]][tempArr[k][1]].push(j)
                            // console.log(this.game[tempArr[k][0]][tempArr[k][1]], tempArr, tempArr[k])
                        }
                    }
                }else if(arr.length == 3){
                    if(Array.from(new Set([arr[0][0], arr[1][0], arr[2][0]])).length == 1){
                        let tempArr = [arr[0], arr[1], arr[2]]
                        this.removeNumFromNoteArrayRow(arr[0][0], j)
                        this.noteOfCell[`C${i}`][`${j}`].push(...tempArr);
                        for (let k = 0; k < 3; k++) {
                            this.game[tempArr[k][0]][tempArr[k][1]].push(j)
                        }
                    }else if(Array.from(new Set([arr[0][1], arr[1][1], arr[2][1]])).length == 1){
                        let tempArr = [arr[0], arr[1], arr[2]]
                        this.removeNumFromNoteArrayCol(arr[0][1], j)
                        this.noteOfCell[`C${i}`][`${j}`].push(...tempArr);
                        for (let k = 0; k < 3; k++) {
                            this.game[tempArr[k][0]][tempArr[k][1]].push(j)
                        }
                    }
                }
            }
        }
    }

    checkIfOne(){
        this.checkIfOneInNoteArray()
        this.chekIfOneInCell()
    }

    solve(){
            this.note();
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
                this.checkIfOne()
            
            return this.game
    }
}

export default Solver;