import type { Hangulat } from './hangulat';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const API_URL = 'https://retoolapi.dev/XJ59XA/data';

document.addEventListener('DOMContentLoaded', () => {
    adatokBetoltese();
});

async function adatokBetoltese() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Invalid response')
    }

    const data = await response.json() as Hangulat[];

    const content = document.getElementById('content');
    for (const item of data) {
        const tr = document.createElement('tr');

        const tdHangulat = document.createElement('td');
        tdHangulat.textContent = item.hangulat;
        tr.appendChild(tdHangulat);

        const tdMegjegyzes = document.createElement('td');
        tdMegjegyzes.textContent = item.szoveges_leiras;
        tr.appendChild(tdMegjegyzes);

        const tdDatum = document.createElement('td');
        tdDatum.textContent = item.datum;
        tr.appendChild(tdDatum);

        content?.appendChild(tr);
    }
}