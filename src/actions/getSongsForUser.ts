import {Track} from "../model/Track";


export function getSongsForUser(userId: string): Promise<Track[]> {
    const track: Track = {
        id: "123",
        name: 'water',
        author: {id: "1", name: "nihigo"},
        imageUrl: 'https://i1.sndcdn.com/artworks-1Ec6ifP1jlIu0IPE-tHDNTQ-t500x500.jpg'
    };
    const track2: Track = {
        id: "1234",
        name: 'I don\'t want to ask your father or anything' ,
        author: {id: "2", name: "Salvia Palth"},
        imageUrl: 'https://f4.bcbits.com/img/a0663846172_16.jpg'
    };

    return Promise.all(
        [track, track2]
    );
}