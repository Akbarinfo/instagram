const elUlBox = document.querySelector('#media-list');
const elPostsBtn = document.querySelector('#posts')
const elTaggedBtn = document.querySelector('#tagged')
window.addEventListener('load', () => {
  renderPosts('posts')
})

elPostsBtn.addEventListener('click', () => {
  renderPosts('posts')
})

elTaggedBtn.addEventListener('click', () => {

  renderPosts('tagged')
})

function renderPosts(type) {
  elUlBox.innerHTML = null
  let arr = null
  if(type == 'posts') {
    arr = infoArr
  } else {
    arr = taggedPosts
  }

  arr.forEach(item => {
    let [li, imgdiv, img, div, fdiv, span, span2, icon, icon2, text, text2, iplay, icarusel] = createElements('li', 'div', 'img', 'div','div', 'span', 'span', 'i', 'i', 'span', 'span', 'i', 'i')
    li.className = 'media__item';
    li.setAttribute('id', `${item.id}`);
    li.setAttribute('onclick', 'funMedia(event)');
    imgdiv.className = 'media__imgbox';
    img.className = 'media__img'
    img.setAttribute('alt', `img${item.id}`)
    div.className = 'media__main  align-items-center justify-content-center';
    fdiv.className = 'd-flex';
    span.className = 'media__span d-flex align-items-center';
    span2.className = 'media__span d-flex align-items-center';
    icon2.className = 'bx bxs-message-rounded bx-flip-horizontal media__icon';
    text.textContent = `${item.like}`;
    text2.textContent = `${item.comment}`;
    iplay.className = 'bx bx-play media__icon-right';
    icarusel.className ='bx bxs-copy bx-flip-vertical media__icon-rights';

    //agar modalda video bo'lsa play belgini chiqar
    if(item.file[0].includes('.mp4')) {
      li.appendChild(iplay)
      icon.className = 'bx bx-play media__icon';
      span.appendChild(icon)
      img.setAttribute('src', `${item.file[1]}`)
    }
    else {
      icon.className = 'bx bxs-heart media__icon';
      span.appendChild(icon)
      img.setAttribute('src', `${item.file[0]}`)
    }
    if(item.file.length > 3) {
      li.appendChild(icarusel)
    }

    span.appendChild(icon)
    span.appendChild(text)
    span2.appendChild(icon2)
    span2.appendChild(text2)
    fdiv.appendChild(span)
    fdiv.appendChild(span2)
    div.appendChild(fdiv)
    imgdiv.appendChild(img)
    li.appendChild(imgdiv)
    li.appendChild(div)

    elUlBox.appendChild(li)

  })
}