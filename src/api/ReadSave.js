function read() {
  // 로컬 스토리지에서 칸반 데이터를 가져온다.
  const json = localStorage.getItem('kanban-data');

  // 만약 처음 접속했으면 예제 목록 생성
  if (!json) {
    return [
      {
        id: 1,
        items: [{id: 1, content: '새로 만들기로 칸반 생성'}]
      },
      {
        id: 2,
        items: [{id: 2, content: '더블클릭으로 삭제 가능'}, {id: 3, content: '클릭시 변경'}]
      },
      {
        id: 3,
        items: [{id: 4, content: '로컬스토리지에 저장'}]
      },
    ];
  }

  return JSON.parse(json);
}

// 기능 한번이라도 사용했으면 로컬스토리지에 저장
function save(data) {
  localStorage.setItem('kanban-data', JSON.stringify(data));
}

export { read, save };