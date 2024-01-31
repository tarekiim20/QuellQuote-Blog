const navLinkEl = document.querySelectorAll(".nav-link");
const windowPathName = window.location.pathname;

navLinkEl.forEach((navLinkEl) => {
  const navLinkPathname = new URL(navLinkEl.href).pathname;

  if (navLinkPathname === windowPathName) {
    navLinkEl.classList.add("active");
  }
});

var enteredEmail = "";
document
  .querySelector(".emailForm input")
  .addEventListener("input", (event) => {
    enteredEmail = event.target.value;
    console.log(enteredEmail);
  });

document.querySelector(".emailForm button").addEventListener("click", (req) => {
  if (enteredEmail !== null || enteredEmail !== "") {
    document.querySelector(".modal").classList.replace("d-none", "d-block");
  }
  setTimeout(() => {
    document.querySelector(".modal").classList.replace("d-block", "d-none");
  }, 3000);
});

document.querySelector(".modal-body button").addEventListener("click", () => {
  document.querySelector(".modal").classList.replace("d-block", "d-none");
});
const jumptroon = $(".jumptroon")[0];
const jumptroonImg = $(".jumptroon img")[0];
const jumptroonDiv = $(".jumptroon div h2")[0];
const jumptroonDiv1 = $(".jumptroon div p")[0];

document.addEventListener("scroll", () => {
  const clientViewPort = document.documentElement.clientHeight;
  const jumptroonY = jumptroon.getBoundingClientRect().y;
  const jumptroonHight = jumptroon.getBoundingClientRect().height;

  if (clientViewPort > jumptroonY + jumptroonHight * (2 / 3)) {
    jumptroonImg.style.animation =
      "fadeInUp 1s forwards cubic-bezier(0.87, 0, 0.13, 1)";
    jumptroonDiv.style.animation =
      "fadeInUp 3s forwards cubic-bezier(0.87, 0, 0.13, 1)";
    jumptroonDiv1.style.animation =
      "fadeInUp 3s forwards cubic-bezier(0.87, 0, 0.13, 1)";
  }
});
