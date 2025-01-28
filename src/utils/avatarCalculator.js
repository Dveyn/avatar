// utils/avatarCalculator.js
import { reduceToSingleDigit } from './numbers';

export const calculateAvatarData = (day, month, year, selectedGender, personalities) => {
    const dayNum = parseInt(day) || 0;
    const monthNum = parseInt(month) || 0;
    const yearNum = parseInt(year) || 0;

    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || !yearNum) {
        return null;
    }

    const A = reduceToSingleDigit(dayNum);
    const B = reduceToSingleDigit(monthNum);
    const V = reduceToSingleDigit(yearNum.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0));
    const G = reduceToSingleDigit(A + B + V);
    const D = reduceToSingleDigit(A + B + V + G);
    const K = reduceToSingleDigit(D + G);
    const L = reduceToSingleDigit(D + V);
    const M = reduceToSingleDigit(K + L);
    const N = reduceToSingleDigit(K + M);
    const B2 = reduceToSingleDigit(B + D);

    const personality = personalities[A - 1];
    const genderPart = selectedGender === 'man' ? 'male' : 'female';

    const resources = personality.resources ? personality.resources[`${genderPart}Resources`] || [] : [];
    const shadows = personality.shadow ? personality.shadow[`${genderPart}Shadow`] || [] : [];
    const recommendations = personality.recommendations ? personality.recommendations[`${genderPart}Recommendations`] || 'Рекомендации отсутствуют' : 'Рекомендации отсутствуют';
    const imageSrc = personality.part[`${genderPart}ImageSrc`] || 'images/default.png';
    const title = personality.part[`${genderPart}Title`] || 'Неизвестно';
    const description = personality.part[`${genderPart}Description`] || 'Описание отсутствует';

    return {
        resources,
        shadows,
        recommendations,
        imageSrc,
        title,
        description,
        A, B, V, G, D, K, L, M, N, B2 
    };
};
