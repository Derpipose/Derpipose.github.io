

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin()));
var app = builder.Build();



List<Race> races = new List<Race>();
//load csv

//load up
app.MapGet("/", () => "Hello, please select an option of Races, classes or spells");

app.MapGet("/races", () => Race.LoadInRaces());
app.MapGet("/racescampaign", Race.GetCampaign);
app.MapGet("/racescampaignsubraces", Race.GetSubraces);
app.MapGet("/racescampaignsubracesdescription", Race.GetRaceInformation);
// app.MapGet("/racescampaignlist", Race.GetCampaignList());

//spells
//books
//branches
//spellinfo
app.MapGet("/spells", () => Spell.LoadInSpells());
app.MapGet("/spellsbranches", Spell.GetBranch);
app.MapGet("/spellsbranchesspells", Spell.GetBook);
app.MapGet("/spellsbranchesspellsdescription", Spell.GetSpellInformation);

//classes
//class types
//class specific 
app.MapGet("/class", () => Classes.LoadInClasses());
app.MapGet("/classtypes", Classes.GetType);
app.MapGet("/classtypesinformation", Classes.GetClassInformation);



// app.MapGet("/races?{campaign}", Race.GetCampaign(campaign));
// app.MapGet("/spells", () => Spells.LoadInSpells());
// app.MapGet("/classes", () => Classes.LoadInClasses());
app.UseCors();
app.Run();
