export default class post {
    constructor(title, img, author) {
        this.title = title
        this.date = new Date()
        this.author = author
        this.img = img
    }
    toString() {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            author: this.author,
            img: this.img
        }, null, '  ',)
    }

}