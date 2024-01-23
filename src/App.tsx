import { useState } from "react";
import "./App.css";

type Synonym = {
	word: string;
	score: number;
};

function App() {
	const [word, setWord] = useState("");
	const [synonyms, setSynonyms] = useState<Synonym[]>([]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
			.then((response) => response.json())
			.then(setSynonyms);
		console.log(word);
	}

	return (
		<div className="App">
			<h1>Synonyms</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="word-input">Your Word</label>
				<input
					id="word-input"
					onChange={(e) => setWord(e.target.value)}
					value={word}
				></input>
				<button>Submit</button>
			</form>
			<ul>
				{synonyms.map((synonym) => (
					<li key={synonym.word}>{synonym.word}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
