import fs from 'fs';
import path from 'path';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.jsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./client/src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('cyan')) {
    content = content.replace(/cyan/g, 'indigo');
    changed = true;
  }
  if (content.includes('rgba(0,255,255')) {
    content = content.replace(/rgba\(0,255,255/g, 'rgba(99,102,241');
    changed = true;
  }
  if (content.includes('rgba(34,211,238')) {
    content = content.replace(/rgba\(34,211,238/g, 'rgba(99,102,241');
    changed = true;
  }
  if (content.includes('rgba(136,247,255')) {
    content = content.replace(/rgba\(136,247,255/g, 'rgba(165,180,252');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
