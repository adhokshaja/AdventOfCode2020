<Query Kind="Statements" />

string currentDirPath = Path.GetDirectoryName (Util.CurrentQueryPath);
string inputFile = Path.Combine(currentDirPath, "input.txt");
var input = File.ReadAllText(inputFile).Split($"\n\n");

// Key value Regex
var kvRegex = new Regex(@"(?<key>\S*):(?<value>\S*)\s?");

var passports = input.Select(entry => new Passport(entry.Replace("\n", " ").Split(' ').Select(
    x =>
        {
            var matches = kvRegex.Match(x).Groups;
            return (matches["key"].Value, matches["value"].Value);
        }
    ))
);




var Part1 = passports.Count(p => p.HasNeededKeys).Dump("Part1");
//Console.WriteLine($"Part 1 : {Part1}");


record Passport(IReadOnlyDictionary<string, string> Props)
{
	public Passport(IEnumerable<(string key, string value)> kv)
		: this(kv.ToDictionary(x => x.key, x => x.value))
	{
	}

	IList<string> neededKeys = new List<string> { "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" };

	public bool HasNeededKeys =>
		neededKeys.All(k => Props.ContainsKey(k));

	bool isYearBetween(string key, int start, int end)
	{
		Props.TryGetValue(key, out var val);
		int.TryParse(val, out int year);
		return year >= start && year <= end;
	}

	bool isValidHeight(){
        Props.TryGetValue("hgt", out var val);
		int.TryParse(val?[..^2], out int height);
		var unit = val?[^2..];
        switch(unit){
            case "cm": return (height >=150 && height <=193)? true :false;
            case "in": return (height >= 59 && height <= 63)? true: false;
            default: return false;
        }
    }

    public bool IsValid => HasNeededKeys &&
	isYearBetween("byr", 1920, 2002) &&
	isYearBetween("iyr", 2010, 2020) &&
	isYearBetween("eyr", 2020, 2030) &&
	isValidHeight()&&
	//is4DigitNumberBetween(iyr, 2010, 2020) &&
	// is4DigitNumberBetween(eyr, 2020, 2030) &&
	;
}