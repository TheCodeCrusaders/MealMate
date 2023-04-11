
export function createTable(data) {
    data.forEach((element, index) => {
      createItem(element, index)
    });
  }