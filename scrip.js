const carousel = document.querySelector(".carousel");
firstImg = document.querySelectorAll("img") [0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart =false, prevPageX, prevScrollLeft , positionDiff;



const ShowHideIcons = () =>{

   let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
   arrowIcons [0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
   arrowIcons [1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
   icon.addEventListener("click", () =>{
      
      let firstImgWidth = firstImg.clientWidth + 14;
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => ShowHideIcons(), 60);
   })
   
});

const autoSlide = () => {

}

const dragStart =(e) =>{
   isDragStart = true;
   prevPageX = e.pageX;
   prevScrollLeft = carousel.scrollLeft
}

 const dragging = (e) => {
   if(!isDragStart) return;
   e.preventDefault();
   carousel.classList.add("dragging")
   positionDiff = e.pageX - prevPageX;
   carousel.scrollLeft = prevScrollLeft - positionDiff;
   ShowHideIcons();

 }

 const dragStop = () =>{
   isDragStart =false;
   carousel.classList.remove("dragging")
   autoSlide();
 }

 carousel.addEventListener ("mousedown" , dragStart);
 carousel.addEventListener ("mousemove" , dragging);
 carousel.addEventListener ("mouseup" , dragStop);
 carousel.addEventListener ("mouseleave" , dragStop);