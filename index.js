'use strict';

const { createStore } = Redux;

console.log('Starting Banking app for multiple accounts');

const ACTION_DEPOSIT = 'deposit';
const ACTION_WITHDRAW = 'withdraw';

// Actions
const defaultState = {
    checking: 100,
    savings: 100
};

(() => {
    const checkingBalance = document.querySelector('#checkingBalance');
    const savingsBalance = document.querySelector('#savingsBalance');
    checkingBalance.innerHTML = defaultState.checking;
    savingsBalance.innerHTML = defaultState.savings;
})();

function createDeposit (account, amount) {
    return {
        type: ACTION_DEPOSIT,
        payload: {
            account,
            amount
        }
    }
};

function createWithdraw (account, amount) {
    return {
        type: ACTION_WITHDRAW,
        payload: {
            account,
            amount
        }
    }
};

// Reducer

function accounts(state=defaultState, action) {
    console.log('this is my action:', action);
    console.log('this is my state:', state);
    switch (action.type) {
        case ACTION_DEPOSIT:
            return {
                ...state,
                [action.payload.account]: state[action.payload.account] + action.payload.amount
            };
        case ACTION_WITHDRAW:
            return {
                ...state,
                [action.payload.account]: state[action.payload.account] - action.payload.amount
            };
        default:
            return state;
    }
};

// Redux Store

const store = createStore(accounts, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log('===state has been updated===');
    const state = store.getState();
    console.log('this is the state:', state);
    const checkingBalance = document.querySelector('#checkingBalance');
    const savingsBalance = document.querySelector('#savingsBalance');
    checkingBalance.innerHTML = state.checking;
    savingsBalance.innerHTML = state.savings;
    amountDeposit.value = null;
    amountWithdraw.value = null;
});

const savingsDepositButton = document.querySelector('#savingsDeposit');
const checkingDepositButton = document.querySelector('#checkingDeposit');
const checkingWithdrawButton = document.querySelector('#checkingWithdraw');
const savingsWithdrawButton = document.querySelector('#savingsWithdraw');
const amountDeposit = document.querySelector('#amountDeposit');
const amountWithdraw = document.querySelector('#amountWithdraw');

checkingDepositButton.addEventListener('click', (event) => {
    event.preventDefault();
    const amountValue = parseInt(amountDeposit.value);
    console.log(amountValue);
    store.dispatch(createDeposit('checking', amountValue));
});

savingsDepositButton.addEventListener('click', (event) => {
    event.preventDefault();
    const amountValue = parseInt(amountDeposit.value);
    console.log(amountValue);
    store.dispatch(createDeposit('savings', amountValue));
});

checkingWithdrawButton.addEventListener('click', (event) => {
    event.preventDefault();
    const amountValue = parseInt(amountWithdraw.value);
    console.log(amountValue);
    store.dispatch(createWithdraw('checking', amountValue));
});

savingsWithdrawButton.addEventListener('click', (event) => {
    event.preventDefault();
    const amountValue = parseInt(amountWithdraw.value);
    console.log(amountValue);
    store.dispatch(createWithdraw('savings', amountValue));
});