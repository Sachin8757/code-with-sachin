burger=document.querySelector('.burger')
navbar=document.querySelector('.navbar')
rightNav=document.querySelector('.rightnav')
navList=document.querySelector('.nav-list')

burger.addEventListener('click',()=>{
    navList.classList.toggle('v-class');
    navbar.classList.toggle('h-nav');
    rightNav.classList.toggle('v-class');
})