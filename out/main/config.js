var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { config, ProcessEnvConfig } from '@ubio/framework';
export class AppConfig extends ProcessEnvConfig {
}
__decorate([
    config(),
    __metadata("design:type", String)
], AppConfig.prototype, "SECRET_KEY", void 0);
__decorate([
    config({ default: "APP_PORT" }),
    __metadata("design:type", String)
], AppConfig.prototype, "APP_PORT", void 0);
__decorate([
    config({ default: "MONGO_URL" }),
    __metadata("design:type", String)
], AppConfig.prototype, "MONGO_URL", void 0);
__decorate([
    config({ default: 3000 }),
    __metadata("design:type", Number)
], AppConfig.prototype, "PORT", void 0);
//# sourceMappingURL=config.js.map