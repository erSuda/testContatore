// counter.js
document.addEventListener('DOMContentLoaded', function() {
    const NAMESPACE = 'karmaboomerang';
    const KEY = 'stats';
    
    // Funzione per incrementare un contatore specifico
    async function incrementCounter(type) {
        try {
            const response = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}_${type}`);
            const data = await response.json();
            return data.value;
        } catch (error) {
            console.error(`Errore nel conteggio ${type}:`, error);
        }
    }

    // Conta la visita
    incrementCounter('visits');

    // Aggiungi listener per ogni piattaforma
    const platforms = {
        'spotify': 'https://open.spotify.com/track/7eEQUaMos4KiUACH5nGOh0',
        'youtube': 'https://music.youtube.com/watch?v=rw0SoESTsds',
        'apple': 'https://music.apple.com/us/album/karma-boomerang/1776829125',
        'amazon': 'https://music.amazon.it/albums/B0DLBHVWC2',
        'soundcloud': 'https://on.soundcloud.com/YAAprYRFV4re5hp49',
        'deezer': 'https://deezer.page.link/FWDPToZNo8ENXmgM7',
        'instagram': 'https://www.instagram.com/aleklj56/profilecard'
    };

    document.querySelectorAll('.platform-item').forEach(item => {
        const href = item.getAttribute('href');
        const platform = Object.entries(platforms).find(([_, url]) => href.includes(url))?.[0];
        
        if (platform) {
            item.addEventListener('click', () => {
                incrementCounter(platform);
            });
        }
    });
});
