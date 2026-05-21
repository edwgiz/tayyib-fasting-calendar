import {i18n} from './i18n.js';

const d = document;

export async function renderFastingReasonSections(containerEl, i18nPrefix) {
  const hadithCollectionReferencing = (await i18n()).hadithReferencing.collections;
  const reasonsNode = await i18n(i18nPrefix);
  if (reasonsNode) {
    for (const reasonId in reasonsNode) {
      const reasonNode = reasonsNode[reasonId];
      const sectionEl = d.createElement('section');
      sectionEl.id = reasonId;
      sectionEl.classList.add('fasting-reason');
      if (reasonNode.title) {
        const titleEl = d.createElement('h4');
        titleEl.textContent = reasonNode.title;
        sectionEl.appendChild(titleEl);
      }
      const citesEl = d.createElement('ul');
      for (let citeNode of reasonNode.cites) {
        const citeEl = d.createElement('li');
        if (citeNode.intro) {
          citeEl.appendChild(d.createTextNode(citeNode.intro));
        }
        const qEl = d.createElement('q');
        qEl.textContent = citeNode.quote;
        citeEl.appendChild(qEl);
        for (let referenceNode of citeNode.references) {
          const referenceEl = d.createElement('blockquote');
          const aEl = d.createElement('a');
          aEl.target = '_blank';
          aEl.rel = 'noopener noreferrer';
          aEl.href = 'https://sunnah.com/' + referenceNode.collection + ':' + referenceNode.hadith;
          aEl.textContent = hadithCollectionReferencing[referenceNode.collection] + ' ' + referenceNode.hadith;
          referenceEl.appendChild(aEl);
          citeEl.appendChild(referenceEl);
        }
        citesEl.appendChild(citeEl);
      }
      sectionEl.appendChild(citesEl);
      containerEl.appendChild(sectionEl);
    }
  }
}
