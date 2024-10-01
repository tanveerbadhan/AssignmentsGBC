document.addEventListener('DOMContentLoaded', () => {
    const bill = document.querySelector('.bill');
    bill.style.display = 'none';
});

const calculateButton = document.querySelector('#calculateButton');
const onPeakCharges = 0.132;
const offPeakCharges = 0.065;

const handleCalculateClick = () => {
    const onPeakInputValue = document.querySelector('#onPeakInput').value;
    const offPeakInputValue = document.querySelector('#offPeakInput').value;
    const provinceInputValue = document.querySelector('#provinceInput').value;
    const britishColumbia = 'British Columbia';
    const ontario = 'Ontario';

    const bill = document.querySelector('.bill');

    if (!(onPeakInputValue && offPeakInputValue && provinceInputValue && (provinceInputValue === britishColumbia || provinceInputValue === ontario))) {
        bill.style.display = 'none';
        return;
    }


    bill.style.display = '';

    const onPeakAmount = onPeakCharges * onPeakInputValue;
    const offPeakAmount = offPeakCharges * offPeakInputValue;

    const onPeakAmountLabel = document.querySelector('.onPeak .amount');
    onPeakAmountLabel.innerHTML = `$${onPeakAmount.toFixed(2)}`;

    const onPeakSubLabel = document.querySelector('.onPeak .subLabel');
    onPeakSubLabel.innerHTML = `${onPeakInputValue} kwH @  $${onPeakCharges}/hr`;

    const offPeakAmountLabel = document.querySelector('.offPeak .amount');
    offPeakAmountLabel.innerHTML = `$${offPeakAmount.toFixed(2)}`;

    const offPeakSubLabel = document.querySelector('.offPeak .subLabel');
    offPeakSubLabel.innerHTML = `${offPeakInputValue} kwH @  $${offPeakCharges}/hr`;

    const totalConsumption = document.querySelector('.totalConsumption');
    totalConsumption.innerHTML = `Total Consumption Charges: <b>$${(onPeakAmount + offPeakAmount).toFixed(2)}</b>`;

    const salesTax = document.querySelector('.salesTax');
    salesTax.innerHTML = `Sales Tax (13%): <b>$${((onPeakAmount + offPeakAmount)*0.13).toFixed(2)}</b>`;

    let rebateValue = 0;
    
    const rebate = document.querySelector('.rebate');
    if(provinceInputValue === britishColumbia){
        rebateValue = ((onPeakAmount + offPeakAmount)*0.08).toFixed(2)
        rebate.innerHTML = `Provincial Rebate: <b>-$${rebateValue}</b>`;
    } else {
        rebate.innerHTML = "Provincial Rebate: <b>-$0</b>";
    }

    const totalPayAmount = document.querySelector('.totalPay .amount');
    totalPayAmount.innerHTML = `<b>$${((onPeakAmount + offPeakAmount)*1.13 - rebateValue).toFixed(2)}</b>`;
  
}

calculateButton.addEventListener('click', handleCalculateClick);