window.onload = function (){
    initializeEventListeners();
}

function initializeEventListeners() {
    
    
    console.log("Event Listeners Ready to go!");
}

class Stats {
    constructor() {
        this.Str = 0;
        this.Dex = 0;
        this.Con = 0;
        this.Wis = 0;
        this.Int = 0;
        this.Cha = 0;
    }

    setStat(stat, value) {
        if (this.hasOwnProperty(stat)) {
            this[stat] = value;
        }
    }
}

class CharacterClass {
    constructor() {
        this.Classification = "";
        this.ClassName = "";
        this.HitDie = 0;
        this.ManaDie = 0;
        this.ProficiencyCount = 0;
        this.MagicBooks = 0;
        this.Cantrips = 0;
        this.Chances = 0;
        this.Description = "";
        this.Starter = "";
        this.SpellCastingModifier = "";
        this.StatFavor1 = "";
        this.StatFavor2 = "";
        this.ClassSpecific = "";
        this.LanguageCount = 0;
        this.ProficiencyStart = "";
        this.EasternClassType = "";
        this.VeteranTag = "";
    }
}

class Character {
    constructor(){

        this.name = "",
        this.level=0,
        this.class=new CharacterClass(),
        this.baseStats = new Stats();
        this.modStats = new Stats();
        this.overrideStats = new Stats();
    }


};