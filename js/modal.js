const elModal = document.querySelector('#id-modal');
const elModalBox = document.querySelector('#id-modal-box');
const elBody = document.querySelector('body')
const elImgBox = document.querySelector('#imgbox');

function funMedia(e) {
  elModalBox.innerHTML = ''
  infoArr.forEach(item => {
    if(e.path[1].id == item.id) {
      console.log(e.path[1].id, "Ishladi");
      let [li, idiv, fdiv, bdiv, lbtn, rbtn, ricon, licon] = createElements('div', 'div', 'div', 'div', 'button', 'button','i', 'i');
      li.className = 'imodal__main d-flex';
      idiv.className = "imodal__imgboxs"
      fdiv.className = "imodal__imgbox d-flex";
      fdiv.setAttribute('id', 'imgbox');
      bdiv.className = "imodal__box";
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
        idiv.appendChild(rbtn)
        idiv.appendChild(lbtn)

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

      bdiv.innerHTML = `
      <div class="imodal__box">
      <div class="imodal__head d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <img class="imodal__avatar" src="https://picsum.photos/id/29/150/150" alt="">
          <p class="imodal__title">najottalim • Following </p>
        </div>
        <p class="imodal__dot">...</p>
      </div>
      <div class="imodal__info d-flex">
        <div>
          <img class="imodal__avatar" src="https://picsum.photos/id/29/150/150" alt="">
        </div>
        <div class="ms-3">
          <b>nojattalim</b><p class="imodal__desc">
            ${item.desc}
          </p>
        </div>
      </div>
      <div class="ms-3 me-3 mb-3 d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <i class='bx bx-heart me-3 imodal__icon'></i>
          <i class='bx bx-message-rounded bx-flip-horizontal me-3 imodal__icon'></i>
          <i class='bx bxl-telegram me-3 imodal__icon'></i>
        </div>
        <i class='bx bx-bookmark imodal__icon'></i>
      </div>
        <div class="ms-3">
          <p class="imodal__like"><span class="imodal__likespan">${item.like}</span> likes</p>
        </div>
    </div>
      `
      idiv.appendChild(fdiv)
      li.appendChild(idiv);
      li.appendChild(bdiv);

      elModalBox.appendChild(li)
    }
    elModal.style.display = "block";
    elBody.style.overflow = 'hidden'
  })
}

function funModal(e) {
  console.log(e.target.id)

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
