// prettier-ignore
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=pSBCr(c0),P=p<0,t=c1&&c1!="c"?pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}
function getTheme(component, theme) {
    var componentTheme = component.getAttribute(theme);
    return componentTheme;
}
function getType(component, type) {
    var componentType = component.getAttribute(type);
    return componentType;
}
document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.userSelect = "none";
    btn.style.color = "transparent";
    btn.style.fontWeight = "400";
    btn.style.padding = "4px 11px 6px 11px";
    btn.style.fontSize = "14px";
    btn.style.lineHeight = "20px";
    btn.style.border = "0";
    btn.style.borderRadius = "4px";
    btn.style.position = "relative";
    btn.insertAdjacentHTML(
        "beforeend",
        `<div class="overlay"><div class="overlay-inner">${btn.innerText}</div></div>`
    );
    const overlay = btn.querySelector(".overlay");
    const overlayInner = btn.querySelector(".overlay-inner");
    overlay.style.position = overlayInner.style.position = "absolute";
    overlay.style.top = overlay.style.left = "0";
    overlay.style.height = overlay.style.width = "100%";
    overlay.style.borderRadius = "4px";
    overlayInner.style.top = overlayInner.style.left = "1px";
    overlayInner.style.borderRadius = "3px";
    overlayInner.style.height = overlayInner.style.width = "calc(100% - 2px)";
    overlayInner.style.display = "flex";
    overlayInner.style.alignItems = "center";
    overlayInner.style.justifyContent = "center";
    overlayInner.style.color = "#000";
    if (getTheme(btn, "theme") == "light") {
        btn.querySelector(".overlay").style.backgroundImage =
            "linear-gradient(180deg, rgba(0, 0, 0, 0.0578) 90.58%, rgba(0, 0, 0, 0.1622) 100%)";
        btn.style.backgroundColor = "transparent";
        btn.querySelector(".overlay-inner").style.backgroundColor = "#fff";
        btn.addEventListener("mouseover", function () {
            this.style.backgroundColor = "rgba(249, 249, 249, 0.5)";
            this.querySelector(".overlay-inner").style.backgroundColor =
                "rgba(255, 255, 255, 0.8)";
        });
        btn.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "transparent";
            this.querySelector(".overlay-inner").style.backgroundColor = "#fff";
        });
        btn.addEventListener("mousedown", function () {
            this.style.backgroundColor = "transparent";
            this.querySelector(".overlay").style.backgroundImage =
                "linear-gradient(rgba(0, 0, 0, 6.78%), rgba(0, 0, 0, 6.78%))";
            this.querySelector(".overlay-inner").style.backgroundColor =
                "rgba(255, 255, 255, 0.95)";
            this.querySelector(".overlay-inner").style.color =
                "rgba(0, 0, 0, 60.63%)";
        });
        btn.addEventListener("mouseup", function () {
            this.style.backgroundColor = "rgba(249, 249, 249, 0.5)";
            this.querySelector(".overlay").style.backgroundImage =
                "linear-gradient(180deg, rgba(0, 0, 0, 0.0578) 90.58%, rgba(0, 0, 0, 0.1622) 100%)";
            this.querySelector(".overlay-inner").style.backgroundColor =
                "rgba(255, 255, 255, 0.8)";
            this.querySelector(".overlay-inner").style.color = "#000";
        });
        if (getType(btn, "type") == "accent") {
            function color() {
                if (btn.getAttribute("color") == null) {
                    return "#005FB8";
                } else {
                    return btn.getAttribute("color");
                }
            }
            btn.querySelector(".overlay-inner").style.color = "#fff";
            btn.style.backgroundColor = color();
            btn.querySelector(".overlay-inner").style.backgroundColor = color();
            btn.querySelector(".overlay").style.backgroundImage =
                "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 90.67%, rgba(0, 0, 0, 0.4) 100%)";
            btn.addEventListener("mouseover", function () {
                this.style.backgroundColor = pSBC(0.02, color());
                this.querySelector(".overlay-inner").style.backgroundColor =
                    pSBC(0.02, color());
                this.querySelector(".overlay-inner").style.color = "#fff";
            });
            btn.addEventListener("mouseleave", function () {
                this.style.backgroundColor = color();
                this.querySelector(".overlay-inner").style.backgroundColor =
                    color();
            });
            btn.addEventListener("mousedown", function () {
                this.style.backgroundColor = pSBC(0.05, color());
                btn.querySelector(".overlay").style.backgroundImage =
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 90.67%, rgba(0, 0, 0, 0.4) 100%)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    pSBC(0.05, color());
                this.querySelector(".overlay-inner").style.color =
                    "rgba(255, 255, 255, 0.75)";
            });
            btn.addEventListener("mouseup", function () {
                this.style.backgroundColor = pSBC(0.02, color());
                btn.querySelector(".overlay").style.backgroundImage =
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 90.67%, rgba(0, 0, 0, 0.4) 100%)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    pSBC(0.02, color());
                this.querySelector(".overlay-inner").style.color = "#fff";
            });
        }
        if (getType(btn, "type") == "hyperlink") {
            function color() {
                if (btn.getAttribute("color") == null) {
                    return "#005FB8";
                } else {
                    return btn.getAttribute("color");
                }
            }
            btn.querySelector(".overlay-inner").style.color = color();
            btn.querySelector(".overlay-inner").style.textDecoration =
                "underline";
            btn.style.backgroundColor = "transparent";
            btn.querySelector(".overlay-inner").style.backgroundColor =
                "transparent";
            btn.querySelector(".overlay").style.backgroundImage =
                "linear-gradient(transparent, transparent)";
            btn.addEventListener("mouseover", function () {
                this.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    "transparent";
            });
            btn.addEventListener("mouseleave", function () {
                this.style.backgroundColor = "transparent";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    "transparent";
            });
            btn.addEventListener("mousedown", function () {
                this.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                this.querySelector(".overlay").style.backgroundImage =
                    "linear-gradient(transparent, transparent)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    "transparent";
                this.querySelector(".overlay-inner").style.color = pSBC(
                    0.1,
                    color()
                );
            });
            btn.addEventListener("mouseup", function () {
                this.querySelector(".overlay").style.backgroundImage =
                    "linear-gradient(transparent, transparent)";
                this.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    "transparent";
                this.querySelector(".overlay-inner").style.color = color();
            });
        }
    }
    if (getTheme(btn, "theme") == "dark") {
        btn.querySelector(".overlay").style.backgroundImage =
            "linear-gradient(180deg, rgba(255, 255, 255, 0.093) 0%, rgba(255, 255, 255, 0.0698) 9.57%)";
        btn.style.backgroundColor = "transparent";
        btn.querySelector(".overlay-inner").style.backgroundColor = "#2a2a2a";
        btn.querySelector(".overlay-inner").style.color = "#fff";
        btn.addEventListener("mouseover", function () {
            this.querySelector(".overlay-inner").style.backgroundColor =
                "#2F2F2F";
        });
        btn.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "transparent";
            this.querySelector(".overlay-inner").style.backgroundColor =
                "#2a2a2a";
        });
        btn.addEventListener("mousedown", function () {
            this.style.backgroundColor = "transparent";
            this.querySelector(".overlay").style.backgroundImage =
                "linear-gradient(rgba(255, 255, 255, 6.98%), rgba(255, 255, 255, 6.98%))";
            this.querySelector(".overlay-inner").style.backgroundColor =
                "#232323";
            this.querySelector(".overlay-inner").style.color =
                "rgba(255, 255, 255, 0.5)";
        });
        btn.addEventListener("mouseup", function () {
            btn.querySelector(".overlay").style.backgroundImage =
                "linear-gradient(180deg, rgba(255, 255, 255, 0.093) 0%, rgba(255, 255, 255, 0.0698) 9.57%)";
            this.querySelector(".overlay-inner").style.backgroundColor =
                "#2f2f2f";
            this.querySelector(".overlay-inner").style.color = "#fff";
        });
        if (getType(btn, "type") == "accent") {
            function color() {
                if (btn.getAttribute("color") == null) {
                    return "#60CDFF";
                } else {
                    return btn.getAttribute("color");
                }
            }
            btn.querySelector(".overlay-inner").style.color = "#000";
            btn.style.backgroundColor = color();
            btn.querySelector(".overlay-inner").style.backgroundColor = color();
            btn.querySelector(".overlay").style.backgroundImage =
                "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 90.67%, rgba(0, 0, 0, 0.14) 100%)";
            btn.addEventListener("mouseover", function () {
                this.style.backgroundColor = pSBC(-0.15, color());
                this.querySelector(".overlay-inner").style.backgroundColor =
                    pSBC(-0.15, color());
                this.querySelector(".overlay-inner").style.color = "#000";
            });
            btn.addEventListener("mouseleave", function () {
                this.style.backgroundColor = color();
                this.querySelector(".overlay-inner").style.backgroundColor =
                    color();
            });
            btn.addEventListener("mousedown", function () {
                this.style.backgroundColor = pSBC(-0.2, color());
                btn.querySelector(".overlay").style.backgroundImage =
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 90.67%, rgba(0, 0, 0, 0.4) 100%)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    pSBC(-0.2, color());
                this.querySelector(".overlay-inner").style.color =
                    "rgba(0, 0, 0, 0.5)";
            });
            btn.addEventListener("mouseup", function () {
                this.style.backgroundColor = pSBC(-0.15, color());
                btn.querySelector(".overlay").style.backgroundImage =
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 90.67%, rgba(0, 0, 0, 0.4) 100%)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    pSBC(-0.15, color());
                this.querySelector(".overlay-inner").style.color = "#000";
            });
        }
        if (getType(btn, "type") == "hyperlink") {
            function color() {
                if (btn.getAttribute("color") == null) {
                    return "#60CDFF";
                } else {
                    return btn.getAttribute("color");
                }
            }
            btn.querySelector(".overlay-inner").style.color = color();
            btn.querySelector(".overlay-inner").style.textDecoration =
                "underline";
            btn.style.backgroundColor = "transparent";
            btn.querySelector(".overlay-inner").style.backgroundColor =
                "transparent";
            btn.querySelector(".overlay").style.backgroundImage =
                "linear-gradient(transparent, transparent)";
            btn.addEventListener("mouseover", function () {
                this.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    "transparent";
            });
            btn.addEventListener("mouseleave", function () {
                this.style.backgroundColor = "transparent";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    "transparent";
            });
            btn.addEventListener("mousedown", function () {
                this.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                this.querySelector(".overlay").style.backgroundImage =
                    "linear-gradient(transparent, transparent)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    "transparent";
                this.querySelector(".overlay-inner").style.color = pSBC(
                    -0.2,
                    color()
                );
            });
            btn.addEventListener("mouseup", function () {
                this.querySelector(".overlay").style.backgroundImage =
                    "linear-gradient(transparent, transparent)";
                this.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                this.querySelector(".overlay-inner").style.backgroundColor =
                    "transparent";
                this.querySelector(".overlay-inner").style.color = color();
            });
        }
    }
    if (btn.hasAttribute("btn-block") == true) {
        btn.style.display = "block";
        btn.style.width = "100%";
    }
    if (btn.hasAttribute("disabled") == true) {
        btn.style.opacity = "0.5";
        btn.style.pointerEvents = "none";
    }
});
document.querySelectorAll(".text-box").forEach((field) => {
    function width() {
        if (field.getAttribute("width") == null) {
            return "150px";
        } else {
            return field.getAttribute("width") + "px";
        }
    }
    console.log(field.outerHTML);
    field.style.display = "block";
    field.style.width = width();
    field.style.outline = "none";
    field.style.borderRadius = "4px";
    field.style.position = "relative";
    field.style.overflow = "hidden";
    field.insertAdjacentHTML(
        "afterbegin",
        `
    <input class="${field.getAttribute("class")}" id="${field.getAttribute(
            "id"
        )}" placeholder="${field.getAttribute(
            "placeholder"
        )}" name="${field.getAttribute("name")}">
    <div class="underline"></div>
    `
    );
    const line = field.querySelector(".underline");
    const input = field.querySelector("input");
    input.style.padding = "5px 35px 5px 11px";
    input.style.width = "100%";
    input.style.border = "none";
    input.style.outline = "none";
    input.style.fontSize = "14px";
    input.style.lineHeight = "20px";
    input.style.backgroundColor = "transparent";
    input.style.borderRadius = "4px";
    line.style.position = "absolute";
    line.style.bottom = 0;
    line.style.left = 0;
    line.style.height = "1px";
    line.style.width = "100%";
    line.style.display = "block";
    line.style.backgroundColor = "red";
    line.style.transition = ".2s ease";
    if (getTheme(field, "theme") == "light") {
        function color() {
            if (field.getAttribute("color") == null) {
                return "#005FB8";
            } else {
                return field.getAttribute("color");
            }
        }
        field.style.backgroundColor = "transparent";
        input.style.border = "1px solid rgba(0, 0, 0, 10.78%)";
        line.style.backgroundColor = "transparent";
        input.addEventListener("mouseover", function () {
            input.style.borderColor = "rgba(0, 0, 0, 0.2)";
            field.style.backgroundColor = "transparent";
        });
        input.addEventListener("mouseleave", function () {
            input.style.borderColor = "rgba(0, 0, 0, 10.78%)";
        });
        input.addEventListener("click", function () {
            field.style.backgroundColor = "#fff";
            line.style.backgroundColor = color();
            line.style.height = "2px";
            input.addEventListener("mouseover", function () {
                field.style.backgroundColor = "#fff";
            });
            input.addEventListener("mouseleave", function () {
                field.style.backgroundColor = "#fff";
            });
        });
        input.addEventListener("blur", function () {
            field.style.backgroundColor = "transparent";
            line.style.backgroundColor = "transparent";
            line.style.height = "1px";
            input.addEventListener("mouseover", function () {
                input.style.borderColor = "rgba(0, 0, 0, 0.2)";
                field.style.backgroundColor = "transparent";
            });
            input.addEventListener("mouseleave", function () {
                field.style.backgroundColor = "transparent";
            });
        });
    }
    if (getTheme(field, "theme") == "dark") {
        function color() {
            if (field.getAttribute("color") == null) {
                return "#60CDFF";
            } else {
                return field.getAttribute("color");
            }
        }
        input.style.color = "#fff";
        field.style.backgroundColor = "transparent";
        input.style.border = "1px solid rgba(255, 255, 255, 20.78%)";
        line.style.backgroundColor = "transparent";
        input.addEventListener("mouseover", function () {
            input.style.borderColor = "rgba(255, 255, 255, 0.35)";
            field.style.backgroundColor = "transparent";
        });
        input.addEventListener("mouseleave", function () {
            input.style.borderColor = "rgba(255, 255, 255, 20.78%)";
        });
        input.addEventListener("click", function () {
            field.style.backgroundColor = "#000";
            line.style.backgroundColor = color();
            line.style.height = "2px";
            input.addEventListener("mouseover", function () {
                field.style.backgroundColor = "#000";
            });
            input.addEventListener("mouseleave", function () {
                field.style.backgroundColor = "#000";
            });
        });
        input.addEventListener("blur", function () {
            field.style.backgroundColor = "transparent";
            line.style.backgroundColor = "transparent";
            line.style.height = "1px";
            input.addEventListener("mouseover", function () {
                input.style.borderColor = "rgba(255, 255, 255, 0.35)";
                field.style.backgroundColor = "transparent";
            });
            input.addEventListener("mouseleave", function () {
                field.style.backgroundColor = "transparent";
            });
        });
    }
    if (field.hasAttribute("text-box-block") == true) {
        field.style.width = "100%";
    }
});
