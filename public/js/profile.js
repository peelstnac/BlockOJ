const solved = JSON.parse(localStorage.getItem('solved'));

const amt = [0, 0, 0];
if (solved) {
	for (const { diff } of solved) {
		amt[diff]++;
	}

	const problemsSolved = document.querySelectorAll('#problems-solved td + td');
	for (let i = 0; i < 3; i++) {
		problemsSolved[i].innerText = amt[i];
	}
}