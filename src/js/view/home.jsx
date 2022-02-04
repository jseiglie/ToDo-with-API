import React, { useEffect, useState } from "react";

function Task(label, done) {
	this.label = label;
	this.done = done;
}

const Home = () => {
	const [list, setList] = useState([]);
	const [tarea, setTarea] = useState("");

	const SaveData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jseiglie", {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(list),
		})
			.then(() => console.log("guardado"))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		if (list.length > 0) {
			SaveData();
		}
	}, [list]);

	const HandleSubmit = (ev) => {
		ev.preventDefault();
		setList([...list, new Task(tarea, false)]);
		document.querySelector("#myInput").value = "";
	};

	const DeleteTask = (index) => {
		let tmp = list;
		list.splice(index, 1);
		console.log(tmp);
		setList([...list]);
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jseiglie", {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => {
				response.json();
			})
			.then((res) => {
				if (res !== undefined)
					setList(res.filter((tarea) => !tarea.done));
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<>
			{" "}
			<div className="container">
				<form onSubmit={HandleSubmit}>
					<input
						className="form-control"
						id="myInput"
						onChange={(ev) => setTarea(ev.target.value)}
						type="text"
					/>
					<button type="submit">Add task...</button>
				</form>
				<ul className="list-group">
					<div className="row">
						<div className="">
							{list.map((tarea, i) => (
								<li className="list-group-item" key={i}>
									<p className="">{tarea.label}</p>
									<button
										className="btn btn-danger"
										id="myBtn"
										onClick={() => {
											DeleteTask(i);
										}}>
										X
									</button>
								</li>
							))}
						</div>
					</div>
				</ul>
			</div>
		</>
	);
};

export default Home;
