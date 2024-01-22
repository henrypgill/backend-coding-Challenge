// import { TestingModule, Test } from "@nestjs/testing";
// import { AppController } from "./app.controller";
// import { AppService } from "./app.service";
// import type { Book } from "./types/book";

// describe('AppController', () => {
//     let appController: AppController;
//     let appService: AppService;

//     beforeEach(async () => {
//         const app: TestingModule = await Test.createTestingModule({
//             controllers: [AppController],
//             providers: [AppService],
//         }).compile();

//         appController = app.get<AppController>(AppController);
//         appService = app.get<AppService>(AppService);
//     });

//     describe('root', () => {
//         it('should return "Welcome!"', () => {
//             expect(appController.welcome()).toBe('Welcome!');
//         });
//     });

//     describe('get stock list', () => {
//         it('should return an array of Books', () => {
//             const books: Book[] = appController.getStockList();
//             expect;
//         });
//     });

//     describe('update stock count', () => {
//         it('should return an array of Books with the correct stock cou', () => {
//             expect(appController.welcome()).toBe('Welcome!');
//         });
//     });
// });
