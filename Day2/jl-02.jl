### A Pluto.jl notebook ###
# v0.11.14

using Markdown
using InteractiveUtils

# ╔═╡ b36fb690-3447-11eb-3629-edbddae4ebd1
input = readlines("./input.txt");

# ╔═╡ 3d1fca00-3449-11eb-3e0e-5784380ebdbc
struct PasswordAndPolicy
	low :: Int
	high :: Int
	policy_letter :: Char
	password :: String
end

# ╔═╡ 4ab2f908-3449-11eb-299d-53d5a0a3044e
function parseInput(line)
	matches = match(r"(\d+)-(\d+)\s+(\w):\s+(.+)",line)
	matches == nothing && return
	PasswordAndPolicy(
		parse(Int,matches.captures[1]),
		parse(Int,matches.captures[2]),
		matches.captures[3][1], # capture only first char
		matches.captures[4]	
	)
end

# ╔═╡ 473a9452-3449-11eb-1dd1-25d770220737
passwordsAndPolicies = parseInput.(input)

# ╔═╡ 6e67d06a-344b-11eb-15c6-ed3cfcfd8a83
"""
	Checks if password is valid based on Part 1 rules
"""
function Part1Valid(p)
	count(==(p.policy_letter),p.password) ∈ UnitRange(p.low,p.high)
end

# ╔═╡ 959afa6a-3827-11eb-1fc9-5d4a250374cc
"""
	Evaluates Part 1
"""
function Part1(passwordsAndPolicies)
	count(
			p -> Part1Valid(p),
			passwordsAndPolicies
		)
end

# ╔═╡ b4d6dd9a-3827-11eb-18af-753996dfdc4d
Part1(passwordsAndPolicies)

# ╔═╡ 30635df6-3828-11eb-3ea0-ad5512977175
"""
	Checks if password is valid based on Part 2 rules
"""
function Part2Valid(p)
	(p.password[p.low] == p.policy_letter) ⊻ (p.password[p.high] == p.policy_letter)
end

# ╔═╡ 604e4e30-3828-11eb-3660-0196265f0647
"""
	Evaluates Part 2
"""
function Part2(passwordsAndPolicies)
	count(
			p -> Part2Valid(p),
			passwordsAndPolicies
		)
end

# ╔═╡ 6a0e2614-3828-11eb-3445-0bfb392e9a26
Part2(passwordsAndPolicies)

# ╔═╡ Cell order:
# ╠═b36fb690-3447-11eb-3629-edbddae4ebd1
# ╠═3d1fca00-3449-11eb-3e0e-5784380ebdbc
# ╠═4ab2f908-3449-11eb-299d-53d5a0a3044e
# ╠═473a9452-3449-11eb-1dd1-25d770220737
# ╠═6e67d06a-344b-11eb-15c6-ed3cfcfd8a83
# ╠═959afa6a-3827-11eb-1fc9-5d4a250374cc
# ╠═b4d6dd9a-3827-11eb-18af-753996dfdc4d
# ╠═30635df6-3828-11eb-3ea0-ad5512977175
# ╠═604e4e30-3828-11eb-3660-0196265f0647
# ╠═6a0e2614-3828-11eb-3445-0bfb392e9a26
