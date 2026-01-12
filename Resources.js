window.onload = function (){
    document.getElementById("races").addEventListener("click", function(){Races()});
    document.getElementById("spells").addEventListener("click", function(){Spells()});
    document.getElementById("classes").addEventListener("click", function(){Classes()});
    document.getElementById("weapons").addEventListener("click", function(){Weapons()});
    document.getElementById("feats").addEventListener("click", function(){featExplorer.loadCategories()});
    document.getElementById("veterans").addEventListener("click", function(){Vet()});

}


// Races
//Races - Refactored Version
class RaceExplorer {
    constructor(isVeteran = false) {
        this.isVeteran = isVeteran;
        this.config = {
            apiUrl: 'https://derpipose.github.io/JsonFiles/Races.json',
            rows: ['row1', 'row2', 'row3', 'row4', 'row5', 'row6']
        };
        this.cachedData = null;
    }

    async fetchRaceData() {
        if (this.cachedData) return this.cachedData;
        
        try {
            const response = await fetch(this.config.apiUrl);
            this.cachedData = await response.json();
            return this.cachedData;
        } catch (error) {
            console.error('Error fetching race data:', error);
            throw error;
        }
    }

    clearRowsFrom(startRowIndex) {
        for (let i = startRowIndex; i < this.config.rows.length; i++) {
            const row = document.getElementById(this.config.rows[i]);
            if (row) wipeRow(row);
        }
    }

    getFilteredData(data) {
        const starterValue = this.isVeteran ? "No" : "Yes";
        return data.filter(element => element.Starter === starterValue);
    }

    getUniqueValues(data, field, filters = {}) {
        const values = [];
        const filteredData = this.getFilteredData(data);
        
        filteredData.forEach(element => {
            const value = element[field];
            if (!values.includes(value)) {
                const matchesFilters = Object.entries(filters).every(
                    ([key, filterValue]) => element[key] === filterValue
                );
                if (matchesFilters) {
                    values.push(value);
                }
            }
        });
        return values;
    }

    createRadioOption(text, id, name, clickHandler, targetRowId) {
        const targetDiv = document.getElementById(targetRowId);
        
        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.id = id;
        
        const label = document.createElement("label");
        label.innerText = text;
        label.htmlFor = id;
        label.addEventListener("click", clickHandler);
        
        targetDiv.appendChild(input);
        targetDiv.appendChild(label);
    }

    displayRaceInformation(race) {
        const targetRowIndex = this.isVeteran ? 5 : 4; // row6 for veteran, row5 for starter
        const targetDiv = document.getElementById(this.config.rows[targetRowIndex]);
        
        // Add Pinterest inspiration board link if available (starter races only)
        if (!this.isVeteran && race.Pinterest_Inspo_Board && race.Pinterest_Inspo_Board !== "") {
            const a = document.createElement("a");
            a.href = race.Pinterest_Inspo_Board;
            a.innerText = "Pinterest Inspiration Board Link";
            a.className = "Row5-a-tag";
            targetDiv.appendChild(a);
        }
        
        // Add description
        const p = document.createElement("p");
        if (race.Description && race.Description !== "") {
            p.innerHTML = race.Description;
        } else {
            p.innerHTML = "Race not yet worked on fully..... Please check back later. Thanks pal!";
        }
        targetDiv.appendChild(p);
        
        console.log(race);
    }

    async loadCampaigns() {
        const startClearIndex = this.isVeteran ? 2 : 1; // Clear from row3 for veteran, row2 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchRaceData();
            const campaigns = this.getUniqueValues(data, 'Campaign');
            
            const targetRowIndex = this.isVeteran ? 2 : 1; // row3 for veteran, row2 for starter
            const namePrefix = "row1";
            
            campaigns.forEach(campaign => {
                this.createRadioOption(
                    campaign,
                    campaign,
                    namePrefix,
                    () => this.loadSubraces(campaign),
                    this.config.rows[targetRowIndex]
                );
            });
            
            console.log('Campaigns:', campaigns);
        } catch (error) {
            console.error('Error loading campaigns:', error);
        }
    }

    async loadSubraces(campaign) {
        const startClearIndex = this.isVeteran ? 3 : 2; // Clear from row4 for veteran, row3 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchRaceData();
            const subtypes = this.getUniqueValues(data, 'SubType', { 'Campaign': campaign });
            
            const targetRowIndex = this.isVeteran ? 3 : 2; // row4 for veteran, row3 for starter
            const namePrefix = "row2";
            
            subtypes.forEach(subtype => {
                this.createRadioOption(
                    subtype,
                    subtype,
                    namePrefix,
                    () => this.loadRaceNames(campaign, subtype),
                    this.config.rows[targetRowIndex]
                );
            });
            
            console.log('Subtypes:', subtypes);
        } catch (error) {
            console.error('Error loading subtypes:', error);
        }
    }

    async loadRaceNames(campaign, subtype) {
        const startClearIndex = this.isVeteran ? 4 : 3; // Clear from row5 for veteran, row4 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchRaceData();
            const raceNames = this.getUniqueValues(data, 'Name', { 
                'Campaign': campaign, 
                'SubType': subtype 
            });
            
            const targetRowIndex = this.isVeteran ? 4 : 3; // row5 for veteran, row4 for starter
            const namePrefix = "row3";
            
            raceNames.forEach(raceName => {
                const id = this.isVeteran ? 
                    raceName : 
                    `${raceName}_row3`;
                
                this.createRadioOption(
                    raceName,
                    id,
                    namePrefix,
                    () => this.loadRaceInformation(campaign, subtype, raceName),
                    this.config.rows[targetRowIndex]
                );
            });
            
            console.log('Race Names:', raceNames);
        } catch (error) {
            console.error('Error loading race names:', error);
        }
    }

    async loadRaceInformation(campaign, subtype, raceName) {
        const startClearIndex = this.isVeteran ? 5 : 4; // Clear from row6 for veteran, row5 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchRaceData();
            const filteredData = this.getFilteredData(data);
            
            const race = filteredData.find(element => 
                element.Campaign === campaign && 
                element.SubType === subtype && 
                element.Name === raceName
            );
            
            if (race) {
                this.displayRaceInformation(race);
            }
        } catch (error) {
            console.error('Error loading race information:', error);
        }
    }
}

// Create global instances
const raceExplorer = new RaceExplorer(false); // Starter races
const vetRaceExplorer = new RaceExplorer(true); // Veteran races

// Legacy function wrappers for backward compatibility
function Races() {
    raceExplorer.loadCampaigns();
}

function Campaigns(campaign) {
    raceExplorer.loadSubraces(campaign);
}

function Subraces(campaign, subrace) {
    raceExplorer.loadRaceNames(campaign, subrace);
}

function RaceInformation(campaign, subrace, name) {
    raceExplorer.loadRaceInformation(campaign, subrace, name);
}

function VetRaces() {
    vetRaceExplorer.loadCampaigns();
}

function VetCampaigns(campaign) {
    vetRaceExplorer.loadSubraces(campaign);
}

function VetSubraces(campaign, subrace) {
    vetRaceExplorer.loadRaceNames(campaign, subrace);
}

function VetRaceInformation(campaign, subrace, name) {
    vetRaceExplorer.loadRaceInformation(campaign, subrace, name);
}



//spells
//Spells - Refactored Version
class SpellExplorer {
    constructor(isVeteran = false) {
        this.isVeteran = isVeteran;
        this.config = {
            apiUrl: 'https://derpipose.github.io/JsonFiles/Spells.json',
            rows: ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'],
            displayFields: [
                { key: 'SpellName', label: 'Name' },
                { key: 'ManaCost', label: 'Mana Cost' },
                { key: 'Range', label: 'Range' },
                { key: 'HitDie', label: 'Hit Die' },
                { key: 'DamageType', label: 'Type' },
                { key: 'Duration', label: 'Duration' },
                { key: 'Description', label: 'Description' }
            ]
        };
        this.cachedData = null;
    }

    async fetchSpellData() {
        if (this.cachedData) return this.cachedData;
        
        try {
            const response = await fetch(this.config.apiUrl);
            this.cachedData = await response.json();
            return this.cachedData;
        } catch (error) {
            console.error('Error fetching spell data:', error);
            throw error;
        }
    }

    clearRowsFrom(startRowIndex) {
        for (let i = startRowIndex; i < this.config.rows.length; i++) {
            const row = document.getElementById(this.config.rows[i]);
            if (row) wipeRow(row);
        }
    }

    getFilteredData(data) {
        const starterValue = this.isVeteran ? "No" : "Yes";
        return data.filter(element => element.Starter === starterValue);
    }

    getUniqueValues(data, field, filters = {}) {
        const values = [];
        const filteredData = this.getFilteredData(data);
        
        filteredData.forEach(element => {
            const value = element[field];
            if (!values.includes(value)) {
                const matchesFilters = Object.entries(filters).every(
                    ([key, filterValue]) => element[key] === filterValue
                );
                if (matchesFilters) {
                    values.push(value);
                }
            }
        });
        return values;
    }

    createRadioOption(text, id, name, clickHandler, targetRowId) {
        const targetDiv = document.getElementById(targetRowId);
        
        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.id = id;
        
        const label = document.createElement("label");
        label.innerText = text;
        label.htmlFor = id;
        label.addEventListener("click", clickHandler);
        
        targetDiv.appendChild(input);
        targetDiv.appendChild(label);
    }

    displaySpellInfo(spell) {
        const targetRowIndex = this.isVeteran ? 5 : 4; // row6 for veteran, row5 for starter
        const targetDiv = document.getElementById(this.config.rows[targetRowIndex]);
        
        this.config.displayFields.forEach(field => {
            const p = document.createElement("p");
            p.innerHTML = `${field.label}: ${spell[field.key]}`;
            targetDiv.appendChild(p);
        });
        
        console.log(spell);
    }

    async loadBranches() {
        const startClearIndex = this.isVeteran ? 2 : 1; // Clear from row3 for veteran, row2 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchSpellData();
            const branches = this.getUniqueValues(data, 'SpellBranch');
            
            const targetRowIndex = this.isVeteran ? 2 : 1; // row3 for veteran, row2 for starter
            const namePrefix = this.isVeteran ? "row2" : "row1";
            
            branches.forEach(branch => {
                this.createRadioOption(
                    branch,
                    branch,
                    namePrefix,
                    () => this.loadBooks(branch),
                    this.config.rows[targetRowIndex]
                );
            });
            
            console.log('Branches:', branches);
        } catch (error) {
            console.error('Error loading branches:', error);
        }
    }

    async loadBooks(branch) {
        const startClearIndex = this.isVeteran ? 3 : 2; // Clear from row4 for veteran, row3 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchSpellData();
            const filteredData = this.getFilteredData(data);
            
            // For starter spells, we need the full element for BookLevel info
            const booksData = [];
            filteredData.forEach(element => {
                if (element.SpellBranch === branch) {
                    const existingBook = booksData.find(book => book.SpellBook === element.SpellBook);
                    if (!existingBook) {
                        booksData.push(element);
                    }
                }
            });
            
            const targetRowIndex = this.isVeteran ? 3 : 2; // row4 for veteran, row3 for starter
            const namePrefix = this.isVeteran ? "row3" : "row2";
            
            booksData.forEach(element => {
                const displayText = `${element.SpellBook} : ${element.BookLevel}`;
                
                const id = this.isVeteran ? 
                    `${element.SpellBook}_row3` : 
                    `${element.SpellBook}_row2`;
                
                this.createRadioOption(
                    displayText,
                    id,
                    namePrefix,
                    () => this.loadSpellNames(branch, element.SpellBook),
                    this.config.rows[targetRowIndex]
                );
            });
            
            console.log('Books:', booksData.map(b => b.SpellBook));
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }

    async loadSpellNames(branch, book) {
        const startClearIndex = this.isVeteran ? 4 : 3; // Clear from row5 for veteran, row4 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchSpellData();
            const spellNames = this.getUniqueValues(data, 'SpellName', { 
                'SpellBranch': branch, 
                'SpellBook': book 
            });
            
            const targetRowIndex = this.isVeteran ? 4 : 3; // row5 for veteran, row4 for starter
            const namePrefix = this.isVeteran ? "row4" : "row3";
            
            spellNames.forEach(spellName => {
                const id = this.isVeteran ? 
                    `${spellName}_row4` : 
                    `${spellName}_row3`;
                
                this.createRadioOption(
                    spellName,
                    id,
                    namePrefix,
                    () => this.loadSpellInfo(branch, book, spellName),
                    this.config.rows[targetRowIndex]
                );
            });
            
            console.log('Spell Names:', spellNames);
        } catch (error) {
            console.error('Error loading spell names:', error);
        }
    }

    async loadSpellInfo(branch, book, spellName) {
        const startClearIndex = this.isVeteran ? 5 : 4; // Clear from row6 for veteran, row5 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchSpellData();
            const filteredData = this.getFilteredData(data);
            
            const spell = filteredData.find(element => 
                element.SpellBranch === branch && 
                element.SpellBook === book && 
                element.SpellName === spellName
            );
            
            if (spell) {
                this.displaySpellInfo(spell);
            }
        } catch (error) {
            console.error('Error loading spell info:', error);
        }
    }
}

// Create global instances
const spellExplorer = new SpellExplorer(false); // Starter spells
const vetSpellExplorer = new SpellExplorer(true); // Veteran spells

// Legacy function wrappers for backward compatibility
function Spells() {
    spellExplorer.loadBranches();
}

function Branches(branch) {
    spellExplorer.loadBooks(branch);
}

function Books(branch, book) {
    spellExplorer.loadSpellNames(branch, book);
}

function SpellInfo(branch, book, spell) {
    spellExplorer.loadSpellInfo(branch, book, spell);
}

function VetSpells() {
    vetSpellExplorer.loadBranches();
}

function VetBranches(branch) {
    vetSpellExplorer.loadBooks(branch);
}

function VetBooks(branch, book) {
    vetSpellExplorer.loadSpellNames(branch, book);
}

function VetSpellInfo(branch, book, spell) {
    vetSpellExplorer.loadSpellInfo(branch, book, spell);
}


//Classes

//Classes - Refactored Version
class ClassExplorer {
    constructor(isVeteran = false) {
        this.isVeteran = isVeteran;
        this.config = {
            apiUrl: 'https://derpipose.github.io/JsonFiles/Classes.json',
            rows: ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'],
            displayFields: [
                { key: 'ClassName', label: 'Name' },
                { key: 'ManaDie', label: 'Mana Die', prefix: 'D' },
                { key: 'HitDie', label: 'Hit Die', prefix: 'D' },
                { key: 'MagicBooks', label: 'Magic Books' },
                { key: 'Cantrips', label: 'Cantrips' },
                { key: 'Chances', label: 'Chances' },
                { key: 'ProficiencyCount', label: 'Skills' },
                { key: 'Description', label: 'Description' }
            ]
        };
        this.cachedData = null;
    }

    async fetchClassData() {
        if (this.cachedData) return this.cachedData;
        
        try {
            const response = await fetch(this.config.apiUrl);
            this.cachedData = await response.json();
            return this.cachedData;
        } catch (error) {
            console.error('Error fetching class data:', error);
            throw error;
        }
    }

    clearRowsFrom(startRowIndex) {
        for (let i = startRowIndex; i < this.config.rows.length; i++) {
            const row = document.getElementById(this.config.rows[i]);
            if (row) wipeRow(row);
        }
    }

    getFilteredData(data) {
        const starterValue = this.isVeteran ? "No" : "Yes";
        return data.filter(element => element.Starter === starterValue);
    }

    getUniqueValues(data, field, filters = {}) {
        const values = [];
        const filteredData = this.getFilteredData(data);
        
        filteredData.forEach(element => {
            const value = element[field];
            if (!values.includes(value)) {
                const matchesFilters = Object.entries(filters).every(
                    ([key, filterValue]) => element[key] === filterValue
                );
                if (matchesFilters) {
                    values.push(value);
                }
            }
        });
        return values;
    }

    createRadioOption(text, id, name, clickHandler, targetRowId) {
        const targetDiv = document.getElementById(targetRowId);
        
        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.id = id;
        
        const label = document.createElement("label");
        label.innerText = text;
        label.htmlFor = id;
        label.addEventListener("click", clickHandler);
        
        targetDiv.appendChild(input);
        targetDiv.appendChild(label);
    }

    displayClassInformation(classData) {
        const targetRowIndex = this.isVeteran ? 3 : 3; // row4 for both types
        const targetDiv = document.getElementById(this.config.rows[targetRowIndex]);
        
        this.config.displayFields.forEach(field => {
            const p = document.createElement("p");
            const value = classData[field.key];
            const prefix = field.prefix || '';
            p.innerHTML = `${field.label}: ${prefix}${value}`;
            targetDiv.appendChild(p);
        });
        
        console.log(classData);
    }

    async loadClassifications() {
        const startClearIndex = this.isVeteran ? 2 : 1; // Clear from row3 for veteran, row2 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchClassData();
            const classifications = this.getUniqueValues(data, 'Classification');
            
            const targetRowIndex = this.isVeteran ? 2 : 1; // row3 for veteran, row2 for starter
            const namePrefix = "row2";
            
            classifications.forEach(classification => {
                this.createRadioOption(
                    classification,
                    classification,
                    namePrefix,
                    () => this.loadClassNames(classification),
                    this.config.rows[targetRowIndex]
                );
            });
            
            console.log('Classifications:', classifications);
        } catch (error) {
            console.error('Error loading classifications:', error);
        }
    }

    async loadClassNames(classification = null) {
        const startClearIndex = this.isVeteran ? 3 : 2; // Clear from row4 for veteran, row3 for starter
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchClassData();
            let classNames;
            
            if (this.isVeteran) {
                // For veteran classes, load all class names directly (no classification filter)
                classNames = this.getUniqueValues(data, 'ClassName');
            } else {
                // For starter classes, filter by classification
                classNames = this.getUniqueValues(data, 'ClassName', { 'Classification': classification });
            }
            
            const targetRowIndex = this.isVeteran ? 2 : 2; // row3 for both types
            const namePrefix = "row3";
            
            classNames.forEach(className => {
                this.createRadioOption(
                    className,
                    className,
                    namePrefix,
                    () => this.loadClassInformation(classification, className),
                    this.config.rows[targetRowIndex]
                );
            });
            
            console.log('Class Names:', classNames);
        } catch (error) {
            console.error('Error loading class names:', error);
        }
    }

    async loadClassInformation(classification, className) {
        const startClearIndex = 3; // Clear from row4 for both types
        this.clearRowsFrom(startClearIndex);
        
        try {
            const data = await this.fetchClassData();
            const filteredData = this.getFilteredData(data);
            
            let classData;
            if (this.isVeteran) {
                // For veteran classes, just match by className
                classData = filteredData.find(element => element.ClassName === className);
            } else {
                // For starter classes, match by both classification and className
                classData = filteredData.find(element => 
                    element.Classification === classification && 
                    element.ClassName === className
                );
            }
            
            if (classData) {
                this.displayClassInformation(classData);
            }
        } catch (error) {
            console.error('Error loading class information:', error);
        }
    }
}

// Create global instances
const classExplorer = new ClassExplorer(false); // Starter classes
const vetClassExplorer = new ClassExplorer(true); // Veteran classes

// Legacy function wrappers for backward compatibility
function Classes() {
    classExplorer.loadClassifications();
}

function Types(type) {
    classExplorer.loadClassNames(type);
}

function ClassInformation(type, className) {
    classExplorer.loadClassInformation(type, className);
}

function VetClasses() {
    vetClassExplorer.loadClassNames(); // No classification needed for veteran
}

function VetTypes(className) {
    vetClassExplorer.loadClassInformation(null, className);
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
    myDiv.appendChild(classes);  
    
}

// Races

//spells

//Classes

//Weapons - Refactored Version
class WeaponExplorer {
    constructor() {
        this.config = {
            apiUrl: 'https://derpipose.github.io/JsonFiles/Weapons.json',
            rows: ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'],
            displayFields: [
                { key: 'Name', label: 'Name' },
                { key: 'Crit', label: 'Crit' },
                { key: 'Crit_Range', label: 'Crit Range' },
                { key: 'Range', label: 'Range' },
                { key: 'Damage', label: 'Damage' },
                { key: 'Damage_Type', label: 'Damage Type' },
                { key: 'Attack_Stat', label: 'Attack Stat' }
            ]
        };
        this.cachedData = null;
    }

    async fetchWeaponData() {
        if (this.cachedData) return this.cachedData;
        
        try {
            const response = await fetch(this.config.apiUrl);
            this.cachedData = await response.json();
            return this.cachedData;
        } catch (error) {
            console.error('Error fetching weapon data:', error);
            throw error;
        }
    }

    clearRowsFrom(startRowIndex) {
        for (let i = startRowIndex; i < this.config.rows.length; i++) {
            const row = document.getElementById(this.config.rows[i]);
            if (row) wipeRow(row);
        }
    }

    getUniqueValues(data, field, filters = {}) {
        const values = [];
        data.forEach(element => {
            const value = element[field];
            if (!values.includes(value)) {
                const matchesFilters = Object.entries(filters).every(
                    ([key, filterValue]) => element[key] === filterValue
                );
                if (matchesFilters) {
                    values.push(value);
                }
            }
        });
        return values;
    }

    createRadioOption(text, id, name, clickHandler, targetRowId) {
        const targetDiv = document.getElementById(targetRowId);
        
        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.id = id;
        
        const label = document.createElement("label");
        label.innerText = text;
        label.htmlFor = id;
        label.addEventListener("click", clickHandler);
        
        targetDiv.appendChild(input);
        targetDiv.appendChild(label);
    }

    displayWeaponInfo(weapon) {
        const targetDiv = document.getElementById(this.config.rows[4]); // row5
        
        this.config.displayFields.forEach(field => {
            const p = document.createElement("p");
            p.innerHTML = `${field.label}: ${weapon[field.key]}`;
            targetDiv.appendChild(p);
        });
        
        console.log(weapon);
    }

    async loadClassifications() {
        this.clearRowsFrom(1); // Clear rows 2-6
        
        try {
            const data = await this.fetchWeaponData();
            const classifications = this.getUniqueValues(data, 'Weapon_Classification');
            
            classifications.forEach(classification => {
                this.createRadioOption(
                    classification,
                    classification,
                    "row1",
                    () => this.loadSizes(classification),
                    this.config.rows[1] // row2
                );
            });
            
            console.log('Classifications:', classifications);
        } catch (error) {
            console.error('Error loading classifications:', error);
        }
    }

    async loadSizes(classification) {
        this.clearRowsFrom(2); // Clear rows 3-6
        
        try {
            const data = await this.fetchWeaponData();
            const sizes = this.getUniqueValues(data, 'Size', { 'Weapon_Classification': classification });
            
            sizes.forEach(size => {
                this.createRadioOption(
                    size,
                    `${size}_row2`,
                    "row2",
                    () => this.loadNames(classification, size),
                    this.config.rows[2] // row3
                );
            });
            
            console.log('Sizes:', sizes);
        } catch (error) {
            console.error('Error loading sizes:', error);
        }
    }

    async loadNames(classification, size) {
        this.clearRowsFrom(3); // Clear rows 4-6
        
        try {
            const data = await this.fetchWeaponData();
            const names = this.getUniqueValues(data, 'Name', { 
                'Weapon_Classification': classification, 
                'Size': size 
            });
            
            names.forEach(name => {
                this.createRadioOption(
                    name,
                    `${name}_row3`,
                    "row3",
                    () => this.loadWeaponInfo(classification, size, name),
                    this.config.rows[3] // row4
                );
            });
            
            console.log('Names:', names);
        } catch (error) {
            console.error('Error loading names:', error);
        }
    }

    async loadWeaponInfo(classification, size, name) {
        this.clearRowsFrom(4); // Clear rows 5-6
        
        try {
            const data = await this.fetchWeaponData();
            const weapon = data.find(element => 
                element.Weapon_Classification === classification && 
                element.Size === size && 
                element.Name === name
            );
            
            if (weapon) {
                this.displayWeaponInfo(weapon);
            }
        } catch (error) {
            console.error('Error loading weapon info:', error);
        }
    }
}

// Create global instance
const weaponExplorer = new WeaponExplorer();

// Legacy function wrappers for backward compatibility
function Weapons() {
    weaponExplorer.loadClassifications();
}

function WeaponSizes(classification) {
    weaponExplorer.loadSizes(classification);
}

function WeaponNames(classification, size) {
    weaponExplorer.loadNames(classification, size);
}

function WeaponInfo(classification, size, name) {
    weaponExplorer.loadWeaponInfo(classification, size, name);
}


//Feats - Refactored Version
class FeatExplorer {
    constructor() {
        this.config = {
            apiUrl: 'https://derpipose.github.io/JsonFiles/Feats.json',
            rows: ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'],
            displayFields: [
                { key: 'Feat', label: 'Feat' },
                { key: 'Description', label: 'Description' },
                { key: 'Skill', label: 'Skill' },
                { key: 'Health', label: 'Health' },
                { key: 'Mana', label: 'Mana' },
                { key: 'Statchange', label: 'Stat Change' },
                { key: 'Stat', label: 'Stat' },
                { key: 'Spellbook', label: 'Spellbook' },
                { key: 'Downside', label: 'Downside' },
                { key: 'Item', label: 'Item' },
                { key: 'Checks', label: 'Checks' }
            ]
        };
        this.cachedData = null;
    }

    async fetchFeatData() {
        if (this.cachedData) return this.cachedData;
        
        try {
            const response = await fetch(this.config.apiUrl);
            this.cachedData = await response.json();
            return this.cachedData;
        } catch (error) {
            console.error('Error fetching feat data:', error);
            throw error;
        }
    }

    clearRowsFrom(startRowIndex) {
        for (let i = startRowIndex; i < this.config.rows.length; i++) {
            const row = document.getElementById(this.config.rows[i]);
            if (row) wipeRow(row);
        }
    }

    getUniqueValues(data, field, filters = {}) {
        const values = [];
        data.forEach(element => {
            const value = element[field];
            if (!values.includes(value) && value) {
                const matchesFilters = Object.entries(filters).every(
                    ([key, filterValue]) => element[key] === filterValue
                );
                if (matchesFilters) {
                    values.push(value);
                }
            }
        });
        return values;
    }

    createRadioOption(text, id, name, clickHandler, targetRowId) {
        const targetDiv = document.getElementById(targetRowId);
        
        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.id = id;
        
        const label = document.createElement("label");
        label.innerText = text;
        label.htmlFor = id;
        label.addEventListener("click", clickHandler);
        
        targetDiv.appendChild(input);
        targetDiv.appendChild(label);
    }

    displayFeatInfo(feat) {
        const targetDiv = document.getElementById(this.config.rows[3]); // row4
        
        this.config.displayFields.forEach(field => {
            const value = feat[field.key];
            if (value && value !== "") {
                const p = document.createElement("p");
                p.innerHTML = `${field.label}: ${value}`;
                targetDiv.appendChild(p);
            }
        });
        
        console.log(feat);
    }

    async loadCategories() {
        this.clearRowsFrom(1); // Clear rows 2-6
        
        try {
            const data = await this.fetchFeatData();
            const categories = this.getUniqueValues(data, 'Category');
            
            categories.forEach(category => {
                this.createRadioOption(
                    category,
                    category,
                    "row1",
                    () => this.loadFeats(category),
                    this.config.rows[1] // row2
                );
            });
            
            console.log('Categories:', categories);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    async loadFeats(category) {
        this.clearRowsFrom(2); // Clear rows 3-6
        
        try {
            const data = await this.fetchFeatData();
            const feats = this.getUniqueValues(data, 'Feat', { 'Category': category });
            
            feats.forEach(feat => {
                this.createRadioOption(
                    feat,
                    `${feat}_row2`,
                    "row2",
                    () => this.loadFeatInfo(category, feat),
                    this.config.rows[2] // row3
                );
            });
            
            console.log('Feats:', feats);
        } catch (error) {
            console.error('Error loading feats:', error);
        }
    }

    async loadFeatInfo(category, featName) {
        this.clearRowsFrom(3); // Clear rows 4-6
        
        try {
            const data = await this.fetchFeatData();
            const feat = data.find(element => 
                element.Category === category && 
                element.Feat === featName
            );
            
            if (feat) {
                this.displayFeatInfo(feat);
            }
        } catch (error) {
            console.error('Error loading feat info:', error);
        }
    }
}

// Create global instance
const featExplorer = new FeatExplorer();


function wipeRow(row){
    while(row.firstChild){
        row.removeChild(row.lastChild);
    }
}
