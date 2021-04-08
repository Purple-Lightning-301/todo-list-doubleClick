import React from "react";
import ToDo from "../components/ToDo";

class ToDoList extends React.Component {

  render() {
    return (
      <div>
        <div className="todo-container">
          <ul className="todo-list">
            {this.props.toDos.map((todo) => (
              <ToDo
                key={todo.id}
                text={todo.text}
                toDos={this.props.toDos}
                setToDos={this.props.setToDos}
                todo={todo}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDoList;