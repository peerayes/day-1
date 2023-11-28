//App.jsx
import { useState, useEffect } from 'react';
// import InputSection from './InputSection'; 
import TransactionList from './TransactionList';
import UserList from './UserList';
import './App.css';

const App = () => {
    const [transactions, setTransactions] = useState([]);

    const updateTransactions = (updatedTransactions) => {
        setTransactions(updatedTransactions);
    };

    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
        const currentDate = new Date().toLocaleDateString('en-US');
        localStorage.setItem('currentDate', currentDate);
    }, []);

    const addTransaction = (transaction) => {
        setTransactions([transaction, ...transactions]);
    };

    return (
        <main className='income-expense'>
            <UserList userName="Ryan" walletAmount={1234.56} />
            <TransactionList transactions={transactions} updateTransactions={updateTransactions} />
        </main>
    );
};

export default App;

