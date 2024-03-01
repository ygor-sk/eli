interface KnxSwitch {
    type: "KnxSwitch"
    name: string,
    position: number
}

function knxSwitch(name: string, position: number): KnxSwitch {
    return {type: "KnxSwitch", name, position};
}

interface Sensor {
    type: "Sensor"
    name: string,
}

function sensor(name: string): Sensor {
    return {type: "Sensor", name};
}

interface Blinder {
    type: "Blinder",
    name: string,
    direction: "up" | "down"
}

function blinder(name: string, direction: Blinder['direction']): Blinder {
    return {type: "Blinder", name, direction};
}


interface Action {
    source: KnxSwitch | Sensor, // knxSwitch OR sensor
    targets: string[] | Blinder// light circuit OR special
}

function action(source: KnxSwitch | Sensor, target: string | string[] | Blinder): Action {
    if (Array.isArray(target)) {
        return {source, targets: target};
    }
    if (typeof target === "string") {
        return {source, targets: [target]};
    }
    if (target.type === "Blinder") {
        return {source, targets: target}
    }
    throw "Unsupported target: " + JSON.stringify(target);
}

export const actions: Action[] = [
    action(knxSwitch("Q101.1", 1), "E101.1"),
    action(knxSwitch("Q101.1", 2), "E101.2"),
    action(knxSwitch("Q101.1", 3), "Ee1.2"),
    action(knxSwitch("Q101.1", 4), "E106.4"),
    action(knxSwitch("Q101.3", 1), "Ee1.2"),
    action(knxSwitch("Q101.3", 2), "Zvoncek"),

    action(knxSwitch("Q102.1", 1), "E102.1"),
    action(knxSwitch("Q102.1", 2), "E105.1"),
    action(knxSwitch("Q102.1", 3), blinder("MZ102.1", "up")),
    action(knxSwitch("Q102.1", 4), blinder("MZ102.1", "down")),

    action(knxSwitch("Q104.2", 1), "E104.2"),
    action(knxSwitch("Q104.2", 2), "E104.1"),
    action(knxSwitch("Q104.2", 3), "E104.3"),
    action(knxSwitch("Q104.2", 4), ["Ee1.3", "Ee1.4", "Ee1.5"]),
    action(knxSwitch("Q104.2", 5), blinder("MZ104.2", "up")),
    action(knxSwitch("Q104.2", 6), blinder("MZ104.2", "down")),
    action(knxSwitch("Q104.2", 7), blinder("MZ104.1", "up")),
    action(knxSwitch("Q104.2", 8), blinder("MZ104.1", "down")),

    action(knxSwitch("Q104.3", 1), "E103.1"),
    action(knxSwitch("Q104.3", 2), "E104.3"),

    action(knxSwitch("Q105.1", 1), "E105.1"),
    action(knxSwitch("Q105.1", 2), "E104.2"),

    action(knxSwitch("Q106.1", 1), "E106.4"),
    action(knxSwitch("Q106.1", 2), "E202.1"),
    action(knxSwitch("Q106.1", 3), "E106.2"),
    action(knxSwitch("Q106.1", 4), "E107.1"),
    action(knxSwitch("Q106.1", 5), "E106.3"),
    action(knxSwitch("Q106.1", 6), "E101.1"),

    action(knxSwitch("Q106.2", 1), "E106.2"),
    action(knxSwitch("Q106.2", 2), "E106.1"),
    action(knxSwitch("Q106.2", 3), "E106.3"),
    action(knxSwitch("Q106.2", 4), ["Ee1.3", "Ee1.4", "Ee1.5"]),

    action(knxSwitch("Q106.3", 1), blinder("MZ106.4", "up")),
    action(knxSwitch("Q106.3", 2), blinder("MZ106.4", "down")),
    action(knxSwitch("Q106.3", 3), blinder("MZ106.3", "up")),
    action(knxSwitch("Q106.3", 4), blinder("MZ106.3", "down")),
    action(knxSwitch("Q106.3", 5), blinder("MZ106.1", "up")),
    action(knxSwitch("Q106.3", 6), blinder("MZ106.1", "down")),

    action(knxSwitch("Q106.4", 1), "E106.2"),
    action(knxSwitch("Q106.4", 2), "E106.1"),
    action(knxSwitch("Q106.4", 3), "E106.3"),
    action(knxSwitch("Q106.4", 4), "E106.4"),

    action(knxSwitch("Q106.5", 1), ["Ee1.3", "Ee1.4", "Ee1.5"]),

    action(knxSwitch("Q108.1", 1), "E108.1"),

    action(knxSwitch("Q109.1", 1), "E109.1"),
    action(knxSwitch("Q109.1", 2), "E109.2"),

    action(knxSwitch("Q110.1", 1), "E110.1"),

    action(sensor("P111"), "E111.1"),

    action(knxSwitch("Q112.1", 1), "E112.1"),
    action(knxSwitch("Q112.1", 2), "Ee1.6"),
    action(knxSwitch("Q112.1", 3), blinder("MZ112.1", "up")),
    action(knxSwitch("Q112.1", 4), blinder("MZ112.1", "down")),

    action(knxSwitch("Q112.2", 1), "E112.1"),
    action(knxSwitch("Q112.2", 2), "Ee1.6"),

    action(knxSwitch("Q112.3", 1), "Ee1.6"),
    action(knxSwitch("Q112.3", 2), "E112.1"),

    // garaz
    action(knxSwitch("Q113.1", 1), "E113.2"),
    action(knxSwitch("Q113.1", 2), "E113.1"),
    action(knxSwitch("Q113.1", 3), "E113.3"),
    action(knxSwitch("Q113.1", 4), "Brana - garaz"),

    action(knxSwitch("Q113.2", 1), "E113.2"),
    action(knxSwitch("Q113.2", 2), "E113.1"),
    action(knxSwitch("Q113.2", 3), "Brana - garaz"),
    action(knxSwitch("Q113.2", 4), "Brana - plot"),
    action(knxSwitch("Q113.2", 5), "Ee1.1"),
    action(knxSwitch("Q113.2", 6), "E113.3"),

    // chodba
    action(knxSwitch("Q202.1", 1), "E202.1"),
    action(knxSwitch("Q202.2", 1), "E202.1"),
    action(sensor("P202.1"), "E202.2"),

    // wc
    action(knxSwitch("Q207.1", 1), "E207.1"),

    // kupelna
    action(knxSwitch("Q208.1", 1), "E208.1"),
    action(knxSwitch("Q208.1", 2), "E208.2"),

    // spalna
    action(knxSwitch("Q203.1", 1), "E203.1"),
    action(knxSwitch("Q203.1", 2), ["E203.2", "E203.3"]),
    action(knxSwitch("Q203.1", 3), blinder("MZ203.1", "up")),
    action(knxSwitch("Q203.1", 4), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

    action(knxSwitch("xxxx", 1), "xxxxxx"),

]