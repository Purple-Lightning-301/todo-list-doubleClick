import React from "react";
import './App.css';
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputText: "",
      toDos: [],
      status: "all",
      filterToDos: []
    }
  }

  filterHandler = () => {
    switch(this.state.status){
      case "completed":
        this.setState({toDos: (this.state.toDos.filter(todo => todo.completed === true))});
        break;
      case "uncompleted":
        this.setState({toDos: (this.state.toDos.filter(todo => todo.completed === false))});
        break;
      default:
        this.setState({toDos: this.state.toDos})
        break;
    }
  }

  // setToDos(newToDos) {
  //   console.log(newToDos)
  //   let arr = [...this.state.toDos, newToDos]
  //   this.setState({toDos: arr})
  //   console.log(this.state.toDos);
  // }
  setToDos(arr) {

    this.setState({toDos: arr})
    // console.log(this.state.toDos);
  }
  setInputText(newInputText){
    this.setState(
      {inputText: newInputText}
    )
  }
  setStatus(newStatus){
    this.setState(
      {status: newStatus}
    )
  }
  render(){
  return (
    <div className="App">
      <div className="header">Todo-list</div>
      <Form
        toDos={this.state.toDos}
        setToDos={(newToDos) => this.setToDos(newToDos)}
        inputText={this.state.inputText}
        setInputText={(newInputText) => this.setInputText(newInputText)}
        setStatus = {(newStatus) => this.setStatus(newStatus)}
      />
      <ToDoList toDos={this.state.toDos} setToDos={(newToDos) => this.setToDos(newToDos)} filterToDos={this.state.filterToDos}/>
    </div>
  );
}
}

export default App;
