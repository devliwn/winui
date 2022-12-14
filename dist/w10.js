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
    data.forEach((line) => {
        // ========== COMMENT ==========
        if (line[0] == "#") {
            return "";
        } else {
            var keyWord = line.split("~").filter(String)[0];
            var property = line.split("~").filter(String)[1].replace("{", "").replace("}", "");
            switch (keyWord) {
                // ========== SCREEN SETUP ==========
                case "scr": {
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
                    break;
                }
                case "draw:circle": {
                    var styles = property.split("|");
                    var parameter = styles[0].split(",");
                    var border = styles[3];
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
                    <circle cx="${parameter[0]}" cy="${parameter[1]}" r="${styles[1]}" fill="${styles[2]}" stroke="${checkBorder()[1]}" stroke-width="${checkBorder()[0]}">
                    `
                    );
                    break;
                }
                case "text": {
                    var styles = property.split("|");
                    var parameter = styles[0].split(",");
                    body.insertAdjacentHTML(
                        "beforeend",
                        `
                    <text x="${parameter[0]}" y="${parameter[1]}" fill="${styles[3]}" style="font-size: ${styles[2]}px;">${styles[1]}</text>
                    `
                    );
                    break;
                }
                // ========== ERROR ==========
                default: {
                    body.insertAdjacentHTML("beforeend", `<text x="300" y="300" fill="red">The keyWord you typed ('${keyWord}') is not supported.</text>`);
                }
            }
        }
    });
}
zink(`
#=====SETUP=====
scr~{1000,500}
scrBg~{#333}
#=====DRAW=====
draw:rect~{20,20|300,150|green|1,#fff}
draw:tri~{170,20|20,170|320,95|red|1,#fff}
draw:circle~{170,20|10|yellow|3,green}
draw:circle~{20,170|10|yellow|3,green}
draw:circle~{320,95|10|yellow|3,green}
#=====TEXT======
text~{20,210|This is the sample text|20|green}
`);
