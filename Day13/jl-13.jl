### A Pluto.jl notebook ###
# v0.11.14

using Markdown
using InteractiveUtils

# ╔═╡ b36fb690-3447-11eb-3629-edbddae4ebd1
arrivalStr,shuttleIds = readlines("./input.txt");

# ╔═╡ 47b5c4a0-3db9-11eb-3576-97091f1bf011
begin
	arrival = parse(Int,arrivalStr)
	shuttles = NamedTuple{(:shuttle, :delay),Tuple{Int64,Int64}}[]
	for (index,value) ∈ enumerate(split(shuttleIds,","))
		if value != "x"
			push!(shuttles, (shuttle = parse(Int,value), delay = mod(-1*(index-1),parse(Int,value))))
		end
	end
end

# ╔═╡ e1b52942-3db9-11eb-0e49-45d055bb09f0
shuttles

# ╔═╡ 3c75c812-3dbc-11eb-23a6-c53244ba0530
# Part 1
function part1(shuttles::Array{NamedTuple{(:shuttle, :delay),Tuple{Int64,Int64}}}, arrival::Int)
	waitTime, shuttleId = minimum(map( b -> (b.shuttle-arrival %b.shuttle, b.shuttle),shuttles))
	waitTime * shuttleId
end

# ╔═╡ d4e0a3d2-3dbd-11eb-19b9-5538a2737649
@show part1(shuttles,arrival)

# ╔═╡ 5edd004e-3dbe-11eb-1eba-477618416d09
# Chinese Reminder 
# https://rosettacode.org/wiki/Chinese_remainder_theorem

function part2(shuttles::Array{NamedTuple{(:shuttle, :delay),Tuple{Int64,Int64}}})
	Π = prod(s -> s.shuttle, shuttles)
	sol = sum(s -> s.delay * (Π ÷ s.shuttle) * invmod(Π ÷ s.shuttle, s.shuttle),shuttles)
	mod(sol,Π)
end

# ╔═╡ 3e018d12-3dbf-11eb-1b42-e98c778fbb50
@show part2(shuttles)

# ╔═╡ Cell order:
# ╠═b36fb690-3447-11eb-3629-edbddae4ebd1
# ╠═47b5c4a0-3db9-11eb-3576-97091f1bf011
# ╠═e1b52942-3db9-11eb-0e49-45d055bb09f0
# ╠═3c75c812-3dbc-11eb-23a6-c53244ba0530
# ╠═d4e0a3d2-3dbd-11eb-19b9-5538a2737649
# ╠═5edd004e-3dbe-11eb-1eba-477618416d09
# ╠═3e018d12-3dbf-11eb-1b42-e98c778fbb50
