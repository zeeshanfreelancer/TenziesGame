import React, { useState, useEffect } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function Index() {
    const [dice, setDice] = useState(generateAllNewDice());
    const [rollCount, setRollCount] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);

    useEffect(() => {
        let timer;
        if (isRunning && !gameWon) {
            timer = setInterval(() => setTime(prev => prev + 1), 1000);
        } else if (gameWon) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, gameWon]);

    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }));
    }

    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die => (die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) })));
            setRollCount(prev => prev + 1);
            if (!isRunning) setIsRunning(true);
        } else {
            setDice(generateAllNewDice());
            setRollCount(0);
            setTime(0);
            setIsRunning(false);
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die => (die.id === id ? { ...die, isHeld: !die.isHeld } : die)));
    }

    return (
        <main>
            {gameWon && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="stats">
                <p>Rolls: {rollCount}</p>
                <p>Time: {time}s</p>
            </div>
            <div className="dice-container">
                {dice.map(die => (
                    <Die key={die.id} value={die.value} isHeld={die.isHeld} hold={() => hold(die.id)} />
                ))}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {gameWon ? 'New Game' : 'ROLL'}
            </button>
        </main>
    );
}