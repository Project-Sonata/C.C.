import {Track} from "../model/Track";


export function getSongsForUser(userId: string): Promise<Track[]> {
    const track: Track = {
        id: "123",
        name: 'water',
        author: {id: "1", name: "nihigo"},
        imageUrl: 'https://i1.sndcdn.com/artworks-1Ec6ifP1jlIu0IPE-tHDNTQ-t500x500.jpg',
        album: {
            id: '123',
            name: 'nihigo. Collection'
        },
        durationMs: 262000
    };
    const track2: Track = {
        id: "1234",
        name: 'I don\'t want to ask your father or anything',
        author: {id: "2", name: "Salvia Palth"},
        imageUrl: 'https://f4.bcbits.com/img/a0663846172_16.jpg',
        album: {
            id: '124',
            name: 'melanchole'
        },
        durationMs: 261000
    };

    const track3: Track = {
        id: "1235",
        name: 'Kairi I',
        author: {id: "3", name: "Federico Dubbichi"},
        imageUrl: 'https://i.pinimg.com/564x/b3/36/48/b336484801405671c616f02e7b3c0187.jpg',
        album: {
            id: '125',
            name: 'Kingdom Hearts OST'
        },
        durationMs: 79000
    };

    return Promise.all(
        [track, track2, track3,
            // track3, track2, track, track2, track2, track3, track2, track2, track3, track2, track2, track3, track2, track2, track3, track2, track2, track3, track2, track2, track3, track2, track2, track3]
        ]
    );
}