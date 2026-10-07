import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',fullyParallel:true,workers:4,timeout:30000,reporter:'list',use:{baseURL:'http://127.0.0.1:4173',headless:true,channel:'chrome'},webServer:{command:'node server.mjs',url:'http://127.0.0.1:4173',reuseExistingServer:true},outputDir:'test-results'});
