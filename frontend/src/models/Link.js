import cuid from "cuid";
export default class Link {
    constructor(url) {
        this.id = "";
        this.url = "";
        this.title = "";
        this.description = "";
        this._image = "../images/no-image.png";
        this.id = cuid();
        this.url = url;
    }
    get image() {
        return this._image;
    }
    set image(value) {
        if (value) {
            this._image = value;
        }
        else {
            this._image = "../images/no-image.png";
        }
    }
}
//# sourceMappingURL=Link.js.map