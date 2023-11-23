import { useState, useEffect } from 'react';
import InputSection from './InputSection';
import TransactionList from './TransactionList';
import './App.css';

const App = () => {
    const [transactions, setTransactions] = useState([]);

    // Function to update transactions in the app state
    const updateTransactions = (updatedTransactions) => {
        setTransactions(updatedTransactions);
    };

    useEffect(() => {
        // Retrieve transactions from local storage when component mounts
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    }, []);

    const addTransaction = (transaction) => {
        setTransactions([transaction, ...transactions]);
    };

    return (
        <div>
            <InputSection onAddTransaction={addTransaction} />
            <TransactionList transactions={transactions} updateTransactions={updateTransactions} />
        </div>
    );
};

export default App;
