'use client';
import { useState } from 'react';
import axios from 'axios';

const Calculator: React.FC = () => {
    const [num1, setNum1] = useState<number | ''>('');
    const [num2, setNum2] = useState<number | ''>('');
    const [operator, setOperator] = useState<string>('+');
    const [result, setResult] = useState<string | null>(null);

    const handleCalculate = async () => {
        try {
            const response = await axios.post('http://localhost:3001/operation', {
                num1,
                num2,
                operator
            });
            setResult(`Result: ${response.data.result}`);
        } catch (error: any) {
            console.error('Calculation error:', error.response || error);
            const errorMessage = error.response?.data?.error || 'Invalid calculation';
            setResult(`Error: ${errorMessage}`);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px', backgroundColor: '#f0f2f5', height: '100vh' }}>
            <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
                placeholder="Enter first number"
                style={{ backgroundColor: '#ffffff', border: '2px solid #4CAF50', color: '#333' }}
            />
            <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                style={{ backgroundColor: '#4CAF50', color: '#fff' }}
            >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value))}
                placeholder="Enter second number"
                style={{ backgroundColor: '#ffffff', border: '2px solid #4CAF50', color: '#333' }}
            />
            <br /><br />
            <button
                onClick={handleCalculate}
                style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none' }}
            >
                Calculate
            </button>
            <br /><br />
            <div
                style={{
                    backgroundColor: '#e0f7fa',
                    color: '#00796B',
                    padding: '10px',
                    borderRadius: '6px',
                    display: 'inline-block'
                }}
            >
                {result}
            </div>
        </div>
    );
};

export default Calculator;

