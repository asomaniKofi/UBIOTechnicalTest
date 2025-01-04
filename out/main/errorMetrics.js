export class NotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.name = this.constructor.name;
        this.status = 404;
    }
}
//# sourceMappingURL=errorMetrics.js.map