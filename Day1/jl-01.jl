### A Pluto.jl notebook ###
# v0.11.14

using Markdown
using InteractiveUtils

# ╔═╡ b36fb690-3447-11eb-3629-edbddae4ebd1
input = readlines("./input.txt");

# ╔═╡ 3d1fca00-3449-11eb-3e0e-5784380ebdbc
expenseReport = map(x -> parse(Int32,x),input)

# ╔═╡ 4ab2f908-3449-11eb-299d-53d5a0a3044e
len = size(expenseReport)[1]

# ╔═╡ 473a9452-3449-11eb-1dd1-25d770220737
let p1 = nothing
	for i ∈ 1:len, j ∈ i+1:len
		if expenseReport[j]+ expenseReport[i] == 2020
			p1= expenseReport[i]*expenseReport[j]
			break
		end
	end
	p1
end

# ╔═╡ 6e67d06a-344b-11eb-15c6-ed3cfcfd8a83
let p2 = nothing
	for i ∈ 1:len, j ∈ i+1:len
		if (2020-(expenseReport[j]+ expenseReport[i])) in expenseReport
			p2= expenseReport[i]*expenseReport[j]*(2020 - (expenseReport[j] + expenseReport[i] ))
			break
		end
	end
	p2
end

# ╔═╡ Cell order:
# ╠═b36fb690-3447-11eb-3629-edbddae4ebd1
# ╠═3d1fca00-3449-11eb-3e0e-5784380ebdbc
# ╠═4ab2f908-3449-11eb-299d-53d5a0a3044e
# ╠═473a9452-3449-11eb-1dd1-25d770220737
# ╠═6e67d06a-344b-11eb-15c6-ed3cfcfd8a83
