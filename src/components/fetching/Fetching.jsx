import { useState, useEffect } from "react";
import "../fetching/fetching.css";

const Fetching = () => {
	const [joke, setJoke] = useState("");
	const [loading, setLoading] = useState(false);

	const fetchJoke = () => {
		setLoading(true);

		fetch("https://official-joke-api.appspot.com/jokes/programming/random")
			.then((response) => response.json())
			.then((data) => {
				setJoke(data[0]);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setLoading(false);
			});
	};

	useEffect(fetchJoke, []);

	return (
		<section>
			<h1>Joke of the day</h1>
			<div className="container">
				{loading ? (
					<div className="spinner"></div>
				) : joke ? (
					<>
						<p>{joke.setup}</p>
						<p>{joke.punchline}</p>
					</>
				) : (
					<p>Cargando chiste...</p>
				)}
			</div>
			<button onClick={fetchJoke} disabled={loading}>
				{loading ? "Cargando..." : "Read another"}
			</button>
		</section>
	);
};

export default Fetching;
