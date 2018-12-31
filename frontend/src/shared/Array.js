Array.prototype.get = function (id) {
    let index = this.findIndex(x => x.id === id);
    return { item: this[index], index: index };
};
export default Array;
//# sourceMappingURL=Array.js.map