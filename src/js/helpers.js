import { inputs, scheduleElements, price, scheduleItems } from './DOMElements.js';

export function showScheduleElement (elements, checkedValue, uncheckedValue) {

  elements.forEach(element => {
    element.addEventListener('input', () => {
     if(element.value === checkedValue) {

      scheduleItems.forEach((scheduleItem, i) => {
        if(scheduleItem.children[0].classList[1].includes(checkedValue)){
          scheduleItem.style.display = 'flex'
          scheduleItems[i-1].style.display = 'none'
        } else if (scheduleItem.children[0].classList[1].includes(uncheckedValue)) {
          scheduleItem.style.display = 'none'
          scheduleItems[i+1].style.display = 'flex'
        }
      })
    } else {
          scheduleItems.forEach((scheduleItem, i) =>{
            if(scheduleItem.children[0].classList[1].includes(checkedValue)){
              scheduleItem.style.display = 'none';
              scheduleItems[i-1].style.display = 'flex'
            } else if (scheduleItem.children[0].classList[1].includes(uncheckedValue)) {
              scheduleItem.style.display = 'flex';
              scheduleItems[i+1].style.display = 'none'
            }
          })
     }
     showLowestPrice()
    })
  })
}



export function showElementWithMinPrice (scheduleClassList, StoragePrice, transferPrice, minPrice) {

  scheduleElements.forEach(scheduleElement => {

    const span = document.querySelector('.price.' + scheduleElement.classList[1]);

    if (scheduleElement.classList.contains(scheduleClassList)) {
       Array.from(inputs).reduce((acc, curr) => {
        if (curr.classList.contains('storage')) {
          acc += +curr.value * StoragePrice * 10
        } else if (curr.classList.contains('transfer')) {
          acc += +curr.value * transferPrice * 10
        }
        
        if (document.documentElement.clientWidth > 768) {
          scheduleElement.style.height = 20 + 'px'

          if (acc === 0) {
            span.innerHTML = '0' + '$'
            scheduleElement.style.width = acc + '%'
          } else if (acc/10 < minPrice) {
            span.innerHTML = minPrice + '$'
            scheduleElement.style.width = minPrice + '%'
          } else {
            span.innerHTML = (acc/10).toFixed(2) + '$'
            scheduleElement.style.width = acc/10 + '%'
          }
        } else {
          scheduleElement.style.width = 40 + 'px'

          if (acc === 0) {
            span.innerHTML = '0' + '$'
            scheduleElement.style.height = acc + '%'
          } else if (acc/10 < minPrice) {
            span.innerHTML = minPrice + '$'
            scheduleElement.style.height = minPrice + '%'
          } else {
            span.innerHTML = (acc/10).toFixed(2) + '$'
            scheduleElement.style.height = acc/10 + '%'
          }
        }
        return acc;
      }, 0)
    }
  })
}

export function showElementWithMaxPrice (scheduleClassList, StoragePrice, transferPrice, maxPrice) {

  scheduleElements.forEach(scheduleElement =>{

    const span = document.querySelector('.price.' + scheduleElement.classList[1]);

   if(scheduleElement.classList.contains(scheduleClassList)) {
     Array.from(inputs).reduce((acc, curr) => {

      if (curr.classList.contains('storage')) {
        acc += +curr.value * StoragePrice * 10
      } else if (curr.classList.contains('transfer')) {
        acc += +curr.value * transferPrice * 10
      }

      if (document.documentElement.clientWidth > 768) {
        scheduleElement.style.height = 20 + 'px'

        if(acc === 0) {
          span.innerHTML = '0' + '$'
          scheduleElement.style.width = acc + '%'
        } else if(acc/10 >= maxPrice) {
          span.innerHTML = maxPrice + '$'
          scheduleElement.style.width = maxPrice + '%'
        } else {
          span.innerHTML = (acc/10).toFixed(2) + '$'
          scheduleElement.style.width = acc/10 + '%'
        }
      } else {
        scheduleElement.style.width = 40 + 'px'
        if(acc === 0) {
          span.innerHTML = '0' + '$'
          scheduleElement.style.height = acc + '%'
        } else if(acc/10 >= maxPrice) {
          span.innerHTML = maxPrice + '$'
          scheduleElement.style.height = maxPrice + '%'
        } else {
          span.innerHTML = (acc/10).toFixed(2) + '$'
          scheduleElement.style.height = acc/10 + '%'
        }
      }
      return acc;
     }, 0)
   }
  })
}

export function showElementWithMinGB (scheduleClassList, StoragePrice, transferPrice, minGB) {

  scheduleElements.forEach(scheduleElement =>{

    const span = document.querySelector('.price.' + scheduleElement.classList[1]);

    if(scheduleElement.classList.contains(scheduleClassList)) {

      const total = Array.from(inputs).reduce((acc, curr, _, arr) => {

        if (curr.value <= minGB) {
          return acc;
        } else if(curr.classList.contains('storage')) {
          acc += (+curr.value - minGB) * StoragePrice * 10
        } else if(curr.classList.contains('transfer')) {
          acc += (+curr.value - minGB) * transferPrice * 10
        }

        return acc;
      }, 0)

      if (document.documentElement.clientWidth > 768) {
        scheduleElement.style.height = 20 + 'px'
        if(total === 0) {
          span.innerHTML = '0' + '$'
          scheduleElement.style.width = total + '%'
        } else if (+inputs[0].value <= minGB && +inputs[1].value <= minGB) {
          span.innerHTML = '0' + '$'
          scheduleElement.style.width = 0 + '%'
        } else {
          span.innerHTML = (total/10).toFixed(2) + '$'
          scheduleElement.style.width = total/10 + '%'
        }
      } else {
        scheduleElement.style.width = 40 + 'px'
        if(total === 0) {
          span.innerHTML = '0' + '$'
          scheduleElement.style.height = total + '%'
        } else if (+inputs[0].value <= minGB && +inputs[1].value <= minGB) {
          span.innerHTML = '0' + '$'
          scheduleElement.style.height = 0 + '%'
        } else {
          span.innerHTML = (total/10).toFixed(2) + '$'
          scheduleElement.style.height = total/10 + '%'
        }
      }
    }
  })
}

export function showLowestPrice () {
  const arr =[];
  price.forEach(el => {
    if(getComputedStyle(el).display !== 'none') {
      arr.push(parseFloat(el.innerHTML))
    }
  })

  const min = Math.min(...arr)

  let minPriceElement = Array.from(price).filter(el => parseFloat(el.innerHTML) === min && getComputedStyle(el).display !== 'none')
  let result = Array.from(scheduleElements).filter(el => el.classList[1] === minPriceElement[0].classList[1]) ;

  if(result[0].classList[1] === 'backblaze_element') {

    result[0].classList.add('red')
    Array.from(scheduleElements).forEach(el => {
      el.classList.remove('orange', 'violet', 'blue')
    })
  } else if (result[0].classList[1] ==='bunny_hdd') {
    result[0].classList.add('orange')
    Array.from(scheduleElements).forEach(el => {
      el.classList.remove('red', 'violet', 'blue')
    })
  } else if (result[0].classList[1] ==='bunny_ssd') {
    result[0].classList.add('orange')
    Array.from(scheduleElements).forEach(el => {
      el.classList.remove('red', 'violet', 'blue')
    })
  } else if (result[0].classList[1] === 'scaleway_multi') {
    result[0].classList.add('violet')
    Array.from(scheduleElements).forEach(el => {
      el.classList.remove('red', 'orange', 'blue')
    })
  } else if (result[0].classList[1] === 'scaleway_single') {
    result[0].classList.add('violet')
    Array.from(scheduleElements).forEach(el => {
      el.classList.remove('red', 'orange', 'blue')
    })
  } else if (result[0].classList[1] === 'vultr_element') {
    result[0].classList.add('blue')
    Array.from(scheduleElements).forEach(el => {
      el.classList.remove('red', 'orange', 'violet')
    })
  }
}