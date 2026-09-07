import type { Hangulat } from './hangulat';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const API_URL = 'https://retoolapi.dev/XJ59XA/data';

document.addEventListener('DOMContentLoaded', () => {
    adatokBetoltese();
});

async function adatokBetoltese() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Hiba a szerverről történő adatlekérés során');
        }
        const adatok: Hangulat[] = await response.json();
        console.log(adatok);
    } catch (error) {
        console.error('Hiba történt az adatok betöltésekor:', error);
    }
}