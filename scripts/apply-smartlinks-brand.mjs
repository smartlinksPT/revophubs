import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory() && !['markdown'].includes(entry.name)) return htmlFiles(full);
    return entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
  });
}

function footer(isPt) {
  if (isPt) return `<footer class="site-footer"><div class="shell footer-top"><div><a class="brand brand-light" href="/pt/"><span>RevOp</span><strong>Hubs</strong></a><p>Conhecimento e ferramentas práticas de Revenue Operations. Uma iniciativa SmartLinks.</p></div><div class="footer-links"><div><b>Explorar</b><a href="/pt/fundamentals.html">Fundamentos</a><a href="/pt/ai-revops.html">AI-Powered RevOps</a><a href="/pt/ai-tools.html">Ferramentas de IA</a><a href="/pt/research.html">Investigação</a></div><div><b>SmartLinks</b><a href="/pt/about.html">Sobre a RevOpHubs</a><a href="https://www.smartlinks.pt/metodo/revenue-operations" rel="external">Revenue Operations</a><a href="https://www.smartlinks.pt/contactos" rel="external">Contactar a SmartLinks</a></div></div></div><div class="shell footer-bottom"><span>A RevOpHubs é mantida pela SmartLinks.</span><span>© 2026 SmartLinks</span></div></footer>`;
  return `<footer class="site-footer"><div class="shell footer-top"><div><a class="brand brand-light" href="/"><span>RevOp</span><strong>Hubs</strong></a><p>Practical Revenue Operations knowledge and tools. A SmartLinks initiative.</p></div><div class="footer-links"><div><b>Explore</b><a href="/fundamentals.html">Fundamentals</a><a href="/ai-revops.html">AI-Powered RevOps</a><a href="/ai-tools.html">AI Tools</a><a href="/research.html">Research</a></div><div><b>SmartLinks</b><a href="/about.html">About RevOpHubs</a><a href="https://www.smartlinks.pt/metodo/revenue-operations" rel="external">Revenue Operations</a><a href="https://www.smartlinks.pt/contactos" rel="external">Contact SmartLinks</a></div></div></div><div class="shell footer-bottom"><span>RevOpHubs is maintained by SmartLinks.</span><span>© 2026 SmartLinks</span></div></footer>`;
}

for (const file of htmlFiles(root)) {
  const isPt = file.includes(`${path.sep}pt${path.sep}`);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footer(isPt));
  html = html
    .replaceAll('Independent Revenue Operations research, practical frameworks and diagnostic tools for building a connected revenue system.', 'Practical Revenue Operations knowledge, frameworks and diagnostic tools from SmartLinks for building a connected revenue system.')
    .replaceAll('Investigação independente de Revenue Operations, modelos práticos e ferramentas de diagnóstico para construir um sistema de receita conectado.', 'Conhecimento de Revenue Operations, modelos práticos e ferramentas de diagnóstico da SmartLinks para construir um sistema de receita conectado.')
    .replaceAll('This foundation is informed by established practitioner and platform perspectives. RevOpHubs uses them as references while maintaining an independent operating-system view.', 'This foundation is informed by established practitioner and platform perspectives, interpreted through SmartLinks operating experience.')
    .replaceAll('Esta base foi informada por perspetivas estabelecidas de profissionais e plataformas. A RevOpHubs usa-as como referências, mantendo uma visão independente do sistema operativo.', 'Esta base foi informada por perspetivas estabelecidas de profissionais e plataformas, interpretadas através da experiência operacional da SmartLinks.')
    .replaceAll('This foundation is informed by established practitioner and platform perspectives. RevOpHubs uses them as reference points while maintaining an independent operating-system view.', 'This foundation is informed by established practitioner and platform perspectives, interpreted through SmartLinks operating experience.')
    .replaceAll('This foundation was informed by established practitioner and platform perspectives. RevOpHubs uses them as reference points while maintaining an independent operating-system view.', 'This foundation was informed by established practitioner and platform perspectives, interpreted through SmartLinks operating experience.')
    .replaceAll('href="https://www.linkedin.com/in/ruimartinsblog/" target="_blank" rel="noopener">Discuss the result</a>', 'href="https://www.smartlinks.pt/contactos" rel="external">Discuss the result with SmartLinks</a>')
    .replaceAll('href="https://www.linkedin.com/in/ruimartinsblog/" target="_blank" rel="noopener">Conversar sobre o resultado</a>', 'href="https://www.smartlinks.pt/contactos" rel="external">Conversar com a SmartLinks</a>');
  fs.writeFileSync(file, html);
}

const home = path.join(root, 'index.html');
fs.writeFileSync(home, fs.readFileSync(home, 'utf8').replace('<div class="eyebrow">Revenue Operations, made operational</div>', '<div class="eyebrow">Revenue Operations, made operational · A SmartLinks initiative</div>'));
const ptHome = path.join(root, 'pt/index.html');
fs.writeFileSync(ptHome, fs.readFileSync(ptHome, 'utf8').replace('<div class="eyebrow">Revenue Operations, na prática</div>', '<div class="eyebrow">Revenue Operations, na prática · Uma iniciativa SmartLinks</div>'));

console.log('Applied SmartLinks ownership and contact information to all HTML pages.');
