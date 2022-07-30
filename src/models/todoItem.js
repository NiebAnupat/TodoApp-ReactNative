import uuid from 'uuid-random';
// import { nanoid } from 'nanoid';

class todoItem {
  constructor(id,title,completed,timeStame) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.timeStame = timeStame;
  }

  getId = () => {
    return this.id;
  };

  getTitle = () => {
    return this.title;
  };

  setTitle = text => (this.title = text);

  isCompleted = () => {
    return this.completed;
  };

  setCompleted = completed => (this.completed = completed);
}

export default todoItem;
