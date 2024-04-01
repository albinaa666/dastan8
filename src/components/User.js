import React, { useState } from 'react';

const errorUserConst =  {
    name: 'Имя',
    username:'Фамилия',
    email:'Email'
}
function FormWithState() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка обязательных полей
        const requiredFields = ['name', 'username', 'email'];
        const missingFields = requiredFields.filter(field => !formData[field]).map(item=>errorUserConst[item])
        if (missingFields.length > 0) {
            setErrorMessage(`Не все обязательные поля заполнены: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            console.log('Ответ сервера:', data); alert('Запрос успешно отправлен!')
        } catch (error) {
            console.error('Ошибка отправки данных:', error);
        }
    };

    return (
        <div>
            <h1>Форма с использованием useState</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Имя:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Фамилия:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Номер телефона:
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Веб-сайт:
                    <input type="text" name="website" value={formData.website} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Отправить</button>
            </form>
            {errorMessage && <p style={{color:"red",fontWeight:800}}>{errorMessage}</p>}
        </div>
    );
}

export default FormWithState;