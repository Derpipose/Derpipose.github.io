window.onload = function (){
    initializeEventListeners();
}

function initializeEventListeners() {
    const campaignSelect = document.getElementById("Campaign");
    const radioButtons = document.getElementsByName("select");
    const racetypes = document.getElementById("RaceType");
    const raceinfo = document.getElementById("RaceSelect");
    const classinfo = document.getElementById("Class");
    const createbutton = document.getElementById("CreateCharacter");
    const str = document.getElementById("Str");
    const dex = document.getElementById("Dex");
    const con = document.getElementById("Con");
    const wis = document.getElementById("Wis");
    const int = document.getElementById("Int");
    const cha = document.getElementById("Cha");
    
    
    campaignSelect.addEventListener("change", checkConditions);
    radioButtons.forEach(radio => {
        radio.addEventListener("change", checkConditions);
    });
    racetypes.addEventListener("change", RaceSpecific);
    raceinfo.addEventListener("change", raceInfo);
    classinfo.addEventListener("change", classInfo);
    createbutton.addEventListener("click", checkBuildConditions);
    str.addEventListener("change", () => regulateStat("Str"));
    dex.addEventListener("change", () => regulateStat("Dex"));
    con.addEventListener("change", () => regulateStat("Con"));
    wis.addEventListener("change", () => regulateStat("Wis"));
    int.addEventListener("change", () => regulateStat("Int"));
    cha.addEventListener("change", () => regulateStat("Cha"));

    // Statcheck to ssee if they are at or above max, or below min either. 
    
    console.log("Event Listeners Ready to go!");
}

function checkConditions() {
    const campaignSelect = document.getElementById("Campaign");
    const selectedCampaign = campaignSelect.value;
    console.log(selectedCampaign);
    const isRadioSelected = document.querySelector('input[name="select"]:checked') !== null;
    console.log(isRadioSelected);
    if (selectedCampaign != "NOTCAMPAIGN" && isRadioSelected) {
        const selectedRadio = document.querySelector('input[name="select"]:checked');
        const playerStatus = selectedRadio.value;
        LoadRaces(selectedCampaign, playerStatus);
        LoadClasses(selectedCampaign, playerStatus);
        console.log("Conditions Met!");
    }
}

function LoadRaces(Campaign, playerStatus){
    
    fetch(`https://derpipose.github.io/JsonFiles/RacesExpounded.json`)
    .then((result) => result.json() 
        .then((sheet) => {
            const RaceTypes = [];
            var myDiv = document.getElementById("RaceType");
            var racediv = document.getElementById("RaceSelect");
            var raceinfodiv = document.getElementById("RaceInfo");
            var classinfodiv = document.getElementById("ClassInfo");
            
            if(playerStatus == "Vet"){
                sheet.forEach(element=> {if(RaceTypes.includes(element.SubType)){}else if(element.Campaign == Campaign){RaceTypes.push(element.SubType);}});
                console.log("Added Veteran Capable races");
            }else{
                sheet.forEach(element=> {if(element.Starter == "Yes"){if(RaceTypes.includes(element.SubType)){}else if(element.Campaign == Campaign){RaceTypes.push(element.SubType);}}});
                console.log("Added Newby Capable races");
            }
            

            console.log(RaceTypes);
            wipeDiv(myDiv);
            wipeDiv(racediv);
            clearDiv(raceinfodiv);
            clearDiv(classinfodiv);
            clearStatSpans();
            
            

            RaceTypes.forEach(element =>{
                let option = document.createElement("option");                
                option.textContent = element;
                myDiv.appendChild(option);

            });

            

        })
    );
}

function RaceSpecific(){
    const raceTypeChosen = document.getElementById("RaceType");
    const SubRace = raceTypeChosen.value;
    const campaignSelect = document.getElementById("Campaign");
    const Campaign = campaignSelect.value;
    const selectedRadio = document.querySelector('input[name="select"]:checked');
    const playerStatus = selectedRadio.value;
    
    var raceDiv = document.getElementById("RaceInfo");
    clearDiv(raceDiv);
        
    fetch(`https://derpipose.github.io/JsonFiles/RacesExpounded.json`)
    .then((result) => result.json() 
        .then((sheet) => {
            const Races = [];
            var myDiv = document.getElementById("RaceSelect");
            
            if(playerStatus == "Vet"){
                sheet.forEach(element=> {if(Races.includes(element.Name)){}else if(element.Campaign == Campaign && element.SubType == SubRace){Races.push(element.Name);}});
                console.log("Added " + SubRace + " races");
            }else{
                sheet.forEach(element=> {if(Races.includes(element.Name)){}else if(element.Campaign == Campaign && element.SubType == SubRace && element.Starter == "Yes"){Races.push(element.Name);}});
                console.log("Added " + SubRace + " races");
            }
            

            console.log(Races);
            wipeDiv(myDiv);
            clearStatSpans();
            

            Races.forEach(element =>{
                let option = document.createElement("option");                
                option.textContent = element;
                myDiv.appendChild(option);

            });

        })
    );
}

function raceInfo(){
    const raceChosen = document.getElementById("RaceSelect");
    const Race = raceChosen.value;
    const campaignChosen = document.getElementById("Campaign");
    const Campaign = campaignChosen.value;
    var AgeSpan = document.getElementById("age-range");
    var raceNameForAge = document.getElementById("chosenRace");
    var myDiv = document.getElementById("RaceInfo");
    var pick1div = document.getElementById("pick1-container");
    var pick2div = document.getElementById("pick2-container");
    var pick1 = "";
    var pick2 = "";
    

    
    fetch(`https://derpipose.github.io/JsonFiles/RacesExpounded.json`)
    .then((result) => result.json() 
        .then((sheet) => {
            sheet.forEach(element=> {if(element.Campaign == Campaign && element.Name == Race){
            
                clearDiv(myDiv);
                let Description = document.createElement("p");
                Description.textContent = "Description: " + element.Description;
                myDiv.appendChild(Description);

                if(element.Special != ""){
                    let Special = document.createElement("p");
                    Special.textContent = "Special: " + element.Special;
                    myDiv.appendChild(Special);
                }
                console.log("RaceInfo Clearing Statspan and radio");
                clearStatSpans();
                clearRadioButtons();
                
                var basestatchoices = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
                
                var statchoices = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
                basestatchoices.forEach(playerstat => {
                    if(element[playerstat] != 0){

                        statchoices = SetStat(playerstat, element[playerstat], statchoices);
                    }
                    

                });
                
                
                if(element.Pick == "Both" || element.Pick == "Race"){
                    pick1 = "Player can choose";
                    pick2 = "Player can choose";
                    statchoices.forEach(element => {
                        let label = document.createElement("label");
                        label.innerText = element;
                        label.htmlFor = "pick1-" + element;

                        let input = document.createElement("input");
                        input.type = "radio";
                        input.name = "pick1";
                        input.id = "pick1-" + element;
                        input.value = element;

                        input.addEventListener("click", updatePicks);
                        pick1div.appendChild(input);
                        pick1div.appendChild(label);

                    });
                    statchoices.forEach(element => {
                        let label = document.createElement("label");
                        label.innerText = element;
                        label.htmlFor = "pick2-" + element;
                        let input = document.createElement("input");
                        input.type = "radio";
                        input.name = "pick2";
                        input.id = "pick2-" + element;
                        input.value = element;
                        input.addEventListener("click",updatePicks);
                        pick2div.appendChild(input);
                        pick2div.appendChild(label);

                    });

                }else if(element.Pick == 1){
                    pick1 = "Player can choose";
                    statchoices.forEach(element => {
                        let label = document.createElement("label");
                        label.innerText = element;
                        label.htmlFor = "pick1-" + element;

                        let input = document.createElement("input");
                        input.type = "radio";
                        input.name = "pick1";
                        input.id = "pick1-" + element;
                        input.value = element;

                        input.addEventListener("click", updatePicks);
                        pick1div.appendChild(input);
                        pick1div.appendChild(label);
                    });

                }else if(element.Pick == 2){
                    pick1 = "Player can choose";
                    statchoices.forEach(element => {
                        let label = document.createElement("label");
                        label.innerText = element;
                        label.htmlFor = "pick2-" + element;
                        let input = document.createElement("input");
                        input.type = "radio";
                        input.name = "pick2";
                        input.id = "pick2-" + element;
                        input.value = element;
                        input.addEventListener("click",updatePicks);
                        pick2div.appendChild(input);
                        pick2div.appendChild(label);
                    });
                }

                let Picking1 = document.createElement("p");
                Picking1.textContent = "You get a +1 stat bonus to: " + pick1;
                myDiv.appendChild(Picking1);
                let Picking2 = document.createElement("p");
                Picking2.textContent = "You get a +2 stat bonus to: " + pick2;
                myDiv.appendChild(Picking2);
                
                AgeSpan.textContent = element.AdventuringAgeStart + " - " + element.AgeMax;
                raceNameForAge.textContent = element.Name;

            }});

        })
    );

}

function LoadClasses(Campaign, playerStatus){

    myDiv = document.getElementById("Class");
    
    fetch(`https://derpipose.github.io/JsonFiles/ClassesExpounded.json`)
    .then((result) => result.json() 
        .then((sheet) => {
            const ClassList = [];
            if(Campaign == "Oriental"){
                sheet.forEach(element=> {if(ClassList.includes(element.ClassName)){}else if(element.Classification == "Eastern"){
                    ClassList.push(element.ClassName);
                }});
            } else{
                sheet.forEach(element=> {if(ClassList.includes(element.ClassName)){}else if(element.Classification != "Eastern"){
                    if(playerStatus != "Vet" && element.Classification == "Veteran"){

                    }else{

                        ClassList.push(element.ClassName);
                    }
                }});
            }  


            wipeDiv(myDiv);

            ClassList.forEach(element =>{
                let option = document.createElement("option");                
                option.textContent = element;
                myDiv.appendChild(option);

            });
        
            console.log("Got the " + Campaign + "classes!");

        })
    );
}

function classInfo(){
    const classChosen = document.getElementById("Class");
    const className = classChosen.value;
    var myDiv = document.getElementById("ClassInfo");

    
    fetch(`https://derpipose.github.io/JsonFiles/ClassesExpounded.json`)
    .then((result) => result.json() 
        .then((sheet) => {
            sheet.forEach(element=> {if(element.ClassName == className){
                
                clearDiv(myDiv);

                if(element.Classification == "Eastern"){
                    let type = document.createElement("p");
                    type.textContent = "Type: " + element.EasternClassType;
                    myDiv.appendChild(type);
                }else if(element.Classification == "Veteran"){
                    let type = document.createElement("p");
                    type.textContent = "Type: " + element.VeteranTag;
                    myDiv.appendChild(type);
                }else{
                    let type = document.createElement("p");
                    type.textContent = "Type: " + element.Classification;
                    myDiv.appendChild(type);
                }

                let HitDie = document.createElement("p");
                HitDie.textContent = "Hit Die: 1D" + element.HitDie;
                myDiv.appendChild(HitDie);
                let ManaDie = document.createElement("p");
                ManaDie.textContent = "Mana Die: 1D" + element.ManaDie;
                myDiv.appendChild(ManaDie);

                let Description = document.createElement("p");
                Description.textContent = "Description: " + element.Description;
                myDiv.appendChild(Description);

                console.log("Got a description and special if it has it");
            }});

        })
    );
}

function wipeDiv(div){
    while (div.children.length > 1) {
        div.removeChild(div.lastChild);
    }
}

function clearDiv(div){
    while(div.children.length > 0){
        div.removeChild(div.lastChild);
    }
}

function clearStatSpans(){
    var str = document.getElementById("Str-add");
    var dex = document.getElementById("Dex-add");
    var con = document.getElementById("Con-add");
    var int = document.getElementById("Int-add");
    var wis = document.getElementById("Wis-add");
    var cha = document.getElementById("Cha-add");
    var age = document.getElementById("age-range");
    var race = document.getElementById("chosenRace");
    
    str.textContent = "";
    dex.textContent = "";
    con.textContent = "";
    int.textContent = "";
    wis.textContent = "";
    cha.textContent = "";
    age.textContent = "";
    race.textContent = "";
    console.log("StatSpan wiped");

    var Str = document.getElementById("Str");
    var Dex = document.getElementById("Dex");
    var Con = document.getElementById("Con");
    var Int = document.getElementById("Int");
    var Wis = document.getElementById("Wis");
    var Cha = document.getElementById("Cha");
    Str.max = 8;
    Dex.max = 8;
    Con.max = 8;
    Int.max = 8;
    Wis.max = 8;
    Cha.max = 8;
}

function clearRadioButtons(){
    
    var radio1 = document.getElementById("pick1-container");
    var radio2 = document.getElementById("pick2-container");
    wipeDiv(radio1);
    wipeDiv(radio2);
}

function updatePicks() {
    console.log("I have been picked!");
    clearStatSpans();

    let pick1 = document.querySelector('input[name="pick1"]:checked') ? document.querySelector('input[name="pick1"]:checked').value : null;
    let pick2 = document.querySelector('input[name="pick2"]:checked') ? document.querySelector('input[name="pick2"]:checked').value : null;

    // Enable all options first
    let pick1Options = document.querySelectorAll('#pick1-container input[type="radio"]');
    let pick2Options = document.querySelectorAll('#pick2-container input[type="radio"]');

    pick1Options.forEach(option => option.disabled = false);
    pick2Options.forEach(option => option.disabled = false);

    

    // Disable the selected option in the opposite set
    if (pick1) {
        let pick2Element = document.querySelector(`#pick2-${pick1}`);
        if (pick2Element) {
            pick2Element.disabled = true;
        }
    }
    if (pick2) {
        let pick1Element = document.querySelector(`#pick1-${pick2}`);
        if (pick1Element) {
            pick1Element.disabled = true;
        }
    }
    
    if(pick1 !== null){
        SetStatSpecific(pick1, 1);
    }
    if(pick2 !== null){
        SetStatSpecific(pick2, 2);
    }
    updateStatCalculations();
}

function checkBuildConditions(){
    // console.log("I have been pushed.");
    const campaign = document.getElementById("Campaign");
    const race = document.getElementById("RaceSelect");
    const playerclass = document.getElementById("Class");
    const str = document.getElementById("Str");
    const dex = document.getElementById("Dex");
    const con = document.getElementById("Con");
    const int = document.getElementById("Int");
    const wis = document.getElementById("Wis");
    const cha = document.getElementById("Cha");
    var stats = false;

    if(str.value == 0 || dex.value == 0 || con.value == 0 || int.value == 0 || wis.value == 0 || cha.value == 0){
        stats = false;
        console.log("There were blanks in the stats");
    }else {
        console.log("Stats look good cap!");
        stats = true;
    }

    if(campaign.value != "NOTCAMAPIGN" && race.value != "NOTRACETYPE" && playerclass.value != "NOTCLASS" && stats){
        console.log("Character ready to build captain!!!");
        BuildTheCharacter();
    }else{ 
        console.log("Something is missing. Will find out what later.");
    }
}

function SetStat(stat, num, statchoices){

    var StatInQuestion = document.getElementById(stat+"-add");
    var maxstat = document.getElementById(stat);
    if (num < 0){
        StatInQuestion.textContent = "- "+ Math.abs(num);
        maxstat.max = 8-num;
    }else{
        StatInQuestion.textContent = "+ " + num;
        maxstat.max = 8-num;
    }
    var index = statchoices.indexOf(stat);
    if (index !== -1) {
        statchoices.splice(index, 1);
    }
    return statchoices;
}

function SetStatSpecific(stat, num){
    // statchoices  = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
    var StatInQuestion = document.getElementById(stat+"-add");
    if (num < 0){
        StatInQuestion.textContent = "- "+ Math.abs(num);
    }else{
        StatInQuestion.textContent = "+ " + num;
    }
    // var index = statchoices.indexOf(stat);
    // if (index !== -1) {
    //     statchoices.splice(index, 1);
    // }
}

function updateStatCalculations(){
        const raceChosen = document.getElementById("RaceSelect");
        const Race = raceChosen.value;
        const campaignChosen = document.getElementById("Campaign");
        const Campaign = campaignChosen.value;
        var AgeSpan = document.getElementById("age-range");
        var raceNameForAge = document.getElementById("chosenRace");
        var pick1 = "";
        var pick2 = "";
        
        fetch(`https://derpipose.github.io/JsonFiles/RacesExpounded.json`)
        .then((result) => result.json() 
            .then((sheet) => {
                sheet.forEach(element=> {if(element.Campaign == Campaign && element.Name == Race){
                    var basestatchoices = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
                    
                    var statchoices = ["Str", "Dex", "Con", "Int", "Wis", "Cha"];
                    basestatchoices.forEach(playerstat => {
                        if(element[playerstat] != 0){
    
                            statchoices = SetStat(playerstat, element[playerstat], statchoices);
                        }
                    });
                    let Picking1 = document.createElement("p");
                    Picking1.textContent = "You get a +1 stat bonus to: " + pick1;
                    myDiv.appendChild(Picking1);
                    let Picking2 = document.createElement("p");
                    Picking2.textContent = "You get a +2 stat bonus to: " + pick2;
                    myDiv.appendChild(Picking2);
                    
                    AgeSpan.textContent = element.AdventuringAgeStart + " - " + element.AgeMax;
                    raceNameForAge.textContent = element.Name;
    
                }});
    
            })
        );
    
    
}

function regulateStat(Stat){
    
    var workingstat = document.getElementById(Stat);
    if(workingstat.value > workingstat.max){
        workingstat.value = workingstat.max;
        console.log("The number was too big. Sorry. Making you just a little nerfed there.");
    }else if(workingstat.value < workingstat.min){
        workingstat.value = 0;
        console.log("Chaotic stupid isn't an alignment.");
    }
}

function BuildTheCharacter(){

}