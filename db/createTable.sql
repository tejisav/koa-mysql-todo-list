CREATE TABLE IF NOT EXISTS todo (
  todoID INT AUTO_INCREMENT PRIMARY KEY,
  todoItem VARCHAR(250) NOT NULL,
  todoDateAdded DATE NOT NULL,
  todoStatus BOOLEAN NOT NULL,
  todoDueBy DATE,

  UNIQUE KEY unique_item (todoItem)
);
