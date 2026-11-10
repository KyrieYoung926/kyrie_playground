// One-use transfer across same-task rally reloads; ordinary refresh starts fresh.
const key='catchlab-view-transfer';
export function snapshotCamera(engine){return structuredClone(engine.camera.get());}
export function restoreCamera(engine,view){if(view){engine.camera.setTracking(false);engine.camera.set(view);}}
export function saveReloadCamera(engine,task){try{sessionStorage.setItem(key,JSON.stringify({task,view:snapshotCamera(engine),time:Date.now()}));}catch{}}
export function takeReloadCamera(task){try{const raw=sessionStorage.getItem(key);sessionStorage.removeItem(key);const s=JSON.parse(raw);return s?.task===task && Date.now()-s.time<60000?s.view:null;}catch{return null;}}
