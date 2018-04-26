/*
 alawmulaw
 JavaScript A-Law and mu-Law codecs.
 Copyright (c) 2018 Rafael da Silva Rocha.
 https://github.com/rochars/alawmulaw

*/
(function(f){function e(b){if(g[b])return g[b].exports;var a=g[b]={i:b,l:!1,exports:{}};f[b].call(a.exports,a,a.exports,e);a.l=!0;return a.exports}var g={};e.m=f;e.c=g;e.d=function(b,a,d){e.o(b,a)||Object.defineProperty(b,a,{configurable:!1,enumerable:!0,get:d})};e.n=function(b){var a=b&&b.__esModule?function(){return b["default"]}:function(){return b};e.d(a,"a",a);return a};e.o=function(b,a){return Object.prototype.hasOwnProperty.call(b,a)};e.p="";return e(e.s=0)})([function(f,e,g){window.alawmulaw=
{};window.alawmulaw.alaw=g(1);window.alawmulaw.mulaw=g(2)},function(f,e){function g(a){var d=[1,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],c;a=-32768==a?-32767:a;(c=~a>>8&128)||(a*=-1);32635<a&&(a=32635);256<=a?(d=d[a>>8&127],a=d<<4|a>>d+3&15):a>>=4;return a^c^85}function b(a){var d=0;a^=
85;a&128&&(a&=-129,d=-1);var c=((a&240)>>4)+4;a=4!=c?1<<c|(a&15)<<c-4|1<<c-5:a<<1|1;return-8*(0===d?a:-a)}f.exports.encodeSample=g;f.exports.decodeSample=b;f.exports.encode=function(a){for(var d=[],c=0;c<a.length;c++)d.push(g(a[c]));return d};f.exports.decode=function(a){for(var d=[],c=0;c<a.length;c++)d.push(b(a[c]));return d}},function(f,e){function g(a){if(0>a){a=132-a;var d=127}else a+=132,d=255;32767<a&&(a=32767);var c=0;var b=a>>7;b&240&&(b>>=4,c+=4);b&12&&(b>>=2,c+=2);b&2&&(c+=1);b=c;return(b<<
4|a>>b+3&15)^d}function b(a){a=~a;var b=((a&15)<<3)+132<<((a&112)>>4);return a&128?132-b:b-132}f.exports.encodeSample=g;f.exports.decodeSample=b;f.exports.encode=function(a){for(var b=[],c=0;c<a.length;c++)b.push(g(a[c]));return b};f.exports.decode=function(a){for(var d=[],c=0;c<a.length;c++)d.push(b(a[c]));return d}}]);
