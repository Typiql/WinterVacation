import { api } from "./Api.js";

async function populateCards() {
    try {
        const data = await api.getResortData();
        console.log('Fetched Resort Data', data);
    } catch (error) {
        console.error('Error fetching resort data:', error);
    }
}

populateCards();