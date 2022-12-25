import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//Client um Backend (Sanity) zu kommunizieren
//Alle Daten sind im Sanity Manager
export const client =  sanityClient({
    projectId: 'ow2z89ks', //Sanity weißt welches Projekt es sich connecten soll
    dataset: 'production', //Man weißt, ob man in Development oder Production ist
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN //Siehe .env
});

const builder = imageUrlBuilder(client); //Sanity gibt uns Access zu den Bildern

export const urlFor = (source) => builder.image(source);