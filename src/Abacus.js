import { useEffect, useRef, useState } from "react";

export const Abacus = ({ data, ...others }) => {
    const canvasRef = useRef(null);
    const [arr, setArr] = useState(data);

    //function to check beed position on top
    const checkTop = (my, mx) => {
        arr.forEach((el, i) => {
            const top = el[1]
            if ((my >= top[1] && my <= top[1] + top[3])
                && (mx >= top[0] && mx <= top[0] + top[2])) {
                const newArr = [...arr];
                newArr[i][1] = [(30 * i) + 10, 40, 20, 15];
                setArr(newArr);
            };
        });
    }

    // function to check beed position near reckoning bar and move it to the top
    const checkTopInverse = (my, mx) => {
        arr.forEach((el, i) => {
            const top = el[1]
            if ((my >= top[1] && my <= top[1] + top[3])
                && (mx >= top[0] && mx <= top[0] + top[2])) {
                const newArr = [...arr];
                newArr[i][1] = [(30 * i) + 10, 5, 20, 15];
                setArr(newArr);
            };
        });
    }

    // function to check beed position on bottom and move all beeds that are above it to the near of the reckoning bar
    const checkBottom = (my, mx) => {
        arr.forEach((el, i) => {
            el[2].forEach((bottom, j) => {
                if ((my >= bottom[1] && my <= bottom[1] + bottom[3])
                    && (mx >= bottom[0] && mx <= bottom[0] + bottom[2])) {
                    const newArr = [...arr];
                    for (let index = j; index < newArr[i][2].length; index++) {
                        newArr[i][2][index] = [(30 * i) + 10, 60 + ((16 * (3 - index)) + 10), 20, 15];
                    }
                    setArr(newArr);
                };
            });
        });
    }

    // function to check beed position near reckoning bar and move all beeds below it to the bottom
    const checkBottomInverse = (my, mx) => {
        arr.forEach((el, i) => {
            el[2].forEach((bottom, j) => {
                if ((my >= bottom[1] && my <= bottom[1] + bottom[3])
                    && (mx >= bottom[0] && mx <= bottom[0] + bottom[2])) {
                    const newArr = [...arr];
                    for (let index = j; index >= 0; index--) {
                        newArr[i][2][index] = [(30 * i) + 10, 200 - ((16 * (index)) + 20), 20, 15];
                    }
                    setArr(newArr);
                };
            });
        });
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        //setting background color
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 500, 300);
        ctx.save();

        let BB, BBoffsetX, BBoffsetY;
        setBB();

        let rect = { x: 0, y: 0, w: 400, h: 200 };

        canvas.onmousedown = handleMousedown;

        //mouse pointer handler
        function handleMousedown(e) {
            e.preventDefault();
            e.stopPropagation();
            let mx = e.clientX - BBoffsetX;
            let my = e.clientY - BBoffsetY;
            if (mx >= rect.x && mx <= rect.x + rect.w && my >= rect.y && my <= rect.y + rect.h) {
                if (my >= 5 && my <= 36)  checkTop(my, mx);
                if (my >= 40 && my <= 55)  checkTopInverse(my, mx);
                if (my >= 116 && my <= 195) checkBottom(my, mx);
                if (my >= 70 && my <= 118) checkBottomInverse(my, mx);
            }
        }

        function setBB() {
            BB = canvas.getBoundingClientRect();
            BBoffsetX = BB.left;
            BBoffsetY = BB.top;
        }


        arr.map((el, i) => {
            const [rect, top, bottom] = el;
            let digit = 0;

            ctx.fillStyle = "black";
            ctx.fillRect(rect[0], rect[1], rect[2], rect[3]);
            ctx.save();

            if (top[1] > 5) digit += 5;
            ctx.fillStyle = "#CE5959";
            ctx.beginPath();
            ctx.roundRect(top[0], top[1], top[2], top[3], 20);
            ctx.fill();
            ctx.save();

            bottom?.map((element, j) => {
                if (element[1] < (200 - ((16 * j) + 20))) digit += 1;
                ctx.fillStyle = "#CE5959";
                ctx.beginPath();
                ctx.roundRect(element[0], element[1], element[2], element[3], 20);
                ctx.fill();
                ctx.save();
            });

            ctx.font = "20px Comic Sans MS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(digit, rect[0] + 10, 200 + 30);
        });

        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, 400, 200);
        ctx.save();

        ctx.fillStyle = "black";
        ctx.fillRect(0, 60, 400, 8);

    }, [arr])
    return (
        <canvas ref={canvasRef} {...others} />
    )
}