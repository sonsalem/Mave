' use strict'

// Header Scroll

let Header = document.querySelector('header');

window.addEventListener('scroll', function () {
  this.scrollY >= 200 ? Header.classList.add('active') : Header.classList.remove('active');
})

// Header Menu Toggle

let links = document.querySelectorAll('.links');
let linkOpen = document.querySelector('.links-open');

linkOpen.addEventListener('click', function () {
  links.forEach(link => {
    link.classList.toggle('show')
  })
})

// Scroller landing

const scrollers = document.querySelectorAll('.scroller');

addAnimation();

function addAnimation() {
  scrollers.forEach(scroller => {

    const scrollerInner = scroller.querySelector('.scroller-inner');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute('aria-hidden', true);
      scrollerInner.appendChild(duplicatedItem);
    })

  })
}

// Work shuffle

let shuffle = Array.from(document.querySelector('.work .shuffleFilter').children);
let contents = Array.from(document.querySelector('.work .contents').children);

shuffle.forEach(item => {
  item.onclick = function () {
    // Set Active One
    shuffle.forEach(el => el.classList.remove('active'));
    this.classList.add('active');

    // Hide All Contents
    contents.forEach(el => el.classList.add('hide'));

    // Show Specific Content
    contents.forEach(content => {
      if (content.dataset.content == item.dataset.filter) content.classList.remove('hide');
    })
  }
})

// Son Carousel

const sonCrousel = document.querySelector('.son-carousel');
const gapItems = 20;

launchCarousel()

function launchCarousel() {

  const sonOuter = document.querySelector('.son-outer');
  const sonItems = Array.from(sonOuter.children);
  const next = document.querySelector('.son-carousel .next');
  const prev = document.querySelector('.son-carousel .prev');

  let numbersOfItems = 0;

  const meida = {
    0: 1,
    567: 2,
    992: 3,
    1200: 5,
  }


  sonOuter.style.gap = `${gapItems}px`;

  window.addEventListener('scroll', function () {

    for (let i = 0; i < Object.keys(meida).length; i++) {
      let currentMedia = document.body.offsetWidth;

      if (currentMedia >= Object.keys(meida).reverse()[i]) {

        numbersOfItems = Object.values(meida).reverse()[i];
        break;

      }
    }

    let currectWidth = sonCrousel.offsetWidth;
    let itemWidth = (currectWidth / numbersOfItems) - (((numbersOfItems-1) * gapItems) / numbersOfItems);

    sonItems.forEach( item => {
      item.style.minWidth = `${itemWidth}px`
      item.style.maxWidth = `${itemWidth}px`
    })

    let count = 0;

    next.addEventListener('click', function () {
      if (count < (sonItems.length - numbersOfItems)) {
        count++;
        sonOuter.style.translate = `-${(itemWidth + gapItems) * count}px 0`
      }
    })

    prev.addEventListener('click', function () {
      if (count != 0) {
        count--;
        sonOuter.style.translate = `-${(itemWidth + gapItems) * count}px 0`
      }
    })

  })

}