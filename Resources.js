window.onload = function (){
    // REQUIREMENT Event listeners
    document.getElementById("races").addEventListener("click", function(){Races()});
    document.getElementById("spells").addEventListener("click", function(){Spells()});
    document.getElementById("classes").addEventListener("click", function(){Classes()});

}
let localHostNum = 5084



function Races(){
    //row 1
    //clearing the lower rows
    var row2 = document.getElementById("row2");
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row2);
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);

    // REQUIREMENT use ajax to interact with api
    fetch(`http://localhost:${localHostNum}/races`)
    .then((result) => result.json() 
        .then((sheet) => {
            const campaigns = [];
            sheet.forEach(element => {if(campaigns.includes(element.campaign)){}else{campaigns.push(element.campaign);}});
            // Just a test to see if my event listener was working
            // var myDiv = document.getElementById("row2");
            // var button = document.createElement("BUTTON");
            // button.innerHTML = "Button";
            // myDiv.appendChild(button);
            var myDiv = document.getElementById("row2");
            campaigns.forEach(element => {

                // let label = document.createElement("label");
                // label.innerText = element;
                // let input = document.createElement("input");
                // input.type = "radio";
                // input.name = "races";
                // label.appendChild(input);
                // label.addEventListener("click", function(){Campaigns(element)});
                // myDiv.appendChild(label);

                let label = document.createElement("label");
                label.innerText = element;
                label.htmlFor = element;
                let input = document.createElement("input");
                input.type = "radio";
                input.name = "row1";
                input.id = element;
                myDiv.appendChild(input);
                label.addEventListener("click", function(){Campaigns(element)});
                myDiv.appendChild(label);


                // var buttoninput = '<input type="radio" name= "races" id="'+ element +'">';
                // var button = document.createElement(buttoninput);
                // // var button = document.createElement("BUTTON");
                // // button.innerHTML = element;
                // button.addEventListener("click", function(){Campaigns(element)});
                // myDiv.appendChild(button);
                // myDiv.appendChild(label);
                // var button = document.createElement("BUTTON");
                // button.innerHTML = element;
                // button.addEventListener("click", function(){Campaigns(element)});
                // myDiv.appendChild(button);
            });
            console.log(campaigns);
        })
    );
}

function Campaigns(campaign){
    //row 2
    //clearing the lower rows
    // const row2 = document.getElementById('row2')
    // Array.from(row2.elements).forEach(element => {
    // element.style.backgroundColor = 'white';
    // });
    // event.target.style.backgroundColor = 'lightgreen';

    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);

    fetch(`http://localhost:${localHostNum}/racescampaign?campaign=${campaign}`)
    .then((result) => result.json()
        .then((sheet) =>{
            const subraces = [];
            sheet.forEach(element=> {if(subraces.includes(element.subtype)){}else{subraces.push(element.subtype);}});
            var myDiv = document.getElementById("row3");
                subraces.forEach(element => {

                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element;
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row2";
                    input.id = element;
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){Subraces(campaign, element)});
                    myDiv.appendChild(label);
                    // var button = document.createElement("BUTTON");
                    // button.innerHTML = element;
                    // myDiv.appendChild(button);
                });
            console.log(subraces);
        })
    );
}

function Subraces(campaign, subrace){
    //this tells what button has just been pressed
    // event.target.style.backgroundColor = 'lightgreen';


    //row 3
    //clearing the lower rows
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row4);
    wipeRow(row5);

    fetch(`http://localhost:${localHostNum}/racescampaignsubraces?campaign=${campaign}&faction=${subrace}`)
    .then((result) => result.json()
        .then((sheet) =>{
            const subraces = [];
            sheet.forEach(element=> {if(subraces.includes(element.name)){}else{subraces.push(element.name);}});
            var myDiv = document.getElementById("row4");
                subraces.forEach(element => {
                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element;
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row3";
                    input.id = element;
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){RaceInformation(campaign, subrace, element)});
                    myDiv.appendChild(label);
                    // var button = document.createElement("BUTTON");
                    // button.innerHTML = element;
                    // myDiv.appendChild(button);
                });
            console.log(sheet);
        })
    );
}

function RaceInformation(campaign, subrace, name){
    //this tells what button you have just pressed
    // event.target.style.backgroundColor = 'lightgreen';


    //row 4
    //clearing the lower rows
    var row5 = document.getElementById("row5");
    wipeRow(row5);

    fetch(`http://localhost:${localHostNum}/racescampaignsubracesdescription?campaign=${campaign}&faction=${subrace}&raceName=${name}`)
    .then((result) => result.json()
        .then((element) =>{
            
            var myDiv = document.getElementById("row5");
            var p = document.createElement("p");
            p.innerHTML = element.description;
            myDiv.appendChild(p);
            
            console.log(element);
        })
    );
}

// function CampaignRaces(campaign){
//     fetch(`http://localhost:${localHostNum}/races`)
//         .then((result) => result.json() 
//         .then((sheet) => {
            
//             const campaigns = [];
//             sheet.forEach(element => {if(campaigns.includes(element.campaign)){}else{campaigns.push(element.campaign);}});
//             console.log(campaigns);
//         })
//     );
// }

function Spells(){
    //row 1
    //clearing the lower rows
    var row2 = document.getElementById("row2");
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row2);
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);


    fetch(`http://localhost:${localHostNum}/spells`)
        .then((result) => result.json() 
            .then((sheet) => {
                
                const branch = [];
                sheet.forEach(element => {if(branch.includes(element.branch)){}else{branch.push(element.branch);}});
                var myDiv = document.getElementById("row2")
                branch.forEach(element => {

                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element + "row1";
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row1";
                    input.id = element;
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){Branches(element)});
                    myDiv.appendChild(label);
                    // var button = document.createElement("BUTTON");
                    // button.innerHTML = element;
                    // myDiv.appendChild(button);
                })
                
                console.log(branch);
        })
    );
}

function Branches(branch){
    //row 2
    //clearing the lower rows
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);

    fetch(`http://localhost:${localHostNum}/spellsbranches?branch=${branch}`)
        .then((result) => result.json() 
            .then((sheet) => {
                
                const book = [];
                sheet.forEach(element => {if(book.includes(element.book)){}else{book.push(element.book);}});
                var myDiv = document.getElementById("row3")
                book.forEach(element => {

                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element + "_row2";
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row2";
                    input.id = element + "_row2";
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){Books(branch, element)});
                    myDiv.appendChild(label);
                    // var button = document.createElement("BUTTON");
                    // button.innerHTML = element;
                    // myDiv.appendChild(button);
                })
                
                console.log(book);
        })
    );
}

function Books(branch, book){
    //row 3
    //clearing the lower rows
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row4);
    wipeRow(row5);
    
    fetch(`http://localhost:${localHostNum}/spellsbranchesspells?branch=${branch}&book=${book}`)
        .then((result) => result.json() 
            .then((sheet) => {
                const spells = [];
                sheet.forEach(element => {if(spells.includes(element.name)){}else{spells.push(element.name);}});
                var myDiv = document.getElementById("row4")
                spells.forEach(element => {

                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element + "_row3";
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row3";
                    input.id = element + "_row3";
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){SpellInfo(branch, book, element)});
                    myDiv.appendChild(label);
                    // var button = document.createElement("BUTTON");
                    // button.innerHTML = element;
                    // myDiv.appendChild(button);
                })
                
                console.log(sheet);
        })
    );
}

function SpellInfo(branch, book, spell){
    //row 4
    //clearing the lower rows
    var row5 = document.getElementById("row5");
    wipeRow(row5);

    fetch(`http://localhost:${localHostNum}/spellsbranchesspellsdescription?branch=${branch}&book=${book}&spellName=${spell}`)
        .then((result) => result.json() 
            .then((element) => {
                
                var myDiv = document.getElementById("row5");
                var p = document.createElement("p");
                p.innerHTML = "Name: " + element.name;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Mana Cost: " + element.manaCost;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Range: " + element.range;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Hit Die: " + element.hitDie;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Type: " + element.damage;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Durration: " + element.durration;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Description: " + element.description;
                myDiv.appendChild(p);
            
                
                console.log(element);
        })
    );
}




function Classes(){
    //row 1
    //clearing the lower rows
    var row2 = document.getElementById("row2");
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row2);
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);


    fetch(`http://localhost:${localHostNum}/class`)
        .then((result) => result.json() 
        .then((sheet) => {
            
            const type = [];
            sheet.forEach(element => {if(type.includes(element.subClass)){}else{type.push(element.subClass);}});
            var myDiv = document.getElementById("row2");
            // var attribute = 0;
            type.forEach(element => {

                let label = document.createElement("label");
                label.innerText = element;
                label.htmlFor = element;
                let input = document.createElement("input");
                input.type = "radio";
                input.name = "row2";
                input.id = element;
                myDiv.appendChild(input);
                label.addEventListener("click", function(){Types(element)});
                myDiv.appendChild(label);
                // var button = document.createElement("BUTTON");
                // button.innerHTML = element;
                // myDiv.appendChild(button);
            });
            
            
            console.log(type);
        })
    );
}

function Types(type){
    //row 2
    //clearing the lower rows
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);

    fetch(`http://localhost:${localHostNum}/classtypes?type=${type}`)
        .then((result) => result.json() 
        .then((sheet) => {
            
            const classes = [];
            sheet.forEach(element => {if(classes.includes(element.name)){}else{classes.push(element.name);}});
            var myDiv = document.getElementById("row3");
            classes.forEach(element => {
                let label = document.createElement("label");
                label.innerText = element;
                label.htmlFor = element;
                let input = document.createElement("input");
                input.type = "radio";
                input.name = "row3";
                input.id = element;
                myDiv.appendChild(input);
                label.addEventListener("click", function(){ClassInformation(type, element)});
                myDiv.appendChild(label);

                // var button = document.createElement("BUTTON");
                // button.innerHTML = element;
                // myDiv.appendChild(button);
            });
            
            
            console.log(sheet);
        })
    );
}

function ClassInformation(type, className){
    //row 3
    //clearing the lower rows
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row4);
    wipeRow(row5);

    fetch(`http://localhost:${localHostNum}/classtypesinformation?type=${type}&name=${className}`)
        .then((result) => result.json() 
        .then((element) => {
            
            var myDiv = document.getElementById("row4");
            var p = document.createElement("p");
            p.innerHTML = "Name: " + element.name;
            myDiv.appendChild(p);
            var p = document.createElement("p");
            p.innerHTML = "Mana Die: " + element.manaDie;
            myDiv.appendChild(p);
            var p = document.createElement("p");
            p.innerHTML = "Hit Die: " + element.hitDie;
            myDiv.appendChild(p);
            var p = document.createElement("p");
            p.innerHTML = "Magic Books: " + element.magicBooks;
            myDiv.appendChild(p);
            var p = document.createElement("p");
            p.innerHTML = "Cantrips: " + element.cantrips;
            myDiv.appendChild(p);
            var p = document.createElement("p");
            p.innerHTML = "Chances: " + element.chances;
            myDiv.appendChild(p);
            var p = document.createElement("p");
            p.innerHTML = "Proficiency Count: " + element.proficiencyCount;
            myDiv.appendChild(p);
            var p = document.createElement("p");
            p.innerHTML = "Description: " + element.description;
            myDiv.appendChild(p);
            
            
            console.log(element);
        })
    );
}







//With help from Josh
function wipeRow(row){
    while(row.firstChild){
        row.removeChild(row.lastChild);
    }
}