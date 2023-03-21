import { outputs, inputs, bunnyRadioButtons, scalewayRadioButtons } from './DOMElements.js';
import { backblazeStorage, backblazeTransfer, bunnyStorageHdd, bunnyStorageSdd, bunnyTransfer, scalewayStorageMulti, scalewayStorageSingle, scalewayTransfer, vultrStorage, vultrTransfer} from './constants.js';
import { showScheduleElement, showElementWithMinPrice, showElementWithMaxPrice, showElementWithMinGB, showLowestPrice } from './helpers.js'

showScheduleElement(bunnyRadioButtons, 'ssd', 'hdd');
showScheduleElement(scalewayRadioButtons, 'single', 'multi');

outputs.forEach(output => {
  output.textContent = '0 GB'
})

inputs.forEach(input => {
  input.addEventListener('input', ()=>{
    const output = document.querySelector('.value.' + input.classList[1]);
    output.innerHTML = input.value + " GB"
    showElementWithMinPrice('backblaze_element', backblazeStorage, backblazeTransfer, 7);
    showElementWithMaxPrice('bunny_hdd', bunnyStorageHdd, bunnyTransfer, 10);
    showElementWithMaxPrice('bunny_ssd', bunnyStorageSdd, bunnyTransfer, 10);
    showElementWithMinGB('scaleway_multi', scalewayStorageMulti, scalewayTransfer, 75);
    showElementWithMinGB('scaleway_single', scalewayStorageSingle, scalewayTransfer, 75);
    showElementWithMinPrice('vultr_element', vultrStorage, vultrTransfer, 5);
    showLowestPrice()


  })
})





