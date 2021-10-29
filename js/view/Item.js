import KanbanAPI from '../api/KanbanAPI.js';
import DropZone from './DropZone.js';

export default class Item {
  constructor(id, content) {
    const bottomDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Item.createRoot();
    this.elements.input = this.elements.root.querySelector('.kanban__item-input');

    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;
    this.elements.root.appendChild(bottomDropZone);

    // Item 내용 업데이트
    const onBlur = () => {
      // trim() 문자열 좌우 공백 제거
      const newContent = this.elements.input.textContent.trim();

      // 기존과 내용 변화가 없을때
      if (newContent === this.content) {
        return;
      }

      // 변화가 있으면 내용을 업데이트
      this.content = newContent;
      KanbanAPI.updateItem(id, {
        content: this.content
      });
    };

    // onblur: onfocus와 반대로 focus가 해제될때 이벤트
    this.elements.input.addEventListener('blur', onBlur);
    // 더블 클릭하면 Item 삭제 이벤트
    this.elements.root.addEventListener('dblclick', () => {
      const check = confirm('Are you sure you want to delete this item?');

      if (check) {
        KanbanAPI.deleteItem(id);

        this.elements.input.removeEventListener('blur', onBlur);
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });

    // Drag & Drop 이벤트
    this.elements.root.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', id);
    });

    this.elements.input.addEventListener('drop', event => {
      event.preventDefault();
    });
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
      <section class='kanban__item' draggable='true'>
        <div class='kanban__item-input' contenteditable></div>
      </section>
    `).children[0];
  }
}