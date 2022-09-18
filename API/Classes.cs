
using System;
using System.Collections.Generic;
using Microsoft.VisualBasic.FileIO;

public class Classes
{

    public static string tester()
    {
        return "Hi There";
    }


    public string SubClass{get;set;}
    public string Name{get; set;}
    public string HitDie{get; set;}
    public string ManaDie{get; set;}
    public string ProficiencyCount{get; set;}
    public string MagicBooks{get;set;}
    public string Cantrips{get; set;}
    public string Chances{get; set;}
    public string Description{get; set;}
    public Classes(string subclass, string name, string hitdie, string manadie,  string profcount, string magicbooks, string cantrips, string chances, string description)
    {
        SubClass=subclass;
        Name = name;
        HitDie = hitdie;
        ManaDie = manadie;
        ProficiencyCount = profcount;
        MagicBooks = magicbooks;
        Cantrips = cantrips;
        Chances = chances;
        Description = description;
    }

    public static List<Classes> GetType(string type){
        List<Classes> listOfClasses = LoadInClasses();
        List<Classes> typeList = new List<Classes>();
        foreach( Classes classes in listOfClasses){
            if(classes.SubClass == type){
                typeList.Add(classes);
            }

        }
        return typeList;
    }

    public static Classes GetClassInformation(string type, string name){
        List<Classes> listOfSubclasses = GetType(type);
        Classes looking = new Classes("holder", "holder", "holder", "holder", "holder", "holder", "holder", "holder", "holder");
        foreach( Classes classes in listOfSubclasses){
            if(classes.Name == name){
                looking = classes;
                break;
            }
        }
        return looking;

    }

    // public static Classes GetClassInformation(string campaign, string faction, string classesName){
    //     List<Classes> listOfSubclasses = GetSubclasses(campaign,faction);
    //     Classes looking = new Classes("holder", "holder", "holder", "holder", "holder", "holder", "holder", "holder");
    //     foreach( Classes classes in listOfSubclasses){
    //         if(classes.Name == classesName){
    //             looking = classes;
    //             break;
    //         }
    //     }
    //     return looking;
    // }

    // public static List<Classes> GetCampaignList(){
    //     List<string> campaignList = new List<string>();
    //     List<Classes> listOfClasses = LoadInClasses();
    //     foreach(Classes classes in listOfClasses){
    //         if(campaignList.Contains(classes.Campaign) != true){
    //             campaignList.Add(classes.Campaign);
    //         }
    //     }
    //     List<Classes> ListOfCampaigns = new List<Classes>();
    //     foreach(string addcampaign in campaignList){
    //         Classes campaignadder = new Classes(addcampaign, "-", "-", "-");
    //         ListOfCampaigns.Add(campaignadder);
    //     }
    //     return ListOfCampaigns;
    // }




    public static List<Classes> LoadInClasses(){

        List<Classes> listOfClasses = new List<Classes>();

        try
        {
            var path = @"C:\Users\thefl\OneDrive\Documents\WEBDEV\ApiCreator\ClassesSheet.csv";
            using (TextFieldParser csvReader = new TextFieldParser(path))
            {
                //Telling the program when to read a comment and when to break the line from the file.
                csvReader.CommentTokens = new string[] { "#" };
                csvReader.SetDelimiters(new string[] { "," });
                csvReader.HasFieldsEnclosedInQuotes = true;

                //a loop to repeat until the file has no more data to read.
                while (!csvReader.EndOfData)
                {
                    string[] fields = csvReader.ReadFields();

                    //campaign field{0}
                    //subtype field[1]
                    //name field[2]
                    //description field[3]
                    // string campaign, subtype, name, description;

                    Classes thisClasses = new Classes(fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6], fields[7], fields[8]);
                    listOfClasses.Add(thisClasses);

                }

            }

        }


        catch (System.IO.FileNotFoundException)
        {
            //displaying text that we want the system to display if it can't find the file.
            // Console.log("Sorry but this file can't be found.");
            // Console.log("Please ensure that the file 'Classes - Sheet1.csv' is located in 'MainInfo'.");
        return new List<Classes>{new Classes("scifi", "houndish", "Protogen", "BarkBarkBark", "scifi", "houndish", "Protogen", "BarkBarkBark", "BarkBarkBark")};
        }
        // return new List<Classes>{new Classes("scifi", "houndish", "Protogen", "BarkBarkBark")};

        return listOfClasses;
    }
    
}

