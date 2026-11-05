import {cp,mkdir} from 'node:fs/promises';

const destination=new URL('../public/vendor/mjswan/',import.meta.url);
await mkdir(destination,{recursive:true});
await cp(new URL('../node_modules/mjswan/dist/',import.meta.url),destination,{recursive:true});
await cp(new URL('../node_modules/mjswan/LICENSE',import.meta.url),new URL('LICENSE.txt',destination));
