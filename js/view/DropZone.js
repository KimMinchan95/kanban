import KanbanAPI from '../api/KanbanAPI.js';

// 드랍존: 칸반을 옮길 위치에 형광줄로 표시
export default class DropZone {
  static createDropZone() {
    // 인접한 부분을 선택
    const range = document.createRange();

    range.selectNode(document.body);

    const dropZone = range.createContextualFragment(`
      <div class='kanban__dropzone'></div>
    `).children[0];

    // 마우스가 대상 DropZone 위에 있을때, 형광색 줄을 활성화
    dropZone.addEventListener('dragover', event => {
      event.preventDefault();
      dropZone.classList.add('kanban__dropzone--active');
    });

    // 마우스가 DropZone을 벗어났을때 형광색 줄을 비활성화
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('kanban__dropzone--active');
    });

    // DropZone에 Item을 놨을때
    dropZone.addEventListener('drop', event => {
      event.preventDefault();
      dropZone.classList.remove('kanban__dropzone--active');

      const columnElement = dropZone.closest('.kanban__column');
      const columnId = Number(columnElement.dataset.id);
      const dropZonesInColumn = Array.from(columnElement.querySelectorAll('.kanban__dropzone'));
      const droppedIndex = dropZonesInColumn.indexOf(dropZone);
      const itemId = Number(event.dataTransfer.getData('text/plain'));
      const droppedItemElement = document.querySelector(`[data-id='${itemId}']`);
      const insertAfter = dropZone.parentElement.classList.contains('kanban__item') ? dropZone.parentElement : dropZone;

      if (droppedItemElement.contains(dropZone)) {
        return;
      }

      insertAfter.after(droppedItemElement);
      KanbanAPI.updateItem(itemId, {
        columnId,
        position: droppedIndex
      });
    });

    return dropZone;
  }
}