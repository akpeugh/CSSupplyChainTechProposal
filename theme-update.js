import fs from 'fs';
import path from 'path';

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  [/bg-white\/80/g, 'bg-slate-900/40 backdrop-blur-md'],
  [/bg-white(?!\/)/g, 'bg-slate-900/50 backdrop-blur-xl'],
  [/text-slate-900/g, 'text-white'],
  [/text-slate-800/g, 'text-slate-100'],
  [/text-slate-700/g, 'text-slate-200'],
  [/text-slate-600/g, 'text-slate-400'],
  [/text-slate-500/g, 'text-slate-400'],
  [/border-slate-100/g, 'border-white/10'],
  [/border-slate-200/g, 'border-white/10'],
  [/border-slate-300/g, 'border-white/20'],
  [/bg-slate-50(?!\/)/g, 'bg-white/5'],
  [/bg-slate-100(?!\/)/g, 'bg-white/5'],
  [/shadow-sm/g, 'shadow-2xl shadow-black/50'],
  [/shadow-md/g, 'shadow-2xl shadow-black/50'],
  [/shadow-lg/g, 'shadow-[0_0_40px_rgba(0,0,0,0.5)]'],
  [/text-primary-navy/g, 'text-cyan-400'],
  [/bg-primary-navy/g, 'bg-cyan-500'],
  [/border-primary-navy/g, 'border-cyan-500/50'],
  [/ring-primary-navy/g, 'ring-cyan-500'],
  [/text-primary-purple/g, 'text-violet-400'],
  [/bg-primary-purple/g, 'bg-violet-500'],
  [/text-primary-green/g, 'text-emerald-400'],
  [/bg-primary-green/g, 'bg-emerald-500'],
  [/text-primary-blue/g, 'text-blue-400'],
  [/bg-primary-blue/g, 'bg-blue-500'],
  [/#102a43/g, '#22d3ee'], 
  [/#0a192f/g, '#06b6d4'], 
  [/#cbd5e1/g, '#334155'], 
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  replacements.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  fs.writeFileSync(filePath, content);
});

// App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
appContent = appContent.replace(/bg-slate-50/g, 'bg-slate-950');
appContent = appContent.replace(/text-slate-900/g, 'text-slate-300');
if (!appContent.includes('radial-gradient')) {
    appContent = appContent.replace(
        '<Navigation', 
        '<div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-50" />\n      <Navigation'
    );
}
fs.writeFileSync('src/App.tsx', appContent);

// index.html
let htmlContent = fs.readFileSync('index.html', 'utf-8');
htmlContent = htmlContent.replace(/bg-slate-50 text-slate-900/g, 'bg-slate-950 text-slate-200');
htmlContent = htmlContent.replace(/selection:bg-navy-900/g, 'selection:bg-cyan-500/30');
fs.writeFileSync('index.html', htmlContent);

console.log('Theme updated globally!');
