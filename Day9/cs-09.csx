var input = File.ReadAllText("./input.txt").Split(Environment.NewLine).Select(a => Int64.Parse(a)).ToList();

const int PREAMBLE_LENGTH = 25;


//Part 1
Int64 p1 = 0;
for(int i = PREAMBLE_LENGTH; i< input.Count(); i++){
    var subset = input.Skip(i-PREAMBLE_LENGTH).Take(PREAMBLE_LENGTH);
    if(!subset.Any(a => subset.Any(b => a!=b && a+b == input[i]))){
        Console.WriteLine($"Part 1 : {input[i]}");
        p1 = input[i];
        break;
    }
}

// Part 2

Int64 p2 = 0;

for(int i=0; i<input.Count(); i++){
    for(int j=2; j< input.Count() -i; j++){
        var subset = input.Skip(i).Take(j);
        if(subset.Sum() == p1){
            p2 = (subset.Max() + subset.Min());
            Console.WriteLine($"Part 2 : {p2}");
            break;
        }
    }
}


