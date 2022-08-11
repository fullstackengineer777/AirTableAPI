import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function Page(props){

	console.log("page => ",props.data);
	const navigate = useNavigate();
	const logout = () => {
		console.log("logout");
		navigate("/");
	}

	return (
		<div>
			<div id="btndiv" style={{float:"right", margin:"20px"}}>
				<input type='button' onClick={logout} value="logout"></input>
			</div>
			<div id="datadiv" >
			{	
				props.data.map( (row,key) => (
					<div style={{border: "1px solid black", margin: "20px", width: "300px"}}>

					<h5>Name</h5>
					<p>{row["Name"]}</p>
					<h5>Students</h5>
					<p>{row["Students"]}</p> 	
					</div>
				))
			}
			</div>
		</div>
	)

}