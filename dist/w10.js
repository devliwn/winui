document.head.insertAdjacentHTML(
    "beforeend",
    `
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        #i {
            position: relative;
        }
        .object {
            position: absolute;
        }
    </style>
    `
);
const body = document.querySelector("#i");
function zink(code) {
    var data = code.split("\n").filter(String);
    // console.log(data);
    data.forEach((line) => {
        // console.log(line);
        var keyWord = line.split("~").filter(String)[0];
        var property = line.split("~").filter(String)[1].replace("{", "").replace("}", "");
        // console.log(keyWord);
        switch (keyWord) {
            // ========== SCREEN SETUP ==========
            case "scr": {
                // console.log(property);
                var sizes = property.split(",");
                console.log(sizes);
                body.style.width = sizes[0] + "px";
                body.style.height = sizes[1] + "px";
                break;
            }
            case "scrBg": {
                body.style.backgroundColor = property;
                break;
            }
            // ========== DRAW ==========
            case "draw:rect": {
                var styles = property.split("|");
                var position = styles[0].split(",");
                var sizes = styles[1].split(",");
                var color = styles[2];
                var border = styles[3];
                var parameter = `${position[0]},${position[1]} ${position[0]},${parseInt(sizes[1]) + parseInt(position[1])} ${parseInt(sizes[0]) + parseInt(position[0])},${parseInt(sizes[1]) + parseInt(position[1])} ${parseInt(sizes[0]) + parseInt(position[0])},${position[1]}`;
                function checkBorder() {
                    if (border == undefined) {
                        return "";
                    } else {
                        return border.split(",");
                    }
                }
                body.insertAdjacentHTML(
                    "beforeend",
                    `
                    <polygon
                    points="${parameter}"
                    style="fill:${color}; stroke:${checkBorder()[1]}; stroke-width:${checkBorder()[0]}"
                    >
                    `
                );
                break;
            }
            case "draw:tri": {
                var styles = property.split("|");
                var a = styles[0];
                var b = styles[1];
                var c = styles[2];
                var color = styles[3];
                var border = styles[4];
                function checkBorder() {
                    if (border == undefined) {
                        return "";
                    } else {
                        return border.split(",");
                    }
                }
                var parameter = `${a} ${b} ${c}`;
                console.log(parameter);
                body.insertAdjacentHTML(
                    "beforeend",
                    `
                    <polygon
                    points="${parameter}"
                    style="fill:${color}; stroke:${checkBorder()[1]}; stroke-width:${checkBorder()[0]}"
                    >
                    `
                );
            }
            // ========== COMMENT ==========
            case "?": {
                break;
            }
            // ========== ERROR ==========
            default: {
                body.insertAdjacentHTML("beforeend", `<p style='color: red'>The keyWord you typed ('${keyWord}') is not supported.</p>`);
            }
        }
    });
}
zink(`
scr~{1000,500}
scrBg~{#333}
?~{=====DRAW=====}
draw:rect~{20,20|300,150|transparent|1,#fff}
draw:tri~{170,20|20,170|320,95|red|1,#fff}
`);
