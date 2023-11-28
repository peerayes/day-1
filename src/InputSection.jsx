//InputSection.jsx
import React, { useState, useEffect } from 'react';
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
    const [text, setText] = useState(''); // สร้าง state สำหรับข้อความ
    const [amount, setAmount] = useState(0); // สร้าง state สำหรับจำนวนเงิน
    const [type, setType] = useState('income'); // สร้าง state สำหรับประเภทของรายการ (รายรับ/รายจ่าย)
    const [id, setId] = useState('');
    useEffect(() => {
        const currentDate = new Date().toLocaleDateString('en-US');
        localStorage.setItem('currentDate', currentDate);
    }, []); // ใช้ useEffect ที่ถูกต้องเพื่อบันทึกวันที่ปัจจุบันเมื่อ component ถูกโหลดครั้งแรก

    const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    const onSubmit = (e) => { // ฟังก์ชันสำหรับการส่งข้อมูลเมื่อมีการ submit form
        e.preventDefault(); // หยุดการทำงานของการ submit แบบปกติ
        if (!text || !amount) { // ตรวจสอบว่า text หรือ amount ไม่มีค่า
            alert('Please enter a valid text and amount'); // แสดงแจ้งเตือนถ้าข้อมูลไม่ถูกต้อง
            return; // จบฟังก์ชัน
        }
        // สร้างธุรกรรมใหม่จากข้อมูลที่ได้รับจากฟอร์ม
        const newTransaction = {
            id: generateUniqueId(),
            text,
            amount: +amount,
            type,
            date: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) // วันที่และเวลา
        };
        // ดึงข้อมูลธุรกรรมทั้งหมดจาก localStorage และแปลงเป็นอาร์เรย์
        const storedTransactions = localStorage.getItem('transactions'); // ดึงข้อมูล transactions จาก local storage
        const parsedTransactions = storedTransactions ? JSON.parse(storedTransactions) : []; // แปลงข้อมูลที่ดึงมาเป็นอาร์เรย์ (หากไม่มีจะสร้างอาร์เรย์ใหม่)
        // เพิ่มธุรกรรมใหม่ไปยังอาร์เรย์ของธุรกรรมและบันทึกลงใน localStorage
        const updatedTransactions = [newTransaction, ...parsedTransactions]; // เปลี่ยนตำแหน่งการเพิ่ม transaction เข้าสู่อาร์เรย์
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions)); // บันทึกอาร์เรย์ transactions ใหม่ลงใน local storage
        // ส่งธุรกรรมใหม่ไปยังฟังก์ชัน onAddTransaction และล้างค่าของฟอร์ม
        onAddTransaction(newTransaction); // เรียกใช้ฟังก์ชัน onAddTransaction ที่ถูกส่งเข้ามาเพื่ออัปเดตสถานะของแอป
        setText(''); // รีเซ็ตค่าข้อความให้ว่าง
        setAmount(0); // รีเซ็ตค่าจำนวนเงินให้เป็น 0
        setId('');
    };
    return (
        <InputSectionWrapper>
            <header>
                <h2>บันทึกรายรับรายจ่าย</h2>
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

