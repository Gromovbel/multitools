import React, { useEffect, useReducer } from 'react';

const countReducer = (state, { type }) => {
    switch (type) {
        case 'START':
            return { ...state, isCounting: true };
        case 'STOP':
            return { ...state, isCounting: false };
        case 'RESET':
            return { count: 0, isCounting: false };
        case 'TICK':
            return { ...state, count: state.count + 1 };
        default:
            return state;
    }
};

function setDefaultValue() {
    const userCount = localStorage.getItem('count');
    return userCount ? +userCount : 0;
}

function Timer() {
    const [{ count, isCounting }, dispatch] = useReducer(countReducer, {
        count: setDefaultValue(),
        isCounting: false,
    });

    useEffect(() => {
        localStorage.setItem('count', count);
    }, [count]);

    useEffect(() => {
        let timerId = null;
        if (isCounting) {
            timerId = setInterval(() => {
                dispatch({ type: 'TICK' });
            }, 1000);
        }

        return () => {
            timerId && clearInterval(timerId);
        };
    }, [isCounting]);

    return (
        <div className='timer-container'>
            <h2>Timer</h2>
            <h3>{count}</h3>
            <button className='btn' onClick={() => dispatch({ type: isCounting ? 'STOP' : 'START' })}>
                {isCounting ? 'Stop' : 'Start'}
            </button>
            <button className='btn' onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </div>
    );
}

export { Timer };