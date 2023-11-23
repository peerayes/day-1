//TransactionList.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TransactionList = ({ transactions, updateTransactions }) => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        const income = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
        const expense = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
        setTotalIncome(income);
        setTotalExpense(expense);
    }, [transactions]);

    const totalToday = totalIncome - totalExpense;

    const handleDelete = (index) => {
        const updatedTransactions = [...transactions];
        updatedTransactions.splice(index, 1);
        updateTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };

    const currentDate = localStorage.getItem('currentDate');

    return (
        <div>
            <h2>ประวัติการทำรายการ</h2>
            <p>วันที่ {currentDate}</p>
            <p>{totalToday} บาท</p>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} className={transaction.type}>
                        {transaction.type === 'income' ? '+' : '-'} {transaction.text} {transaction.amount} บาท
                        <br />
                        <small>{transaction.date}</small>
                        <button onClick={() => handleDelete(index)}>ลบ</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
TransactionList.propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        date: PropTypes.string,
    })).isRequired,
    updateTransactions: PropTypes.func.isRequired,
};
export default TransactionList;