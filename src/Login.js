import { useForm } from "react-hook-form";
import {useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './Login.css';

var Airtable = require('airtable');


export default function Login(props){
	const navigate = useNavigate();
	const [name, setName] = useState("");

	var base = new Airtable({apiKey: 'key8h49HTFO8qtfYC'}).base('app8ZbcPx7dkpOnP0');
	let arrClass = [];
	let arrData = [];

	let onSubmit =  (e) =>{
		e.preventDefault();
		base('Students').select({
		    view: 'Grid view'
		}).firstPage(function(err, records) {
		    if (err) { console.error(err); return; }
		    records.forEach(function(record) {
		        if(record.get('Name') === name){
		        		arrClass = record.get('Classes')
		       			 console.log('Retrieved', arrClass);
		       			 getData(arrClass, records);
		        }
		    });
		});		
	    console.log('arrData =>', arrData);
	}

	function getData(arr, students){
		
		 base('Classes').select({
		    view: 'Grid view'
		}).firstPage(function(err, records) {
		    if (err) { console.error(err); return; }
		    records.forEach(function(record) {
		        //console.log('recid = ', record.id);
		        arr.forEach(function(cls){
		        	if(record.id == cls){

		        		let names = [];
		        		let name = record.get("Name");
		        		record.get("Students").forEach(function(stuid){

			        		students.forEach(student => {
			        			if(student.id == stuid)
			        			{
			        				names.push(student.get("Name"));
			        				names.push(" ");
			        			}	
			        		})
		        		});
		        		arrData.push({"Name":name, "Students": names});
		        		console.log('true');
		        	}
		        });
		    });
    		console.log('arrData =>', arrData);
		    props.parentTo(arrData);
		    navigate("/page")
		  //  console.log('props => ', props.parentTo);
		});

		        
	//	
	}
	return (
		<form onSubmit={onSubmit}>
			<label>
				name: 
				<input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
			</label>
			<input type="submit" value="submit"/>
		</form>
	);
}