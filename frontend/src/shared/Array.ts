declare global {
  interface Array<T> {
    get(id: string): IGetResult;
  }
}

interface IGetResult {
  item: object;
  index: number;
}

Array.prototype.get = function(id: string) {
  let index = this.findIndex(x => x.id === id);
  return { item: this[index], index: index };
};

export default Array;
