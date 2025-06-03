/*
Author: Marco Padilla
Date: 05/26/2024
Filename: api.js
Supporting Files: index.html
Date Modified: 05/26/2024
*/

import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const base = 'https://www.deckofcardsapi.com/api';

// https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
export async function buildDeck (shuffle = true, count = 1) {
    try {
        const shuffled = shuffle ? 'shuffle/' : '';
        const deckURL = `${base}/deck/new/${shuffled}?deck_count=${count}`;

        const response = await axios.get(deckURL);

        return response.data;
    } catch (error) {
        return error;
    }
};

// https://www.deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
export async function drawCards (deckId, count) {
    try {
        const drawURL = `${base}/deck/${deckId}/draw/?count=${count}`;

        const response = await axios.get(drawURL);

        return response.data;
    } catch (error) {
        return error;
    }
};