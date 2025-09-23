window.onload = function (){
    document.getElementById("races").addEventListener("click", function(){Races()});
    document.getElementById("spells").addEventListener("click", function(){Spells()});
    document.getElementById("classes").addEventListener("click", function(){Classes()});
    document.getElementById("veterans").addEventListener("click", function(){Vet()});

}


// Races
function Races(){
    //row 1
    //clearing the lower rows
    var row2 = document.getElementById("row2");
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row2);
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json() 
        .then((sheet) => {
            const campaigns = [];
            // console.log("I am updated");
            sheet.forEach(element => {if(element.Starter == "Yes"){ if(campaigns.includes(element.Campaign)){}else{campaigns.push(element.Campaign)}}});
            
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
    var row6 = document.getElementById("row6");
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json()
        .then((sheet) =>{
            const subraces = [];
            sheet.forEach(element=> {if(element.Starter == "Yes"){if(subraces.includes(element.SubType)){}else if(element.Campaign == campaign){subraces.push(element.SubType);}}});
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
            sheet.forEach(element=> {if(element.Starter == "Yes"){if(subraces.includes(element.Name)){}else if(element.Campaign == campaign && element.SubType == subrace){subraces.push(element.Name);}}
            //     if(subraces.includes(element.Name)){}
            // else if(element.Starter == "Yes"){
            //     if(element.Campaign == campaign &&element.SubType == subrace)
            //     {subraces.push(element.Name);}}
            }
                );
            var myDiv = document.getElementById("row4");
                subraces.forEach(element => {
                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element + "_row3";
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row3";
                    input.id = element + "_row3";
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){RaceInformation(campaign, subrace, element)});
                    myDiv.appendChild(label);
                });
            console.log(subraces.Starter);
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
    var row6 = document.getElementById("row6");
    wipeRow(row2);
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);


    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                
                const branch = [];
                sheet.forEach(element => {if(element.Starter == "Yes"){if(branch.includes(element.SpellBranch)){}else{branch.push(element.SpellBranch);}}});
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
                const working = [];
                sheet.forEach(element => {if(element.Starter == "Yes"){if(book.includes(element.SpellBook)){}else if(element.SpellBranch == branch){book.push(element.SpellBook); working.push(element);}}});
                var myDiv = document.getElementById("row3")
                working.forEach(element => {

                    let label = document.createElement("label");
                    label.innerText = element.SpellBook + " : " + element.BookLevel;
                    label.id = element.BookLevel.match(/\S+/g).join("");
                    label.htmlFor = element.SpellBook + "_row2";
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row2";
                    input.id = element.SpellBook + "_row2";
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){Books(branch, element.SpellBook)});
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
                
                console.log(spells);
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
                    p.innerHTML = "Duration: " + element.Durration;
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
    var row6 = document.getElementById("row6");
    wipeRow(row2);
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);


    fetch(`https://derpipose.github.io/JsonFiles/Classes.json`)
        .then((result) => result.json() 
        .then((sheet) => {
            
            const type = [];
            sheet.forEach(element => {if(element.Starter == "Yes"){if(type.includes(element.Classification)){}else{type.push(element.Classification);}}});
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
                p.innerHTML = "Mana Die: D" + element.ManaDie;
                myDiv.appendChild(p);
                var p = document.createElement("p");
                p.innerHTML = "Hit Die: D" + element.HitDie;
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


//Vet Stuff

function Vet(){
    var row2 = document.getElementById("row2");
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row2);
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);

    var myDiv = document.getElementById("row2");
    let races = document.createElement("label");
    races.innerText = "Races";
    races.htmlFor = "VetRaces";
    let raceinput = document.createElement("input");
    raceinput.type = "radio";
    raceinput.name = "VetRow";
    raceinput.id = "VetRaces";
    myDiv.appendChild(raceinput);
    races.addEventListener("click", function(){VetRaces()});
    myDiv.appendChild(races);


    let spells = document.createElement("label");
    spells.innerText = "Spells";
    spells.htmlFor = "VetSpells";
    let spellinput = document.createElement("input");
    spellinput.type = "radio";
    spellinput.name = "row1";
    spellinput.id = "VetSpells";
    myDiv.appendChild(spellinput);
    spells.addEventListener("click", function(){VetSpells()});
    myDiv.appendChild(spells);

    let classes = document.createElement("label");
    classes.innerText = "Classes";
    classes.htmlFor = "VetClasses";
    let classinput = document.createElement("input");
    classinput.type = "radio";
    classinput.name = "row1";
    classinput.id = "VetClasses";
    myDiv.appendChild(classinput);
    classes.addEventListener("click", function(){VetClasses()});
    myDiv.appendChild(classes);classes
    
    
}

// Races
function VetRaces(){
    //row 2
    //clearing the lower rows
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json() 
        .then((sheet) => {
            const campaigns = [];
            // console.log("I am updated");
            sheet.forEach(element => {if(element.Starter == "No"){ if(campaigns.includes(element.Campaign)){}else{campaigns.push(element.Campaign)}}});
            
            var myDiv = document.getElementById("row3");
            campaigns.forEach(element => {

                let label = document.createElement("label");
                label.innerText = element;
                label.htmlFor = element;
                let input = document.createElement("input");
                input.type = "radio";
                input.name = "row1";
                input.id = element;
                myDiv.appendChild(input);
                label.addEventListener("click", function(){VetCampaigns(element)});
                myDiv.appendChild(label);

            });
            console.log(campaigns);
        })
    );
}

function VetCampaigns(campaign){
    //row 3
    //clearing the lower rows
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json()
        .then((sheet) =>{
            const subraces = [];
            sheet.forEach(element=> {if(element.Starter == "No"){if(subraces.includes(element.SubType)){}else if(element.Campaign == campaign){subraces.push(element.SubType);}}});
            var myDiv = document.getElementById("row4");
                subraces.forEach(element => {

                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element;
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row2";
                    input.id = element;
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){VetSubraces(campaign, element)});
                    myDiv.appendChild(label);
                });
            console.log(subraces);
        })
    );
}

function VetSubraces(campaign, subrace){
    //row 4
    //clearing the lower rows
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row5);
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json()
        .then((sheet) =>{
            const subraces = [];
            sheet.forEach(element=> {if(element.Starter == "No"){if(subraces.includes(element.Name)){}else if(element.Campaign == campaign && element.SubType == subrace){subraces.push(element.Name);}}
            //     if(subraces.includes(element.Name)){}
            // else if(element.Starter == "Yes"){
            //     if(element.Campaign == campaign &&element.SubType == subrace)
            //     {subraces.push(element.Name);}}
            }
                );
            var myDiv = document.getElementById("row5");
                subraces.forEach(element => {
                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element;
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row3";
                    input.id = element;
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){VetRaceInformation(campaign, subrace, element)});
                    myDiv.appendChild(label);
                });
            console.log(subraces.Starter);
        })
    );
}

function VetRaceInformation(campaign, subrace, name){
    //row 5
    //clearing the lower rows
    var row5 = document.getElementById("row6");
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Races.json`)
    .then((result) => result.json()
        .then((sheet) =>{
            sheet.forEach(element=> {if(element.Name == name && campaign == element.Campaign && subrace==element.SubType){var myDiv = document.getElementById("row6");
            var p = document.createElement("p");
            p.innerHTML = element.Description;
            myDiv.appendChild(p);
            console.log(element);
        }else {}});
        })
    );
}



//spells
function VetSpells(){
    //row 1
    //clearing the lower rows
    var row3 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);


    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                
                const branch = [];
                sheet.forEach(element => {if(element.Starter == "No"){if(branch.includes(element.SpellBranch)){}else{branch.push(element.SpellBranch);}}});
                var myDiv = document.getElementById("row3")
                branch.forEach(element => {
                    
                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element;
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row2";
                    input.id = element;
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){VetBranches(element)});
                    myDiv.appendChild(label);
                })
                
                console.log(branch);
        })
    );
}

function VetBranches(branch){
    //row 3
    //clearing the lower rows
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                
                const book = [];
                sheet.forEach(element => {if(element.Starter == "No"){if(book.includes(element.SpellBook)){}else if(element.SpellBranch == branch){book.push(element.SpellBook);}}});
                var myDiv = document.getElementById("row4") 
                book.forEach(element => {

                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element + "_row3";
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row3";
                    input.id = element + "_row3";
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){VetBooks(branch, element)});
                    myDiv.appendChild(label);
                })
                
                console.log(book);
        })
    );
}

function VetBooks(branch, book){
    //row 4
    //clearing the lower rows
    var row4 = document.getElementById("row6");
    var row5 = document.getElementById("row5");
    wipeRow(row6);
    wipeRow(row5);
    
    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                const spells = [];
                sheet.forEach(element => {if(element.Starter == "No"){if(spells.includes(element.SpellName)){}else if(element.SpellBranch == branch && element.SpellBook == book){spells.push(element.SpellName);}}});
                var myDiv = document.getElementById("row5")
                spells.forEach(element => {

                    let label = document.createElement("label");
                    label.innerText = element;
                    label.htmlFor = element + "_row4";
                    let input = document.createElement("input");
                    input.type = "radio";
                    input.name = "row4";
                    input.id = element + "_row4";
                    myDiv.appendChild(input);
                    label.addEventListener("click", function(){VetSpellInfo(branch, book, element)});
                    myDiv.appendChild(label);
                })
                
                console.log(spells);
        })
    );
}

function VetSpellInfo(branch, book, spell){
    //row 5
    //clearing the lower rows
    var row5 = document.getElementById("row6");
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Spells.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                sheet.forEach(element => {if(element.SpellBranch == branch && element.SpellBook == book && element.SpellName == spell){

                    
                    var myDiv = document.getElementById("row6");
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
                    p.innerHTML = "Duration: " + element.Durration;
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

function VetClasses(){
    //row 3
    //clearing the lower rows
    var row4 = document.getElementById("row3");
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row3);
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Classes.json`)
        .then((result) => result.json() 
        .then((sheet) => {
            
            const classes = [];
            sheet.forEach(element => {if(element.Starter == "No"){if(classes.includes(element.ClassName)){}else {classes.push(element.ClassName);}}});
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
                label.addEventListener("click", function(){VetTypes(element)});
                myDiv.appendChild(label);
                console.log(element);
            });
            
            
            console.log(classes);
        })
    );
}

function VetTypes(className){
    //row 4
    //clearing the lower rows
    var row4 = document.getElementById("row4");
    var row5 = document.getElementById("row5");
    var row6 = document.getElementById("row6");
    wipeRow(row4);
    wipeRow(row5);
    wipeRow(row6);

    fetch(`https://derpipose.github.io/JsonFiles/Classes.json`)
        .then((result) => result.json() 
        .then((sheet) => {
            sheet.forEach(element => { if(element.ClassName==className){
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
