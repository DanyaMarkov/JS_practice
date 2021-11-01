window.onload = function () {
    new Vue({
        el: '#app',
        data: {
            flag: true,

            fav: "",
            def: "",

            zapisFavNames: "",
            zapisDefSurnames: "",

            otvetFavNames: "",
            otvetDefNames: "",
            otvetFavSurnames: "",
            otvetDefSurnames: "",

            arrFavNames: [],
            arrDefNames: [],
            arrFavSurnames: [],
            arrDefSurnames: [],

            name: "",
            surname: "",
            otchestvo: "",
            number: "",
            radioB: 1,
            checked: false,
        },
        methods: {
            addmember: function () {
                this.otvetFavNames = "";
                this.otvetDefNames = "";
                this.otvetFavSurnames = "";
                this.otvetDefSurnames = "";

                if (this.checked == true) {
                    this.zapisFavNames = "<li>" + this.name + " " + this.surname + " " + this.otchestvo + " " + this.number + " ★ " + "</li>";
                    this.zapisFavSurnames = "<li>" + this.surname + " " + this.name + " " + this.otchestvo + " " + this.number + " ★ " + "</li>";
                    this.arrFavNames.push(this.zapisFavNames);
                    this.arrFavSurnames.push(this.zapisFavSurnames);
                    this.arrFavNames.sort();
                    this.arrFavSurnames.sort();
                }
                else {
                    this.zapisDefNames = "<li>" + this.name + " " + this.surname + " " + this.otchestvo + " " + this.number + "</li>";
                    this.zapisDefSurnames = "<li>" + this.surname + " " + this.name + " " + this.otchestvo + " " + this.number + "</li>";
                    this.arrDefNames.push(this.zapisDefNames);
                    this.arrDefSurnames.push(this.zapisDefSurnames);
                    this.arrDefNames.sort();
                    this.arrDefSurnames.sort();
                }

                this.getarr();
                this.getotvet();
            },


            SortNames: function () {
                this.radioB = 1;
                this.flag = true;
                this.getotvet();
            },

            SortSurnames: function () {
                this.radioB = 2;
                this.flag = false;
                this.getotvet();
            },

            getotvet: function () {
                if (this.flag == true) {
                    this.fav = this.otvetFavNames;
                    this.def = this.otvetDefNames;
                }
                else {
                    this.fav = this.otvetFavSurnames;
                    this.def = this.otvetDefSurnames;
                }
            },

            getarr: function () {
                for (i = 0; i < this.arrFavNames.length; ++i) {
                    this.otvetFavNames = this.otvetFavNames + this.arrFavNames[i];
                }
                for (i = 0; i < this.arrDefNames.length; ++i) {
                    this.otvetDefNames = this.otvetDefNames + this.arrDefNames[i];
                }
                for (i = 0; i < this.arrFavSurnames.length; ++i) {
                    this.otvetFavSurnames = this.otvetFavSurnames + this.arrFavSurnames[i];
                }
                for (i = 0; i < this.arrDefSurnames.length; ++i) {
                    this.otvetDefSurnames = this.otvetDefSurnames + this.arrDefSurnames[i];
                }
            },
        },
    });


};


let inputStroke = "";
let currentOperation = "";
let dotExist = false;

let part1 = "";
let part2 = "";

let result = 0;

function addNumber(input) {

    if (input == "." && document.getElementById('inputStroke').value == "") {
        inputStroke += 0;
    }
    else if (input == "." && currentOperation != "" && dotExist == false && part2 == "") {
        //alert("gotcha" + inputStroke);
        inputStroke += 0;
    }

    //Проверка наличия точки
    if (input == "." && dotExist == true) {
        throw new Error("Уже была точка!");
    }
    else if (input == ".") {
        dotExist = true;
    }



    // if (currentOperation != "") {

    //     part1 = document.getElementById('inputStroke').value.split(currentOperation)[0];
    //     dotExist = false;

    // };

    inputStroke += input;

    document.getElementById('inputStroke').value = inputStroke;

    console.log(inputStroke);
    part2 = document.getElementById('inputStroke').value.split(currentOperation)[1];

}

function addOperation(input) {

    if (currentOperation == "") {


        currentOperation = input;
        inputStroke += currentOperation;

        document.getElementById('inputStroke').value += currentOperation;
    }
    else if (input != currentOperation && document.getElementById('inputStroke').value.split(currentOperation)[1] == "") {

        //alert("несовпадение!");
        inputStroke = inputStroke.slice(0, -1);
        document.getElementById('inputStroke').value = document.getElementById('inputStroke').value.slice(0, -1);

        currentOperation = input;
        inputStroke += currentOperation;

        document.getElementById('inputStroke').value += currentOperation;
    }
    else {
        getEqual();
    }
    part2 = "";
    dotExist = false;
}

//Удалить последний символ введенный
function deleteChar() {
    if (part2 != "") {
        inputStroke = inputStroke.slice(0, -1);
        document.getElementById('inputStroke').value = document.getElementById('inputStroke').value.slice(0, -1);
    }
}

//Стереть всё
function deleteInput() {
    currentOperation = "";
    inputStroke = "";
    document.getElementById('inputStroke').value = inputStroke;

    console.log(inputStroke);
}

//Получить ответ
function getEqual() {

    if (currentOperation != "") {
        let a = document.getElementById('inputStroke').value.split(currentOperation)[0];
        let b = document.getElementById('inputStroke').value.split(currentOperation)[1];

        switch (currentOperation) {
            case "+":
                result = Number(a) + Number(b);
                break;
            case "-":
                result = Number(a) - Number(b);
                break;
            case "X":
                result = Number(a) * Number(b);
                break;
            case "-":
                result = Number(a) / Number(b);
                break;

        }

        //alert("Ответ = " + result);
        document.getElementById('inputStroke').value = result;
        inputStroke = result;
        currentOperation = "";
        part1 = result;

    }
    else {
        result = Number(document.getElementById('inputStroke').value);
        //alert("Ответ = " + result);
        inputStroke = result;
        document.getElementById('inputStroke').value = result;
        currentOperation = "";
        part1 = result;
    }

}


