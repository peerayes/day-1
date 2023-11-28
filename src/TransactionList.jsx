//TransactionList.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputSection from './InputSection';
import './assets/css/TransactionListStyles.css';
import './assets/css/modal.css';
const TransactionList = ({ transactions, updateTransactions, generateUniqueId }) => { //รับ props transactions และ updateTransactions
    const [totalIncome, setTotalIncome] = useState(0); // สร้าง state สำหรับ totalIncome
    const [totalExpense, setTotalExpense] = useState(0); // สร้าง state สำหรับ totalExpense
    useEffect(() => { // Effect hook เมื่อ transactions มีการเปลี่ยนแปลง
        const income = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
        const expense = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
        setTotalIncome(income);// อัปเดตค่า totalIncome
        setTotalExpense(expense);// อัปเดตค่า totalExpense
    }, [transactions]);// กำหนด dependencies เป็น [transactions] เพื่อให้ useEffect เรียกใช้งานเมื่อ transactions เปลี่ยนแปลง
    const totalToday = totalIncome - totalExpense;

    // ฟังก์ชัน handleDelete ใช้สำหรับลบ transaction และอัพเดต transactions ใน localStorage และ state
    // const handleDelete = (index) => {
    //     const updatedTransactions = [...transactions];
    //     updatedTransactions.splice(index, 1);// ลบ transaction จากอาร์เรย์
    //     updateTransactions(updatedTransactions);// เรียกใช้ฟังก์ชัน updateTransactions เพื่ออัปเดต transactions ในสถานะ
    //     localStorage.setItem('transactions', JSON.stringify(updatedTransactions)); // บันทึก transactions ลงใน local storage
    // };
    const handleDelete = (idToDelete) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== idToDelete);
        updateTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    };

    // ดึงวันที่ปัจจุบันจาก localStorage หรือกำหนดค่าเป็น 'No date available' หากไม่มีข้อมูล
    const currentDateFromStorage = localStorage.getItem('currentDate'); // ดึงวันที่ปัจจุบันจาก local storage
    const currentDate = currentDateFromStorage || 'No date available';
    
    const sortedTransactions = [...transactions].sort((a, b) => { // เรียงลำดับ transactions ตามวันที่ล่าสุด
        return new Date(b.date) - new Date(a.date); // ให้ธุรกรรมที่มีวันที่ใหม่กว่าอยู่ด้านบน โดยใช้ new Date() เพื่อแปลงเป็นวัตถุวันที่
    });
    sortedTransactions.reverse();
    // State เพื่อควบคุมการแสดง modal และ InputSection
    const [showModal, setShowModal] = useState(false);
    const addTransaction = (transaction) => {
        const updatedTransactions = [transaction, ...transactions];
        updateTransactions(updatedTransactions);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        closeModal();
    };
    // Function เพื่อเปิด modal เพื่อแสดง InputSection
    const openModal = () => {
        setShowModal(true);
    };
    // Function เพื่อปิด modal
    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className="transactionList">
            <div className='totaltoday'>{totalToday} บาท</div>
            <header>
                <h2>รายการวันที่ {currentDate}</h2>
                <button>All</button>
            </header>
            <ul className="transactionItem">
                {sortedTransactions.map((transaction, index) => (
                    <li key={index} className={transaction.type}>
                        <time dateTime=""><small>{transaction.date}</small></time>
                        <div>{transaction.type === 'income' ? '+' : '-'} {transaction.text}</div>
                        <div>{transaction.amount} บาท</div>
                        {/* <button onClick={() => handleDelete(index)}>x</button> */}
                        <button onClick={() => handleDelete(transaction.id)}>x</button>
                    </li>
                )).reverse()} {/* ใช้ reverse() เพื่อให้ธุรกรรมล่าสุดอยู่ด้านบน */}
            </ul>
            <button onClick={() => setShowModal(true)}>Open Modal</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <InputSection onAddTransaction={addTransaction} closeModal={closeModal}/>
                    </div>
                </div>
            )}
            
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





