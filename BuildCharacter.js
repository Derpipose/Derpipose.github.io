window.onload = function (){
    initializeEventListeners();
    console.log("I initialized!");
}

function initializeEventListeners() {
    const campaignSelect = document.getElementById("Campaign");
    const radioButtons = document.getElementsByName("select");
    const racetypes = document.getElementById("RaceType");
    const raceinfo = document.getElementById("RaceSelect");
    
    campaignSelect.addEventListener("change", checkConditions);
    radioButtons.forEach(radio => {
        radio.addEventListener("change", checkConditions);
    });
    racetypes.addEventListener("change", RaceSpecific);
    raceinfo.addEventListener("change", raceInfo);

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
            if(playerStatus == "Vet"){
                sheet.forEach(element=> {if(RaceTypes.includes(element.SubType)){}else if(element.Campaign == Campaign){RaceTypes.push(element.SubType);}});
                console.log("Added Veteran Capable races");
            }else{
                sheet.forEach(element=> {if(element.Starter == "Yes"){if(RaceTypes.includes(element.SubType)){}else if(element.Campaign == Campaign){RaceTypes.push(element.SubType);}}});
                console.log("Added Newby Capable races");
            }
            

            console.log(RaceTypes);
            wipeDiv(myDiv);
            
            

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
    var myDiv = document.getElementById("RaceInfo");

    
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
            
                console.log("Got a description and special if it has it");
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
                let Description = document.createElement("p");
                Description.textContent = "Description: " + element.Description;
                myDiv.appendChild(Description);

                if(element.Classification == "Eastern"){
                    let Special = document.createElement("p");
                    Special.textContent = "Type: " + element.Special;
                    myDiv.appendChild(Special);
                }
            
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