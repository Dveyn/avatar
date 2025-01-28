import { useState } from 'react';
import { ModalCalc } from '@@/components/layout/Modal/ModalCalculator';
import { personalities } from '@@/utils/personality';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log(personalities);

  return (
    <div>
      { personalities.map(el => {
        return <>{ el.part.femaleTitle } { el.id } <br /></>;
      }) }
    </div>
  );
};

export default Page;
