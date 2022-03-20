import React, { Component } from "react";
import { Link } from "react-router-dom";

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        // para que encuentre el metodo
        this.addTask = this.addTask.bind(this);
        this.handleChange =  this.handleChange.bind(this);
    }

    addTask(e){
        console.log(this.state);
        // si existe el id se edita, si no se añade
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({title: '', description: '', _id: ''})
                M.toast({html:'task updated'});
                this.fetchTasks();
            })
        }else{
            
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                // es un aviso
                M.toast({html:'task saved'});
                this.setState({title: '', description: ''})
    
                // vuelve a pedir las tareas
                this.fetchTasks();
            })
            .catch(err => console.error(err));
        }

        
        // evita que se refresque
        e.preventDefault();
    }

    // elimina tareas
    deleteTask(id){
        if(confirm('Quieres eliminar?')){
            fetch(`api/tasks/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res =>  res.json()).then(data => {
                M.toast({html: 'Task Deleted'});
                this.fetchTasks();
            } )
        }
    }

    editTask(id){
        // obtiene la tarea mediante el id
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })

    }

    componentDidMount(){
        console.log("CARGADO");
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks').then(res => res.json())
        .then(data =>{
            this.setState({tasks: data})
            console.log(this.state.tasks);
        });
    }
    handleChange(e){
        const  {name, value} = e.target;
        this.setState({
            // El nombre se identifica automaticamente con el state del constructor
            [name]: value
        })
    }

    HelloWorld(props){
        return (
            <div>{props.text}</div>
        )
    }



    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>
                    <Link to="/invoices">Invoices</Link> |{" "}
                    <Link to="/expenses">Expenses</Link>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" onChange={this.handleChange} placeholder="Task Title" value={this.state.title}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Enviar</button>
                                    </form>    
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className="btn light-blue darken-4"  onClick={() => {this.editTask(task._id)}}><i className="material-icons">edit</i></button>
                                                    <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={() => {this.deleteTask(task._id)}}><i className="material-icons">delete</i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <this.HelloWorld key={task.title} text={task.title}></this.HelloWorld>
                                            )
                                        } )
                                    }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;