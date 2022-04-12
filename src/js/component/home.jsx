import React, { useState, useEffect } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todoArray, setTodoArray] = useState([]);
	useEffect(() => getData(), []);

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/danielpabraham")
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((responseAsJson) => {
				setTodoArray(responseAsJson);
			})
			.catch((error) => {
				console.log("There is an error in this code: /n", error);
			});
	};

	let mappedTodoArray = todoArray.map((task, index) => {
		return (
			<li>
				{task.label}
				<button onClick={() => removeTask(index)}>
					<i class="fas fa-times"></i>
				</button>{" "}
			</li>
		);
	});

	function removeTask(i) {
		let filtered = todoArray.filter((task, index) => i != index);

		setTodoArray(filtered);
	}

	function removeAll() {
		setTodoArray([]);
	}

	return (
		<div className="todoBox">
			<div className="header">
				<h1>To-Do</h1>
				<button className="clearAll" onClick={() => removeAll()}>
					{" "}
					Clear All{" "}
				</button>
			</div>
			<div className="inputField">
				<input
					id="newTask"
					type="text"
					placeholder="..."
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							setTodoArray([
								...todoArray,
								{
									label: inputValue,
									done: false,
								},
							]);
							setInputValue("");
						}
					}}
				/>
			</div>
			<div>
				<ul>{mappedTodoArray}</ul>
			</div>
		</div>
	);
};

export default Home;
