
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { ethers } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
// import InsuranceContractABI from './contracts/InsuranceContractABI.json'; // Replace with the path to your InsuranceContract ABI

// const App = () => {
//   const [premium, setPremium] = useState('');
//   const [coverageAmount, setCoverageAmount] = useState('');
//   const [contract, setContract] = useState(null);
//   const [insurer, setInsurer] = useState('');
//   const [policyHolder, setPolicyHolder] = useState('');
//   const [isPolicyActive, setIsPolicyActive] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'; // Replace with the actual contract address of your InsuranceContract

//   useEffect(() => {
//     const initializeProvider = async () => {
//       const provider = await detectEthereumProvider();

//       if (provider) {
//         const web3Provider = new ethers.providers.Web3Provider(provider);
//         const signer = web3Provider.getSigner();
//         setContract(new ethers.Contract(contractAddress, InsuranceContractABI.abi, signer));
//         setIsLoading(false);
//       } else {
//         console.error('Please install MetaMask to interact with the wallet.');
//       }
//     };

//     initializeProvider();
//   }, []);

//   const purchasePolicy = async () => {
//     if (premium && coverageAmount && contract) {
//       try {
//         const tx = await contract.purchasePolicy({ value: premium });
//         await tx.wait();
//         alert('Policy purchased successfully.');
//         setPremium('');
//         setCoverageAmount('');
//         updateContractState();
//       } catch (error) {
//         console.error('Error purchasing policy:', error);
//       }
//     }
//   };

//   const makeClaim = async () => {
//     if (contract) {
//       try {
//         const tx = await contract.makeClaim();
//         await tx.wait();
//         alert('Claim made successfully.');
//         updateContractState();
//       } catch (error) {
//         console.error('Error making claim:', error);
//       }
//     }
//   };

//   const updateContractState = async () => {
//     if (contract) {
//       const insurerAddress = await contract.insurer();
//       const holderAddress = await contract.policyHolder();
//       const active = await contract.isPolicyActive();
//       setInsurer(insurerAddress);
//       setPolicyHolder(holderAddress);
//       setIsPolicyActive(active);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Insurance Contract Frontend</h1>
//       <div>
//         <h2>Policy Information</h2>
//         <p>Insurer: {insurer}</p>
//         <p>Policy Holder: {policyHolder}</p>
//         <p>Policy Active: {isPolicyActive.toString()}</p>
//       </div>
//       <div>
//         <h2>Purchase Policy</h2>
//         <input
//           type="text"
//           placeholder="Premium (Ether)"
//           value={premium}
//           onChange={(e) => setPremium(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Coverage Amount (Ether)"
//           value={coverageAmount}
//           onChange={(e) => setCoverageAmount(e.target.value)}
//         />
//         <button onClick={purchasePolicy}>Purchase Policy</button>
//       </div>
//       <div>
//         <h2>Make a Claim</h2>
//         <button onClick={makeClaim}>Make Claim</button>
//       </div>
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import InsuranceContractABI from './contracts/InsuranceContractABI.json'; // Replace with the path to your Insurance Contract ABI

const App = () => {
  const [premium, setPremium] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [contract, setContract] = useState(null);
  const [insurer, setInsurer] = useState('');
  const [policyHolder, setPolicyHolder] = useState('');
  const [isPolicyActive, setIsPolicyActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const contractAddress = ' 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318'; // Replace with the actual contract address of your Insurance Contract

  useEffect(() => {
    const initializeProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        setContract(new ethers.Contract(contractAddress, InsuranceContractABI.abi, signer));
        setIsLoading(false);

        // Fetch contract data
        const fetchedPremium = await contract.premium();
        const fetchedCoverageAmount = await contract.coverageAmount();
        const fetchedInsurer = await contract.insurer();
        const fetchedPolicyHolder = await contract.policyHolder();
        const fetchedIsPolicyActive = await contract.isPolicyActive();

        setPremium(fetchedPremium.toString());
        setCoverageAmount(fetchedCoverageAmount.toString());
        setInsurer(fetchedInsurer);
        setPolicyHolder(fetchedPolicyHolder);
        setIsPolicyActive(fetchedIsPolicyActive);
      } else {
        console.error('Please install MetaMask to interact with the wallet.');
      }
    };

    initializeProvider();
  }, []);

  const purchasePolicy = async () => {
    if (contract) {
      try {
        const tx = await contract.purchasePolicy({ value: ethers.utils.parseEther(premium) });
        await tx.wait();
        setIsPolicyActive(true);
      } catch (error) {
        console.error('Error purchasing policy:', error);
      }
    }
  };

  const makeClaim = async () => {
    if (contract) {
      try {
        const tx = await contract.makeClaim();
        await tx.wait();
        setIsPolicyActive(false);
      } catch (error) {
        console.error('Error making a claim:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Insurance Contract Frontend</h1>
      <div>
        <h2>Policy Information</h2>
        <p>Insurer: {insurer}</p>
        <p>Policy Holder: {policyHolder}</p>
        <p>Policy Active: {isPolicyActive ? 'true' : 'false'}</p>
      </div>
      <div>
        <h2>Purchase Policy</h2>
        <div className="form-group">
          <label>Premium (Ether)</label>
          <input
            type="text"
            placeholder="Premium"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Coverage Amount (Ether)</label>
          <input
            type="text"
            placeholder="Coverage Amount"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
          />
        </div>
        <button onClick={purchasePolicy}>Purchase Policy</button>
      </div>
      <div>
        <h2>Make a Claim</h2>
        <button onClick={makeClaim}>Make a Claim</button>
      </div>
    </div>
  );
};

export default App;

