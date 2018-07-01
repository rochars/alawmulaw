// Type definitions for alawmulaw 5.0
// Project: https://github.com/rochars/alawmulaw
// Definitions by: Rafael S. Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/alawmulaw

export = alawmulaw;

declare const alawmulaw: {
    alaw: {
        decode(samples: Uint8Array): Int16Array;
        decodeSample(sample: number): number;
        encode(samples: Int16Array): Uint8Array;
        encodeSample(sample: number): number;
    };
    mulaw: {
        decode(samples: Uint8Array): Int16Array;
        decodeSample(sample: number): number;
        encode(samples: Int16Array): Uint8Array;
        encodeSample(sample: number): number;
    };
};
