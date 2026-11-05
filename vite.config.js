import {defineConfig} from 'vite';
import sirv from 'sirv';

export default defineConfig({
  publicDir:false,
  build:{outDir:'public',emptyOutDir:false,assetsDir:'app',sourcemap:false},
  server:{host:'127.0.0.1'},
  preview:{host:'127.0.0.1'},
  plugins:[{
    name:'static-assets-during-development',
    configureServer(server){
      const assets=sirv('public',{dev:true});
      server.middlewares.use((req,res,next)=>{
        if(/^\/(?:assets\/|vendor\/|icon\.svg(?:\?|$))/.test(req.url||''))assets(req,res,next);
        else next();
      });
    },
  }],
});
