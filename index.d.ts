// Type definitions for alawmulaw 6.0.0
// Project: https://github.com/rochars/alawmulaw
// Definitions by: Rafael da Silva Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/alawmulaw

export module alaw {
    function decode(samples: Uint8Array): Int16Array;
    function decodeSample(sample: number): number;
    function encode(samples: Int16Array): Uint8Array;
    function encodeSample(sample: number): number;
}

export module mulaw {
    function decode(samples: Uint8Array): Int16Array;
    function decodeSample(sample: number): number;
    function encode(samples: Int16Array): Uint8Array;
    function encodeSample(sample: number): number;
}
