<Query Kind="Statements" />

string currentDirPath = Path.GetDirectoryName(Util.CurrentQueryPath);
string inputFilePath = Path.Combine(currentDirPath, "input.txt");
var input = File.ReadAllLines(inputFilePath).Select(a => a.ToArray()).ToArray();

IEnumerable<(int, int)> GetPositions((int right, int down) slope, int count,int rowLength) =>
	Enumerable.Range(0, count)
			.Select(i => ((slope.right * i)%rowLength, slope.down * i))
			.ToArray();



Func<(int, int), IEnumerable<char>> GetEncounters(char[][] topoMap)
{
	return ((int r,int d) slope) => 
		GetPositions(slope,(int)topoMap.Length/slope.d,(int)topoMap[0].Length)
		.Select(
			((int row, int col) position) => 
			topoMap[position.col][position.row]
		);
}


var EncounterGenerator = GetEncounters(input);


// Part 1
EncounterGenerator((3,1))
	.Count(x=>x=='#')
	.Dump("Part 1");



// Part 2
var slopes = new List<(int,int)>{
	(1,1),
	(3,1),
	(7,1),
	(1,2)
};

slopes
	.Select(s => 
		EncounterGenerator(s)
		.Count(x=>x=='#')
	).Aggregate(1,(Int64 a,Int32 b)=>(Int64)a*b)
	.Dump("Part 2");