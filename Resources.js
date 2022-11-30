window.onload = function (){
    document.getElementById("races").addEventListener("click", function(){Races()});
    document.getElementById("spells").addEventListener("click", function(){Spells()});
    document.getElementById("classes").addEventListener("click", function(){Classes()});

}


// Races
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

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json() 
        .then((sheet) => {
            const campaigns = [];
            sheet.forEach(element => {if(campaigns.includes(element.Campaign)){}else{campaigns.push(element.Campaign);}});
            
            var myDiv = document.getElementById("row2");
            campaigns.forEach(element => {

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

            });
            console.log(campaigns);
        })
    );
}

function Campaigns(campaign){
    //row 2
    //clearing the lower rows
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json()
        .then((sheet) =>{
            const subraces = [];
            sheet.forEach(element=> {if(subraces.includes(element.SubType)){}else if(element.Campaign == campaign){subraces.push(element.SubType);}});
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
                });
            console.log(subraces);
        })
    );
}

function Subraces(campaign, subrace){
    //row 3
    //clearing the lower rows
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    wipeRow(row4);
    wipeRow(row5);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json()
        .then((sheet) =>{
            const subraces = [];
            sheet.forEach(element=> {if(subraces.includes(element.Name)){}else if(element.Campaign == campaign &&element.SubType == subrace){subraces.push(element.Name);}});
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
                });
            console.log(subraces);
        })
    );
}

function RaceInformation(campaign, subrace, name){
    //row 4
    //clearing the lower rows
    var row5 = document.getElementById("row5");
    wipeRow(row5);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json()
        .then((sheet) =>{
            sheet.forEach(element=> {if(element.Name == name && campaign == element.Campaign && subrace==element.SubType){var myDiv = document.getElementById("row5");
            var p = document.createElement("p");
            p.innerHTML = element.Description;
            myDiv.appendChild(p);
            console.log(element);
        }else {}});
            
            
            
            
        })
    );
}



//spells
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


    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                
                const branch = [];
                sheet.forEach(element => {if(branch.includes(element.SpellBranch)){}else{branch.push(element.SpellBranch);}});
                var myDiv = document.getElementById("row2")
                branch.forEach(element => {
                    
                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element;
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row1";
                    input.id = element;
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){Branches(element)});
                    myDiv.appendChild(label);


                    // let label = document.createElement("label");
                    // label.innerText = element;
                    // label.htmlFor = element + "row1";
                    // let input = document.createElement("input");
                    // input.type = "radio";
                    // input.name = "row1";
                    // input.id = element;
                    // myDiv.appendChild(input);
                    // label.addEventListener("click", function(){Branches(element)});
                    // myDiv.appendChild(label);
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

    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                
                const book = [];
                sheet.forEach(element => {if(book.includes(element.SpellBook)){}else if(element.SpellBranch == branch){book.push(element.SpellBook);}});
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
    
    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                const spells = [];
                sheet.forEach(element => {if(spells.includes(element.SpellName)){}else if(element.SpellBranch == branch && element.SpellBook == book){spells.push(element.SpellName);}});
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

    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                sheet.forEach(element => {if(element.SpellBranch == branch && element.SpellBook == book && element.SpellName == spell){

                    
                    var myDiv = document.getElementById("row5");
                    var p = document.createElement("p");
                    p.innerHTML = "Name: " + element.SpellName;
                    myDiv.appendChild(p);
                    var p = document.createElement("p");
                    p.innerHTML = "Mana Cost: " + element.ManaCost;
                    myDiv.appendChild(p);
                    var p = document.createElement("p");
                    p.innerHTML = "Range: " + element.Range;
                    myDiv.appendChild(p);
                    var p = document.createElement("p");
                    p.innerHTML = "Hit Die: " + element.HitDie;
                    myDiv.appendChild(p);
                    var p = document.createElement("p");
                    p.innerHTML = "Type: " + element.DamageType;
                    myDiv.appendChild(p);
                    var p = document.createElement("p");
                    p.innerHTML = "Durration: " + element.Durration;
                    myDiv.appendChild(p);
                    var p = document.createElement("p");
                    p.innerHTML = "Description: " + element.Description;
                    myDiv.appendChild(p);
                    
                    
                    console.log(element);
                }});
        })
    );
}


//Classes

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


    fetch(`https://derpipose.github.io/JsonFiles/Classes.json`)
        .then((result) => result.json() 
        .then((sheet) => {
            
            const type = [];
            sheet.forEach(element => {if(type.includes(element.Classification)){}else{type.push(element.Classification);}});
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

    fetch(`https://derpipose.github.io/JsonFiles/Classes.json`)
        .then((result) => result.json() 
        .then((sheet) => {
            
            const classes = [];
            sheet.forEach(element => {if(classes.includes(element.ClassName)){}else if(element.Classification == type){classes.push(element.ClassName);}});
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
            });
            
            
            console.log(classes);
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

    fetch(`https://derpipose.github.io/JsonFiles/Classes.json`)
        .then((result) => result.json() 
        .then((sheet) => {
            sheet.forEach(element => { if(element.Classification == type && element.ClassName==className){
                var myDiv = document.getElementById("row4");
                var p = document.createElement("p");
                p.innerHTML = "Name: " + element.ClassName;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Mana Die: " + element.ManaDie;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Hit Die: " + element.HitDie;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Magic Books: " + element.MagicBooks;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Cantrips: " + element.Cantrips;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Chances: " + element.Chances;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Skills: " + element.ProficiencyCount;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Description: " + element.Description;
                myDiv.appendChild(p);
                console.log(element);
            }});
        })
    );
}






function wipeRow(row){
    while(row.firstChild){
        row.removeChild(row.lastChild);
    }
}