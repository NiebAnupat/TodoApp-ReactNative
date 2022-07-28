import uuid from 'uuid-random';
// import { nanoid } from 'nanoid';

class todoItem {
  constructor(title) {
    this.id = uuid();
    this.title = title;
    this.completed = false;
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
