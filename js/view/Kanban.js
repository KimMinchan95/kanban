import Column from './Column.js';
export default class Kanban {
  constructor(root) {
    this.root = root;

    Kanban.columns().forEach(column => {
      const columnView = new Column(column.id, column.title);

      this.root.appendChild(columnView.elements.root);
    });
  }

  static columns() {
    const groups = [
      {
        id: 1,
        title: "시작 전"
      },
      {
        id: 2,
        title: "진행 중"
      },
      {
        id: 3,
        title: "완료 목록"
      },
    ];

    return groups;
  }
}