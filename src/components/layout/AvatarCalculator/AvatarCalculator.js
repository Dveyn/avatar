import { useState } from 'react';
import { calculateAvatarData } from '@@/utils/avatarCalculator';
import { personalities } from '@@/utils/personality'

const AvatarCalculator = () => {
    const [selectedGender, setSelectedGender] = useState(null);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [result, setResult] = useState(null);

    const selectGender = (gender) => {
        setSelectedGender(gender);
    };

    const calculateAvatar = () => {
        const resultData = calculateAvatarData(day, month, year, selectedGender, personalities);
        if (resultData) {
            setResult(resultData);
            console.log(resultData)
        } else {
            alert('Пожалуйста, введите корректные данные.');
        }
    };

    return (
        <div>
            <div>
                <input type="number" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" />
                <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" />
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" />
                <div>
                    <button onClick={() => selectGender('man')}>Man</button>
                    <button onClick={() => selectGender('woman')}>Woman</button>
                </div>
                <button onClick={calculateAvatar}>Calculate Avatar</button>
            </div>

            {result && (
                <div>
                    <h1>{result.title}</h1>
                    <img src={result.imageSrc} alt="Avatar" />
                    <p>{result.description}</p>
                    <h3>Resources</h3>
                    <ul>
                        {result.resources.map((resource, index) => (
                            <li key={index}>{resource}</li>
                        ))}
                    </ul>
                    <h3>Shadows</h3>
                    <ul>
                        {result.shadows.map((shadow, index) => (
                            <li key={index}>{shadow}</li>
                        ))}
                    </ul>
                    <h3>Recommendations</h3>
                    <p>{result.recommendations}</p>
                </div>
            )}
        </div>
    );
};

export default AvatarCalculator;
