// counter.js
document.addEventListener('DOMContentLoaded', function() {
    const NAMESPACE = 'kb2024'; // nome più corto e univoco
    const KEYS = ['visits', 'spotify', 'youtube', 'apple', 'amazon', 'soundcloud', 'deezer', 'instagram'];
    
    // Conta la visita
    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/visits`)
        .catch(error => console.error('Errore conteggio visite:', error));

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
                fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${platform}`)
                    .catch(error => console.error(`Errore conteggio ${platform}:`, error));
            });
        }
    });
});
