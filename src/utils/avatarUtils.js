export const reduceToSingleDigit = (number) => {
  while (number > 22) {
    number = number
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return number;
};

export const calculateAvatarData = (day, month, year, gender) => {
  const A = reduceToSingleDigit(day);
  const B = reduceToSingleDigit(month);
  const V = reduceToSingleDigit(
    year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0)
  );
  const G = reduceToSingleDigit(A + B + V);
  const D = reduceToSingleDigit(A + B + V + G);
  const K = reduceToSingleDigit(D + G);
  const L = reduceToSingleDigit(D + V);
  const M = reduceToSingleDigit(K + L);
  const N = reduceToSingleDigit(K + M);
  const B2 = reduceToSingleDigit(B + D);

  return { A, B, V, G, D, K, L, M, N, B2 };
};

export const createAvatarCard = (id, point) => {
  const imageSrc = `/images/avatar${point}.png`; // Здесь добавь свою логику для загрузки изображений
  const buttonText = id === 'point-A' ? 'бесплатно' : 'купить';
  const buttonAction = id === 'point-A' ? `showPointAModal(${point})` : '';

  return `
    <div class="card" id="${id}">
      <div class="block-images"><img src="${imageSrc}" alt="avatar"></div>
      <div class="button">
        <p class="text-button"><input type="button" value="${buttonText}" onclick="${buttonAction}"></p>
      </div>
    </div>
  `;
};
