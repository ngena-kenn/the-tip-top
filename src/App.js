import React, { useState } from 'react';

const SumComponent = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState(null);

  const handleSum = () => {
    setSum(num1 + num2);
  };

  return (
    <div>
      <h1>Calculer la somme de deux entiers</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(parseInt(e.target.value, 10))}
        placeholder="Premier entier"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(parseInt(e.target.value, 10))}
        placeholder="Deuxième entier"
      />
      <button onClick={handleSum}>Calculer</button>
      {sum !== null && <h2>La somme est : {sum}</h2>}
    </div>
  );
};

export default SumComponent;
