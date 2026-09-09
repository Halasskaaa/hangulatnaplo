import type { Hangulat, UjHangulat } from './hangulat';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const API_URL = 'https://retoolapi.dev/XJ59XA/data';

document.addEventListener('DOMContentLoaded', () => {
    adatokBetoltese();

    document.getElementById('ujHangulat')?.addEventListener('submit', newData);
});

async function adatokBetoltese() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Invalid response')
    }

    const data = await response.json() as Hangulat[];

    const content = document.getElementById('content');
    content!.innerHTML = '' // pay attention to this next time
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

        //Módosítás
        const tdEdit = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = '✏️';

        // editButton.onclick = () => {
        //     document.getElementById("inputDatum");
        // }

        tdEdit.append(editButton);
        tr.appendChild(tdEdit);

        // Törlés
        const tdDelete = document.createElement('td');
        const delButton = document.createElement('button');
        delButton.textContent = '❌';
        delButton.addEventListener('click', async () => {
            await fetch(`${API_URL}/${item.id}`, {
                method: 'DELETE'
            });
            adatokBetoltese();
        });
        tdDelete.append(delButton);
        tr.appendChild(tdDelete);
        //

        content?.appendChild(tr);
    }
}

async function newData(e: SubmitEvent) {
    e.preventDefault();
    const urlap = document.getElementById('ujHangulat') as HTMLFormElement;
    const adat = new FormData(urlap);

    const newData: UjHangulat =  {
        datum: adat.get('datum')!.toString(),
        hangulat: adat.get('hangulat')!.toString(),
        szoveges_leiras: adat.get('megjegyzes')!.toString()
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Invalid response')
    }
    urlap.reset();
    adatokBetoltese();
}
