using System.Text.RegularExpressions;
var input = File.ReadAllText("./input.txt").Split($"\n");

var contentsOf = new Dictionary<string,List<(string,int)>>();
var bagsThatContain = new Dictionary<string,HashSet<string>>();

var outerRegex = new Regex(@"^(?<color>\w+\s\w+) bags contain");
var innerRegex = new Regex(@"(?<quantity>\d+) (?<innerColor>\w+\s\w+) bags?");


foreach(var line in input){

    var outerMatch = outerRegex.Match(line);
    var color = outerMatch.Groups["color"].Value;
    var innerMatches = line.Split(',').Select(a => innerRegex.Match(a)).Where(a=>a.Success);
    contentsOf[key: color] = new List<(string, int)>();

    foreach(var innerMatch in innerMatches){

        string innerColor = innerMatch.Groups["innerColor"].Value;
        int quantity = int.Parse(innerMatch.Groups["quantity"].Value);

        if(!bagsThatContain.ContainsKey(innerColor)){
            bagsThatContain[innerColor] = new HashSet<string>();
        }
        bagsThatContain[innerColor].Add(color);

        contentsOf[key: color].Add((innerColor, quantity));
    }
}

// Part 1

IEnumerable<string> CanContain(string color){
    var bags = new HashSet<string>();
    if(bagsThatContain.ContainsKey(color)){
        foreach(string bag in bagsThatContain[color]){
            bags.Add(bag);
            // Recursive function call
            bags.UnionWith(CanContain(bag));
        }
    }
    return bags;
}

var Part1 = CanContain("shiny gold").Count();

Console.WriteLine($"Part 1: {Part1}");

// Part 2
int CountBagsIn(string color){
    int count = 0;
    if(contentsOf.ContainsKey(color)){
        foreach ((string c, int q) in contentsOf[color])
        {
            count += q * (1 + CountBagsIn(c));
        }
    }
    return count;
}

var Part2 = CountBagsIn("shiny gold");

Console.WriteLine($"Part 2 : {Part2}");