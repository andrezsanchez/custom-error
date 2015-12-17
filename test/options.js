'use strict';

var test = require('tape')
var error = require('../')

test('params', function(t) {
    t.plan(3)

    var MyError = error('MyError', Error, {params: ['test']})

    try {
        throw MyError('testing','faffy')
    }
    catch (err) {
        t.equals(err.name, 'MyError', 'should set error name correctly')
        t.equals(err.message, 'faffy', 'should set error message correctly')
        t.equals(err.test, 'testing', 'should set custom parameter correctly')
    }
})

test('params without message', function(t) {
    t.plan(3)

    var MyError = error('MyError', Error, {params: ['test']})

    try {
        throw MyError('testing','')
    }
    catch (err) {
        t.equals(err.name, 'MyError', 'should set error name correctly')
        t.equals(err.message, '', 'should set error message correctly')
        t.equals(err.test, 'testing', 'should set custom parameter correctly')
    }
})

test('params without message', function(t) {
    t.plan(4)

    var MyError = error('MyError', Error, {params: ['test', 'test2']})

    try {
        throw MyError('testing',undefined,'messageme')
    }
    catch (err) {
        t.equals(err.name, 'MyError', 'should set error name correctly')
        t.equals(err.message, 'messageme', 'should set error message correctly')
        t.equals(err.test, 'testing', 'should set parameter correctly')
        t.equals(err.test2, undefined, 'should set parameter correctly')
    }
})

test('properties', function(t) {
    t.plan(3)

    var MyError = error('MyError', Error, {props: {code: '500'}})

    try {
        throw MyError('faffy')
    }
    catch (err) {
        t.equals(err.name, 'MyError', 'should set error name correctly')
        t.equals(err.message, 'faffy', 'should set error message correctly')
        t.equals(err.code, '500', 'should set custom property correctly')
    }
})

