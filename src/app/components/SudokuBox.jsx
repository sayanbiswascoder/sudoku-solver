import { data } from "autoprefixer";
import React, { useEffect, useRef, useState } from "react";

const SudokuBox = ({ solved, setSolved, setGameArray }) => {
  const [size, setSize] = useState(0);
  const [array, setArray] = useState([]);
  const [selectedBox, setSelectedBox] = useState([,]);
  const [render, setRender] = useState(false);
  const width = useRef(0)
  const height = useRef(0)

  // useEffect(()=> {
  //   if(gameArray.length > 0){
  //     console.log("ok")
  //     setArray(gameArray);
  //   }
  // },[gameArray])

  useEffect(() => {
    if (solved) {
      setRender(!render);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solved]);

  useEffect(() => {
    let array = [];
    for (let i = 0; i < 9; i++) {
      let arr = [];
      for (let j = 0; j < 9; j++) {
        arr.push([]);
      }
      array.push(arr);
    }
    setArray(array);
    width.current = window.screen.width;
    height.current = window.screen.height;
    setSize(height.current > width.current ? (90 * width.current) / 100 : (70 * height.current) / 100);
  }, [setGameArray]);

  const reset = () => {
    setGameArray([]);
    let array = [];
    for (let i = 0; i < 9; i++) {
      let arr = [];
      for (let j = 0; j < 9; j++) {
        arr.push([]);
      }
      array.push(arr);
    }
    setSolved(false)
    setArray(array);
    setRender(!render);
  };

  const clean = () => {
    array[selectedBox[0]][selectedBox[1]] = [];
    setRender(!render);
  };

  const numInput = (num) => {
    let row = selectedBox[0]
    let col = selectedBox[1]
    array[row][col] = num;
    setSelectedBox([col == 8 ? row + 1 : row, col + 1 >= 9 ? 0 : col + 1]);
    row = col == 8 ? row + 1 : row;
    col = col + 1 >= 9 ? 0 : col + 1;
    setRender(!render);
  }

  const select = (row, col) => {
    setSelectedBox([row, col]);
    window.onkeyup = (e) => {
      if (e.code.startsWith("Digit")) {
        array[row][col] = Number.parseInt(e.key);
        setSelectedBox([col == 8 ? row + 1 : row, col + 1 >= 9 ? 0 : col + 1]);
        row = col == 8 ? row + 1 : row;
        col = col + 1 >= 9 ? 0 : col + 1;
        setRender(!render);
      } else if (e.code.startsWith("Arrow")) {
        // let row = selectedBox[0]
        // let col = selectedBox[1]
        if (e.key.endsWith("Up")) {
          row = row - 1 < 0 ? 0 : row - 1;
          setSelectedBox([row, col]);
        } else if (e.key.endsWith("Down")) {
          row = row + 1 > 8 ? 8 : row + 1;
          setSelectedBox([row, col]);
        } else if (e.key.endsWith("Left")) {
          col = col - 1 < 0 ? 0 : col - 1;
          setSelectedBox([row, col]);
        } else if (e.key.endsWith("Right")) {
          col = col + 1 > 8 ? 8 : col + 1;
          setSelectedBox([row, col]);
        }
      }
    };
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex" style={{flexDirection: height.current > width.current ? "column" : "row"}}>
        <div style={{width: width.current > height.current ? size / 9 : 0, height: width.current > height.current ? size : 0}}></div>
        <div
          style={{ width: size + 4, height: size + 4 }}
          className="m-auto mt-4 border-2 border-white bg-black"
        >
          {array.map((e, i) => {
            return (
              <div
                key={i}
                style={{
                  width: size,
                  height: size / 9,
                  borderBottom:
                    i == 2 || i == 5 ? `1px solid white` : "1px solid gray",
                }}
                className="border flex bg-black"
              >
                {e.map((f, j) => {
                  return (
                    <div
                      key={j}
                      data-row={i}
                      data-col={j}
                      id={`${i}${j}`}
                      style={{
                        width: size / 9,
                        borderRight:
                          j == 2 || j == 5
                            ? "2px solid white"
                            : "1px solid gray",
                        backgroundColor:
                          selectedBox[0] == i && selectedBox[1] == j
                            ? "cyan"
                            : "",
                      }}
                      className={`h-full border flex items-center justify-center font-bold text-3xl bg-blue-900 cursor-pointer text-white duration-300 box`}
                      onClick={() => select(i, j)}
                    >
                      <span>
                        {Number.isInteger(array[i][j]) ? array[i][j] : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between" style={{width: width.current > height.current ? size / 9 : size, height: width.current > height.current ? size : size / 9, flexDirection: width.current > height.current ? "column": "row"}}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((e)=> {
              return(
                <div className={`bg-white rounded-full flex items-center justify-center text-2xl cursor-pointer select-none`} style={{width: size / 10, height: size / 10}} onClick={() => numInput(e)} key={e}>
                  <span>{e}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="flex m-auto mt-4">
        <button style={style.button} onClick={reset}>
          Reset
        </button>
        <button
          style={style.button}
          onClick={() => {
            setGameArray(array);
          }}
        >
          Solve
        </button>
        <button style={style.button} onClick={clean}>
          Clean
        </button>
      </div>
    </div>
  );
};

let style = {
  button: {
    color: "white",
    fontSize: "1.5rem",
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "#40A2E3",
    borderRadius: 3,
    margin: 4,
  },
};

export default SudokuBox;

/*
[
              [7, [], [], 3, 2, 8, 6, [], 9],
              [[], 2, 6, [], [], [], 8, 4, 3],
              [8, 1, 3, 9, 6, [], 7, 2, []],
              [[], [], [], [], [], [], [], [], []],
              [[], [], 7, 8, [], [], 5, [], 6],
              [1, 9, 8, [], 7, [], [], [], []],
              [[], [], 9, 1, 8, 6, 3, 5, []],
              [6, [], 2, [], [], [], [], [], []],
              [5, 8, [], 4, [], [], [], [], 7],
            ]
*/
