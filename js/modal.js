const elModal = document.querySelector('#id-modal');
const elModalBox = document.querySelector('#id-modal-box');
const elBody = document.querySelector('body')
let taggedPosts = []

function addYurak(htmlEL) {
  console.log(htmlEL)
}

function funMedia(e) {
  elModalBox.innerHTML = ''
  infoArr.forEach(item => {
    if(e.path[1].id == item.id) {
      let [li, imgdiv, fdiv, lbtn, rbtn, ricon, licon] = createElements('div', 'div', 'div', 'button', 'button','i', 'i');
      li.className = 'imodal__main d-flex';
      li.setAttribute('id', item.id)
      imgdiv.className = "imodal__imgboxs"
      fdiv.className = "imodal__imgbox d-flex";
      fdiv.setAttribute('id', 'imgbox');
      lbtn.className = "imodal__lbtn"
      rbtn.className = "imodal__rbtn"
      ricon.className = 'bx bxs-chevron-right-circle imodal__icons'
      licon.className = 'bx bxs-chevron-left-circle imodal__icons'
      lbtn.setAttribute('type', 'button')
      lbtn.setAttribute('id', 'lbtn')
      lbtn.appendChild(licon)
      rbtn.setAttribute('type', 'button')
      rbtn.setAttribute('id', 'rbtn')
      rbtn.appendChild(ricon);

      if(item.file.length > 3) {
        item.file.forEach(i => {
          let imgs = document.createElement('img');
          imgs.className = 'imodal__img'
          imgs.setAttribute('src', i)
          fdiv.appendChild(imgs)
        })
        imgdiv.appendChild(rbtn)
        imgdiv.appendChild(lbtn)

        lbtn.addEventListener('click', function change() {
          --idx;
          changeImg(idx)
        })
        rbtn.addEventListener('click', function change() {
          ++idx;
          changeImg(idx)
        })
      }
      else {
        if(item.file[0].includes('.mp4')) {
          fdiv.innerHTML = `
          <video width="100%" height="100%" controls>
          <source src="${item.file[0]}" type="video/mp4">
        </video>
          `
        }
        else if(!item.file[0].includes('.mp4')){
          fdiv.innerHTML = `
          <img class="imodal__img" src="${item.file[0]}" alt="img">
          `
        }
      }

      // RASM VA VIDEOLARNI CHIQARISH QISMI TUGADI

      // ENDI IKKINCHI BO'LIM MA'LUMOTLAR CHIQARISH BO'LIMI

      let [allboxs, headdiv, infodiv, sharediv, sharediv2, sharediv3, likediv, likeinput, likelabel, likeicon, bookdiv, bookinput, booklabel, bookicon, heartdiv, hearttext, heartspan, heartspan2] = createElements('div', 'div', 'div', 'div', 'div', 'div', 'div', 'input', 'label', 'i', 'div', 'input', 'label', 'i', 'div', 'p', 'span', 'span');

      //UMUMIY O'RAB TURGAN DIV
      allboxs.className = "imodal__box";

      // TEPA QISMI YANI INFODIVGACHA QISMI
      headdiv.className = 'imodal__head d-flex align-items-center justify-content-between'
      headdiv.innerHTML = `
        <div class="d-flex align-items-center">
          <img class="imodal__avatar" src="https://picsum.photos/id/29/150/150" alt="">
          <p class="imodal__title">najottalim • Following </p>
        </div>
        <i class='bx bx-dots-horizontal-rounded imodal__dot'></i>
      </div>
      `

      //INFODIV SHARE DIVGACHA QISMI
      infodiv.className = 'imodal__info d-flex'
      infodiv.innerHTML = `
        <div>
          <img class="imodal__avatar" src="https://picsum.photos/id/29/150/150" alt="img">
        </div>
        <div class="ms-3">
          <b>nojattalim</b><p class="imodal__desc">
            ${item.desc}
          </p>
        </div>
      `

      //lIKE COMMENT SHARE VA BOOKMARK QISMI (sharediv umumiy o'rab turgan div)
      sharediv.className = 'ms-3 me-3 mb-3 pt-2 d-flex justify-content-between align-items-center';
      // sharediv2 lIKE COMMENT va SHARE o'rab turgan div
      sharediv2.className = 'd-flex';
      // sharediv3 COMMENT va SHARE o'rab turgan div
      sharediv3.className = 'd-flex';
      sharediv3.innerHTML = `
          <i class='bx bx-message-rounded bx-flip-horizontal me-3 imodal__icon'></i>
          <i class='bx bxl-telegram me-3 imodal__icon'></i>
      `

      //Likediv likeni o'rab turgan div
      likediv.className = 'd-flex'
      likeinput.className = 'imodal__binput'
      likeinput.setAttribute('type', 'checkbox')
      likeinput.setAttribute('id', `h${item.id}`)
      likelabel.setAttribute('for', `h${item.id}`)
      likeicon.className = 'bx bx-heart me-3 imodal__bicon'

      //likedivni umumiy ulash qismi
      likelabel.appendChild(likeicon)
      likediv.appendChild(likeinput)
      likediv.appendChild(likelabel)

      //likeinput checkbox uchun event biriktitish
      likeinput.addEventListener('click', () => {
        if(likeinput.checked) {
          hearttext.textContent = `${item.like + 1} `,
          heartspan2.textContent = ' likes'
          hearttext.appendChild(heartspan2)
        }
        else {
          hearttext.textContent = `${item.like} `,
          heartspan2.textContent = ' likes'
          hearttext.appendChild(heartspan2)
        }
      })

      // bookdiv bookmarkni o'rab turgan div
      bookdiv.className = 'd-flex'
      bookinput.className = 'imodal__binput'
      bookinput.setAttribute('type', 'checkbox')
      bookinput.setAttribute('id', `b${item.id}`)
      booklabel.setAttribute('for', `b${item.id}`)
      bookicon.className = 'bx bx-bookmark imodal__bicon'

      //bookInputga event biriktirish
      bookinput.addEventListener('click', () => {

        let infoBormi = taggedPosts.find( el => el?.id == li.id)

        if(infoBormi){
          bookicon.style.color = '#7a7a7a';
          taggedPosts = taggedPosts.filter( el => el.id != li.id )
        } else {
          bookicon.style.color = 'black';
          taggedPosts.push(infoArr.find( info => info.id == li.id ))
        }
      })


      // LIKE ... UMUMIY ULASH QISMI
      booklabel.appendChild(bookicon)
      bookdiv.appendChild(bookinput)
      bookdiv.appendChild(booklabel)

      // LIKELAR SONINI ANIQLAB BERUVCHI QISMI
      heartdiv.className = 'ms-3',
      hearttext.className = 'imodal__like',
      heartspan.className = 'imodal__likespan',
      hearttext.textContent = `${item.like}`,
      heartspan2.textContent = ' likes'

      //LIKELAR... ulash qismi
      hearttext.appendChild(heartspan)
      hearttext.appendChild(heartspan2)
      heartdiv.appendChild(hearttext)

      //SHAREDIV ulash qismi
      sharediv2.appendChild(likediv)
      sharediv2.appendChild(sharediv3)
      sharediv.appendChild(sharediv2)
      sharediv.appendChild(bookdiv)

      //ALLBOXSGA ulash qismi
      allboxs.appendChild(headdiv)
      allboxs.appendChild(infodiv)
      allboxs.appendChild(sharediv)
      allboxs.appendChild(heartdiv)


      imgdiv.appendChild(fdiv)
      li.appendChild(imgdiv);
      li.appendChild(allboxs);

      elModalBox.appendChild(li)

    } // IFNI QAVSI TUGADI


    elModal.style.display = "block";
    elBody.style.overflow = 'hidden'
  })
}

function funModal(e) {

  if(e.target.id == elModalBox.id || e.target.id == elModal.id) {
    elModal.style.display = "none";
    elBody.style.overflow = 'auto'
  }
}

let idx = 0;
  function changeImg(idX) {
    let imgs = document.querySelectorAll('#imgbox img')
    const elImgBox = document.querySelector('#imgbox');
    if(idX >= imgs.length) {
      idx = 0
      idX = 0
      elImgBox.style.transform = `translateX(${-idX * 100}%)`
    } else if(idX < 0) {
      idX = imgs.length - 1
      idx = imgs.length - 1
      elImgBox.style.transform = `translateX(${-idX * 100}%)`
    } else {
      elImgBox.style.transform = `translateX(${-idX * 100}%)`
    }
  }
