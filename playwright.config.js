import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser',timeout:120000,workers:1,
  use:{baseURL:process.env.CATCH_LAB_URL||'http://127.0.0.1:4173',headless:true,
    launchOptions:{args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']}},
});
