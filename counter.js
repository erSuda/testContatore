// counter.js
document.addEventListener('DOMContentLoaded', function() {
    const NAMESPACE = 'testcontatore';
    
    // Funzione per inizializzare o incrementare un contatore
    async function initOrHitCounter(key) {
        try {
            // Prima prova a ottenere il valore attuale
            const checkResponse = await fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${key}`);
            const checkData = await checkResponse.json();
            
            if (checkData.value === undefined) {
                // Se il contatore non esiste, crealo
                await fetch(`https://api.countapi.xyz/create?namespace=${NAMESPACE}&key=${key}&value=0`);
                console.log(`Contatore ${key} creato`);
            }
            
            // Incrementa il contatore
            const hitResponse = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${key}`);
            const hitData = await hitResponse.json();
            console.log(`${key} incrementato a: ${hitData.value}`);
            
        } catch (error) {
            console.error(`Errore con il contatore ${key}:`, error);
        }
    }

    // Conta la visita alla pagina
    initOrHitCounter('visits');

    // Mappa dei link delle piattaforme
    const platforms = {
        'spotify': 'https://open.spotify.com/track/7eEQUaMos4KiUACH5nGOh0',
        'youtube': 'https://music.youtube.com/watch?v=rw0SoESTsds',
        'apple': 'https://music.apple.com/us/album/karma-boomerang/1776829125',
        'amazon': 'https://music.amazon.it/albums/B0DLBHVWC2',
        'soundcloud': 'https://on.soundcloud.com/YAAprYRFV4re5hp49',
        'deezer': 'https://deezer.page.link/FWDPToZNo8ENXmgM7',
        'instagram': 'https://www.instagram.com/aleklj56/profilecard'
    };

    // Aggiungi listener per ogni piattaforma
    document.querySelectorAll('.platform-item').forEach(item => {
        const href = item.getAttribute('href');
        const platform = Object.entries(platforms).find(([_, url]) => href.includes(url))?.[0];
        
        if (platform) {
            // Inizializza il contatore per questa piattaforma
            fetch(`https://api.countapi.xyz/create?namespace=${NAMESPACE}&key=${platform}&value=0`)
                .catch(() => console.log(`Contatore ${platform} già esistente`));

            item.addEventListener('click', (e) => {
                // Previeni il comportamento di default temporaneamente
                e.preventDefault();
                
                // Incrementa il contatore
                initOrHitCounter(platform).then(() => {
                    // Dopo aver contato, reindirizza
                    window.location.href = href;
                });
            });
        }
    });
});
