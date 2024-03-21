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
        durationMs: 262000,
        context: "sonata:track:123"
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
        durationMs: 261000,
        context: "sonata:track:1234"
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
        durationMs: 79000,
        context: "sonata:track:1235"
    };
 const track4: Track = {
        id: "1236",
        name: 'Yuri Yuri Yara Yara',
        author: {id: "4", name: "Mikami Shiori"},
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/YuruYuri_vol_1.jpg/220px-YuruYuri_vol_1.jpg',
        album: {
            id: '126',
            name: 'Yuru yuri OST'
        },
        durationMs: 230000,
        context: "sonata:track:1236"
    };

 const track5: Track = {
        id: "1237",
        name: 'LOOK AT ME',
        author: {id: "5", name: "credske"},
        imageUrl: 'https://i1.sndcdn.com/artworks-TEneNO5KdnBx3nHr-UMJkUQ-t500x500.jpg',
        album: {
            id: '126',
            name: 'LOOK AT ME'
        },
        durationMs: 184000,
        context: "sonata:track:1237"
    };

 const track6: Track = {
        id: "1238",
        name: 'society (slowed reverb)',
        author: {id: "6", name: "pathetic "},
        imageUrl: 'https://i.pinimg.com/originals/90/29/a2/9029a2eafc1b93fdb11241b57ba56d38.jpg',
        album: {
            id: '127',
            name: 'society (slowed reverb)'
        },
        durationMs: 184000,
        context: "sonata:track:1238"
    };

 const track7: Track = {
        id: "1239",
        name: 'Play with me!',
        author: {id: "8", name: "Tomoya Hinata"},
        imageUrl: 'https://i.pinimg.com/736x/17/7b/fa/177bfaddb7aba5bfeef9ab52f0095d54.jpg',
        album: {
            id: '128',
            name: 'Play with me!'
        },
        durationMs: 184000,
        context: "sonata:track:1238"
    };

    return Promise.all(
        [track, track2, track3, track4, track5, track6, track7
            // track3, track2, track, track2, track2, track3, track2, track2, track3, track2, track2, track3, track2, track2, track3, track2, track2, track3, track2, track2, track3, track2, track2, track3]
        ]
    );
}