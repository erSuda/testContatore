// counter.js
document.addEventListener('DOMContentLoaded', function() {
    const NAMESPACE = 'testcontatore'; // namespace più specifico per il tuo sito
    
    // Conta la visita alla pagina
    fetch(`https://api.countapi.xyz/create?namespace=${NAMESPACE}&key=visits&value=0`, {
        method: 'GET'
    }).catch(() => {
        // Se il contatore esiste già, incrementalo
        fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/visits`)
            .catch(error => console.error('Errore conteggio visite:', error));
    });

    // Configura i contatori per ogni piattaforma prima di usarli
    const platforms = {
        'spotify': 'https://open.spotify.com/track/7eEQUaMos4KiUACH5nGOh0',
        'youtube': 'https://music.youtube.com/watch?v=rw0SoESTsds',
        'apple': 'https://music.apple.com/us/album/karma-boomerang/1776829125',
        'amazon': 'https://music.amazon.it/albums/B0DLBHVWC2',
        'soundcloud': 'https://on.soundcloud.com/YAAprYRFV4re5hp49',
        'deezer': 'https://deezer.page.link/FWDPToZNo8ENXmgM7',
        'instagram': 'https://www.instagram.com/aleklj56/profilecard'
    };

    // Inizializza i contatori per ogni piattaforma
    Object.keys(platforms).forEach(platform => {
        fetch(`https://api.countapi.xyz/create?namespace=${NAMESPACE}&key=${platform}&value=0`, {
            method: 'GET'
        }).catch(() => {
            // Se esiste già, non fare nulla
            console.log(`Contatore ${platform} già esistente`);
        });
    });

    // Aggiungi listener per ogni piattaforma
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
