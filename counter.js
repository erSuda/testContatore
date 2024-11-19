// counter.js
document.addEventListener('DOMContentLoaded', function() {
    // ID univoco per il tuo sito
    const NAMESPACE = 'karmaboomerang';  // Puoi cambiarlo come preferisci
    
    // Conta le visite della pagina
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

    // Aggiungi il tracciamento per ogni link
    document.querySelectorAll('.platform-item').forEach(item => {
        const href = item.getAttribute('href');
        // Trova quale piattaforma è questa
        const platform = Object.entries(platforms).find(([_, url]) => href.includes(url))?.[0];
        
        if (platform) {
            item.addEventListener('click', () => {
                // Conta il click per questa specifica piattaforma
                fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${platform}_clicks`)
                    .catch(error => console.error(`Errore conteggio click ${platform}:`, error));
            });
        }
    });
});