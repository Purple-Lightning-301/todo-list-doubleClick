import React from "react";
import "./App.css";
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      toDos: [],
      status: "all",
      filterToDos: [],
      selectedID: -1,
      counter: 0,
      id: -1
    };
    this.setStatus = this.setStatus.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this) ;
  }

  componentDidMount() {
    this.getLocal();
  }
  componentDidUpdate(prevProps, prevStates) {
   
    if (this.state.status !== prevStates.status || this.state.toDos.length !== prevStates.toDos.length || this.state.selectedID !== prevStates.selectedID) {
      this.filterHandler();
      this.saveLocalToDos();
    }
  }
  setSelectedID(newID){
    this.setState({selectedID: newID})
  }
  setID(newID){
    this.setState({id: newID})
  }
  setCounter(newCounter){
    this.setState({counter: newCounter})
  }
  setToDos(arr) {
    this.setState({ toDos: arr });
  }
  setInputText(newInputText) {
    this.setState({ inputText: newInputText });
  }
  setStatus(newStatus) {
    this.setState({ status: newStatus });
  }
  setFilterToDos(newArr) {
    this.setState({ filterToDos: newArr });
  }

  filterHandler = () => {
    switch (this.state.status) {
      case "completed":
        this.setFilterToDos([
          ...this.state.toDos.filter((todo) => todo.completed === true),
        ]);
        break;
      case "uncompleted":
        this.setFilterToDos([
          ...this.state.toDos.filter((todo) => todo.completed === false),
        ]);
        break;
      default:
        this.setFilterToDos([
          ...this.state.toDos]);
        break;
    }
  };

  saveLocalToDos = () => {
    localStorage.setItem("toDos", JSON.stringify(this.state.toDos));
  };
  getLocal = () => {
    if (localStorage.getItem("toDos") === null) {
      localStorage.setItem("toDos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("toDos"));
      this.setToDos(todoLocal);
    }
  };

  handlerDoubleSelect = (id) => {
    console.log(id)
    console.log(this.state.selectedID)
    console.log(this.state.counter)
    if(this.state.counter === 0 && this.state.selectedID === -1){
      console.log("click lan 1")
      console.log(this.state.selectedID)
      this.setState(()=>{
        return{
          selectedID: id,
          counter: 1
        }
      })
    }else if(this.state.counter === 1 && this.state.selectedID === id){
      console.log("click lan 2")
      this.toggleComplete(id)
      this.setState(()=>{
        return{
          counter: 0,
          selectedID: -1
        }
      })
    } else if(this.state.counter === 1 && this.state.selectedID !== id){
      this.setState(()=>{
        return{
          counter: 0,
          selectedID: -1
        }
      })
    }
  }

  toggleComplete(id){
    const index = this.state.toDos.findIndex(value=>{
      return value.id === id ;
    }) ;
    console.log(index) ;
    this.state.toDos[index].completed = !this.state.toDos[index].completed ;
    this.setState({
      toDos : this.state.toDos,
    })
  }
  render() {
    return (
      <div className="App">
        <div className="header">Todo-list</div>
        <Form
          toDos={this.state.toDos}
          setToDos={(newToDos) => this.setToDos(newToDos)}
          inputText={this.state.inputText}
          setInputText={(newInputText) => this.setInputText(newInputText)}
          setStatus={(newStatus) => this.setStatus(newStatus)}
        />
        <ToDoList
          toDos={this.state.toDos}
          setToDos={(newToDos) => this.setToDos(newToDos)}
          filterToDos={this.state.filterToDos}
          toggleComplete = {this.toggleComplete}
          selectedID = {this.state.selectedID}
          setSelectedID = {(newSelectedID) => this.setSelectedID(newSelectedID)}
          id = {this.state.id}
          setID = {(newID) => this.setID(newID)}
          handlerDoubleSelect = {(id)=> this.handlerDoubleSelect(id)}
        />
      </div>
    );
  }
}

export default App;
