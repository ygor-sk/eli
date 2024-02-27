interface Actor {
    name: string,
    circuits: string[]
}

export function actor(name: string, circuits: string | string[]): Actor {
    if (Array.isArray(circuits)) {
        return {name, circuits};
    } else {
        return {name, circuits: [circuits]};
    }
}

export const actors: Actor[] = [
    // A3
    actor("A3A", ["E101.1"]),
    actor("A3B", []),
    actor("A3C", ["E102.1"]),
    actor("A3D", []),
    actor("A3E", ["E104.1"]),
    actor("A3F", ["E104.2"]),
    actor("A3G", ["E104.3"]),
    actor("A3H", ["E105.1"]),

    actor("A3a", ["E106.1"]),
    actor("A3b", ["E206.2"]),
    actor("A3c", ["E106.3"]),
    actor("A3d", []),
    actor("A3e", ["E107.1"]),
    actor("A3f", ["E108.1"]),
    actor("A3g", ["E110.1"]),
    actor("A3h", []),

    // A4
    actor("A4A", ["E111.1"]),
    actor("A4B", ["E112.1"]),
    actor("A4C", ["E113.1"]),
    actor("A4D", []),
    actor("A4E", []),
    actor("A4F", []),
    actor("A4G", ["E202.1"]),
    actor("A4H", ["E202.2"]),

    actor("A4a", ["E203.1"]),
    actor("A4b", ["E203.2"]),
    actor("A4c", ["E203.3"]),
    actor("A4d", ["E204.1"]),
    actor("A4e", ["E204.2"]),
    actor("A4f", ["E301.1"]),
    actor("A4g", ["E207.1"]),
    actor("A4h", ["E209.1"]),

    // A5
    actor("A5A", ["E205.1"]),
    actor("A5B", ["E205.2"]),
    actor("A5C", []),
    actor("A5D", []),
    actor("A5E", []),
    actor("A5F", []),
    actor("A5G", []),
    actor("A5H", []),

    actor("A5a", []),
    actor("A5b", []),
    actor("A5c", []),
    actor("A5d", []),
    actor("A5e", []),
    actor("A5f", []),
    actor("A5g", []),
    actor("A5h", []),


]