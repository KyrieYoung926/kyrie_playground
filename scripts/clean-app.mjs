import {rm} from 'node:fs/promises';
// app/ contains only generated bundles. Keep the static scene and controller.
await rm(new URL('../public/app/',import.meta.url),{recursive:true,force:true});
