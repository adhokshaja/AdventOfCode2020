### A Pluto.jl notebook ###
# v0.11.14

using Markdown
using InteractiveUtils

# ╔═╡ b36fb690-3447-11eb-3629-edbddae4ebd1
input = readlines("./input.txt");

# ╔═╡ 4ab2f908-3449-11eb-299d-53d5a0a3044e
"""
	Converts Input to a Int matrix
"""
function parseInput(input::Array{String,1})
	rows = length(input)
	cols = length(input[1])
	boolMat = Matrix{Int}(undef,rows,cols)
	for row ∈ 1:rows
		for col ∈ 1:cols
			boolMat[row,col] = input[row][col] == '#' ? 1 : 0
		end
	end
	return boolMat
end

# ╔═╡ e1af2152-3835-11eb-1940-4744bf549a6f

begin
	"""
 	Gets the tree count for all given slopes
	"""
	function GetTreeCountForSlope((right,down)::Tuple{Int,Int})
		function(boolMat::Matrix{Int}) 
			r,c = size(boolMat)
			x,y = 1,1
			count = 0
			while x < r
				count += boolMat[x,y]
				x=(x+down)
				y=mod1(right+y,c)
			end
			return count
		end
	end
	
	function GetTreeCountForSlope(slopes::Array{Tuple{Int64,Int64},1})
		function(boolMat::Matrix{Int}) 
			counts = Array{Int}(undef,size(slopes))
			for i ∈ 1:size(slopes)[1]
				(right,down) = slopes[i]
				r,c = size(boolMat)
				x,y = 1,1
				count = 0
				while x < r
					count += boolMat[x,y]
					x=(x+down)
					y=mod1(right+y,c)
				end
				counts[i] = count
			end
			return counts
		end
	end
	
end

# ╔═╡ 7b8df328-3838-11eb-269d-21098ee6f5d5
parsedInput = input |> parseInput;

# ╔═╡ d839bbcc-3836-11eb-2fb0-a50603b97bcd
Part1 = parsedInput |> GetTreeCountForSlope((3,1))

# ╔═╡ 86e320c0-383a-11eb-3160-e3da943b134d
Part2 = reduce(*,parsedInput |> GetTreeCountForSlope([(1,1),(3,1),(5,1),(7,1),(1,2)]) )

# ╔═╡ Cell order:
# ╠═b36fb690-3447-11eb-3629-edbddae4ebd1
# ╠═4ab2f908-3449-11eb-299d-53d5a0a3044e
# ╠═e1af2152-3835-11eb-1940-4744bf549a6f
# ╠═7b8df328-3838-11eb-269d-21098ee6f5d5
# ╠═d839bbcc-3836-11eb-2fb0-a50603b97bcd
# ╠═86e320c0-383a-11eb-3160-e3da943b134d
