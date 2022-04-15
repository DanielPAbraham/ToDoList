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

	const saveTask = (e) => {
		let newTodoArray = [
			...todoArray,
			{
				label: inputValue,
				done: false,
			},
		];
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/danielpabraham",
			{
				method: "PUT",
				body: JSON.stringify(newTodoArray),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => {
				console.log("Success:", response);
				getData();
			})
			.catch((error) => console.error(error));
		setInputValue("");
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
		let filtered = todoArray.filter((task, index) => {
			i != index;
			return i != index;
		});
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/danielpabraham",
			{
				method: "PUT",
				body: JSON.stringify(filtered),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => {
				console.log("Success:", response);
				getData();
			})
			.catch((error) => console.error(error));
		setTodoArray(filtered);
	}

	function removeAll() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/danielpabraham",
			{
				method: "PUT",
				body: JSON.stringify([""]),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => {
				console.log("Success:", response);
				getData();
			})
			.catch((error) => console.error(error));
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
					onChange={(e) =>
						setInputValue(
							e.target.value.charAt(0).toUpperCase() +
								e.target.value.slice(1).toLowerCase()
						)
					}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							saveTask(e);
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
