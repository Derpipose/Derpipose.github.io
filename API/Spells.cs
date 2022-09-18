
using System;
using System.Collections.Generic;
using Microsoft.VisualBasic.FileIO;

public class Spell
{

    public static string tester()
    {
        return "Hi There";
    }

        //spell branch name infoAboutSpells[0]
        //spell book name infoAboutSpells[1]
        //name infoAboutSpells[2]
        //mana cost infoAboutSpells[3];
        //range infoAboutSpells[4];
        //hit die infoAboutSpells[5];
        //damage type infoAboutSpells[6];
        //durration infoAboutSpells[7];
        //description infoAboutSpells[8];
    public string Branch{get; set;}
    public string Book{get;set;}
    public string Name{get; set;}
    public string ManaCost{get; set;}
    public string Range{get; set;}
    public string HitDie{get; set;}
    public string Damage{get; set;}
    public string Durration{get; set;}
    public string Description{get; set;}
    public Spell(string branch, string book, string name, string manacost, string range, string hitdie, string damage, string durration, string description)
    {
        Branch = branch;
        Book = book;
        Name = name;
        ManaCost = manacost;
        Range = range;
        HitDie = hitdie;
        Damage = damage;
        Durration = durration;
        Description = description;
    }

    public static List<Spell> GetBranch(string branch){
        List<Spell> listOfSpells = LoadInSpells();
        List<Spell> branchList = new List<Spell>();
        foreach( Spell spell in listOfSpells){
            if(spell.Branch == branch){
                branchList.Add(spell);
            }

        }
        return branchList;
    }

    public static List<Spell> GetBook(string branch, string book){
        List<Spell> listOfSpells = GetBranch(branch);
        List<Spell> bookList = new List<Spell>();
        foreach( Spell spell in listOfSpells){
            if(spell.Book == book){
                bookList.Add(spell);
            }

        }
        return bookList;

    }

    public static Spell GetSpellInformation(string branch, string book, string spellName){
        List<Spell> listOfSpells = GetBook(branch,book);
        Spell looking = new Spell("holder", "holder", "holder", "holder", "holder", "holder", "holder", "holder", "holder");
        foreach( Spell spell in listOfSpells){
            if(spell.Name == spellName){
                looking = spell;
                break;
            }
        }
        return looking;
    }

    // public static List<Spell> GetCampaignList(){
    //     List<string> campaignList = new List<string>();
    //     List<Spell> listOfSpells = LoadInSpells();
    //     foreach(Spell race in listOfSpells){
    //         if(campaignList.Contains(race.Campaign) != true){
    //             campaignList.Add(race.Campaign);
    //         }
    //     }
    //     List<Spell> ListOfCampaigns = new List<Spell>();
    //     foreach(string addcampaign in campaignList){
    //         Spell campaignadder = new Spell(addcampaign, "-", "-", "-");
    //         ListOfCampaigns.Add(campaignadder);
    //     }
    //     return ListOfCampaigns;
    // }




    public static List<Spell> LoadInSpells(){

        List<Spell> listOfSpells = new List<Spell>();

        try
        {
            var path = @"C:\Users\thefl\OneDrive\Documents\WEBDEV\ApiCreator\SpellsSheet.csv";
            using (TextFieldParser csvReader = new TextFieldParser(path))
            {
                //Telling the program when to read a comment and when to break the line from the file.
                csvReader.CommentTokens = new string[] { "#" };
                csvReader.SetDelimiters(new string[] { "," });
                csvReader.HasFieldsEnclosedInQuotes = true;

                //Setting both the book and branch to null in prep to receive races and books.
                // Campaign myBranch = null;
                // Subtype myBook = null;

                //a loop to repeat until the file has no more data to read.
                while (!csvReader.EndOfData)
                {
                    string[] fields = csvReader.ReadFields();

                    //spell branch name infoAboutSpells[0]
                    //spell book name infoAboutSpells[1]
                    //name infoAboutSpells[2]
                    //mana cost infoAboutSpells[3];
                    //range infoAboutSpells[4];
                    //hit die infoAboutSpells[5];
                    //damage type infoAboutSpells[6];
                    //durration infoAboutSpells[7];
                    //description infoAboutSpells[8];

                    Spell thisSpell = new Spell(fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6], fields[7], fields[8]);
                    listOfSpells.Add(thisSpell);

                }

            }

        }


        catch (System.IO.FileNotFoundException)
        {
            //displaying text that we want the system to display if it can't find the file.
            // Console.log("Sorry but this file can't be found.");
            // Console.log("Please ensure that the file 'Spells - Sheet1.csv' is located in 'MainInfo'.");
        return new List<Spell>{new Spell("scifi", "houndish", "Protogen", "BarkBarkBark","scifi", "houndish", "Protogen", "BarkBarkBark","derpderp")};
        }
        // return new List<Spell>{new Spell("scifi", "houndish", "Protogen", "BarkBarkBark")};

        return listOfSpells;
    }
    
}

