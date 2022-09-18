
using System;
using System.Collections.Generic;
using Microsoft.VisualBasic.FileIO;

public class Race
{

    public static string tester()
    {
        return "Hi There";
    }


    public string Campaign{get; set;}
    public string Subtype{get;set;}
    public string Name{get; set;}
    public string Description{get; set;}
    public Race(string campaign, string subtype, string name, string description)
    {
        Campaign = campaign;
        Subtype = subtype;
        Name = name;
        Description = description;
    }

    public static List<Race> GetCampaign(string campaign){
        List<Race> listOfRaces = LoadInRaces();
        List<Race> campaignList = new List<Race>();
        foreach( Race race in listOfRaces){
            if(race.Campaign == campaign){
                campaignList.Add(race);
            }

        }
        return campaignList;
    }

    public static List<Race> GetSubraces(string campaign, string faction){
        List<Race> listOfRaces = GetCampaign(campaign);
        List<Race> campaignList = new List<Race>();
        foreach( Race race in listOfRaces){
            if(race.Subtype == faction){
                campaignList.Add(race);
            }

        }
        return campaignList;

    }

    public static Race GetRaceInformation(string campaign, string faction, string raceName){
        List<Race> listOfSubraces = GetSubraces(campaign,faction);
        Race looking = new Race("holder", "holder", "holder", "holder");
        foreach( Race race in listOfSubraces){
            if(race.Name == raceName){
                looking = race;
                break;
            }
        }
        return looking;
    }

    public static List<Race> GetCampaignList(){
        List<string> campaignList = new List<string>();
        List<Race> listOfRaces = LoadInRaces();
        foreach(Race race in listOfRaces){
            if(campaignList.Contains(race.Campaign) != true){
                campaignList.Add(race.Campaign);
            }
        }
        List<Race> ListOfCampaigns = new List<Race>();
        foreach(string addcampaign in campaignList){
            Race campaignadder = new Race(addcampaign, "-", "-", "-");
            ListOfCampaigns.Add(campaignadder);
        }
        return ListOfCampaigns;
    }




    public static List<Race> LoadInRaces(){

        List<Race> listOfRaces = new List<Race>();

        try
        {
            var path = @"C:\Users\thefl\OneDrive\Documents\WEBDEV\ApiCreator\RacesSheet.csv";
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

                    //campaign field{0}
                    //subtype field[1]
                    //name field[2]
                    //description field[3]
                    // string campaign, subtype, name, description;

                    Race thisRace = new Race(fields[0], fields[1], fields[2], fields[3]);
                    listOfRaces.Add(thisRace);

                }

            }

        }


        catch (System.IO.FileNotFoundException)
        {
            //displaying text that we want the system to display if it can't find the file.
            // Console.log("Sorry but this file can't be found.");
            // Console.log("Please ensure that the file 'Races - Sheet1.csv' is located in 'MainInfo'.");
        return new List<Race>{new Race("scifi", "houndish", "Protogen", "BarkBarkBark")};
        }
        // return new List<Race>{new Race("scifi", "houndish", "Protogen", "BarkBarkBark")};

        return listOfRaces;
    }
    
}

