var assert = require('assert'),
    increment = require('../version-incrementer').increment,
    incrementMajor = require('../version-incrementer').incrementMajor;

describe('version-incrementer', function() {
    describe('#basic', function() {
        it('should increment the build number and leave major and minor untouched', function() {
            var ver = '0.0.1';
            var newVer = increment(ver);
            var terms = newVer.split('.');
            assert.strictEqual(terms.length, 3);
            assert.strictEqual(terms[0], '0');
            assert.strictEqual(terms[1], '0');
            assert.strictEqual(terms[2], '2');
        });
        it('should wrap the build number after 9 and increment the minor number, leaving the major number untouched', function() {
            var ver = '0.0.9';
            var newVer = increment(ver);
            var terms = newVer.split('.');
            assert.strictEqual(terms.length, 3);
            assert.strictEqual(terms[0], '0');
            assert.strictEqual(terms[1], '1');
            assert.strictEqual(terms[2], '0');
        });
        it('should not wrap the minor number', function() {
            var ver = '0.9.9';
            var newVer = increment(ver);
            var terms = newVer.split('.');
            assert.strictEqual(terms.length, 3);
            assert.strictEqual(terms[0], '0');
            assert.strictEqual(terms[1], '10');
            assert.strictEqual(terms[2], '0');
        });
    });
    describe('#major', function() {
        it('should reset build and minor numbers when incrementing major number', function() {
            var ver = '0.9.9';
            var newVer = incrementMajor(ver);
            var terms = newVer.split('.');
            assert.strictEqual(terms.length, 3);
            assert.strictEqual(terms[0], '1');
            assert.strictEqual(terms[1], '0');
            assert.strictEqual(terms[2], '0');
        });
    });
});