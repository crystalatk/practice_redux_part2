'use strict';

const { createStore } = Redux;

const defaultState = {
    checking: 100,
    savings: 100
};

const actionDepositChecking = {
    type: 'deposit-checking',
    payload: 'checking'
};