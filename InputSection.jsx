//InputSection.jsx
import { useState } from 'react';
import styled from 'styled-components';

const InputSectionWrapper = styled.div`
    header {
        text-align: center;
        margin-bottom: 20px;
        h2 {
            font-size: 24px;
            margin-bottom: 5px;
        }
        p {
            font-size: 14px;
            color: #666;
            margin: 0;
        }
    }
    form {
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    
        .form-section {
            margin-bottom: 16px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
    
    label {
        font-size: 16px;
        display: block;
        margin-bottom: 5px;
    }
    
    input,
    select {
        width: 100%;
        max-width: 160px;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    
    button {
        width: 100%;
        padding: 10px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    
        &:hover {
        background-color: #2980b9;
        }
    }
`;

const InputSection = ({ onAddTransaction }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('income');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text || !amount) {
            alert('Please enter a valid text and amount');
            return;
        }
        const newTransaction = {
            text,
            amount: +amount,
            type,
            date: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
        };
        const storedTransactions = localStorage.getItem('transactions');
        const parsedTransactions = storedTransactions ? JSON.parse(storedTransactions) : [];
        const updatedTransactions = [...parsedTransactions, newTransaction];
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        onAddTransaction(newTransaction);
        setText('');
        setAmount(0);
    };

    return (
        <InputSectionWrapper>
            <header>
                <h2>Income & Expense</h2>
                <p>บันทึกรายรับรายจ่าย</p>
            </header>
            <form onSubmit={onSubmit}>
                <div className='form-section'>
                    <label>รายการ</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="รายการ"/>
                </div>
                <div className='form-section'>
                    <label>จำนวนเงิน</label>
                    <input type="number" inputMode="numeric" pattern="[0-9]*" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="จำนวนเงิน"/>
                </div>
                <div className='form-section'>
                    <label>รายรับ / รายจ่าย</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">รายรับ</option>
                        <option value="expense">รายจ่าย</option>
                    </select>
                </div>
                <button>บันทึกธุรกรรม</button>
            </form>
        </InputSectionWrapper>
    );
};

export default InputSection;

