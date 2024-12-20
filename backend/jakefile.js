/* eslint-disable @typescript-eslint/no-var-requires */
let { task, desc } = require('jake');
const core = require('@nestjs/core');
const AppModule = require('./dist/src/app.module');
const FundsService = require('./dist/src/funds/funds.service');

desc('Genearates slug for all the universities');
task('load-previous-data', async function () {
  let app = await core.NestFactory.create(AppModule.AppModule);
  const fundsService = app.get(FundsService.FundsService);
  console.log('Loading some Previous Data...');

  await fundsService.loadPreviousData();

  console.log('Done');
});
