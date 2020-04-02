const body = document.querySelector("body");


document.getElementById("ustaw").addEventListener("click", set_styles)
document.getElementById("usun").addEventListener("click", remove_styles)

function set_styles() {
    let title = document.querySelector(".title");
    title.style.color = "black";
    title.classList.add("azure");

    let main = document.querySelector("main");
    main.classList.add("azure");
    main.style.width = "350px";
    main.style.clear = "left";
    main.style.margin = "15px 0px"

    let nav = document.querySelector("nav");
    nav.style.width = "inline: block";
    nav.style.margin = "10px 0";
    nav.style.float = "left";
    nav.classList.add("azure");

    let aside = document.querySelector("aside");
    aside.style.width = "300px";
    aside.style.margin = "10px 0";
    aside.style.float = "right";
    aside.classList.add("azure");

    let mainH1 = document.querySelector("main > h1");

    mainH1.style.animation = "colors 2s infinite reverse";

    document.querySelector("footer").classList.add("azure");
};



function delete_style_from_element(element) {
    element.style = "none";
    element.classList.remove("azure");
    for (let i = 0; i < element.children.length; i++) {
        delete_style_from_element(element.children[i]);
    }
};

function remove_styles() {
    delete_style_from_element(body);
};