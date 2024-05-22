document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-button")
    .addEventListener("click", function () {
      const query = document.getElementById("main-search-bar").value.trim();
      if (query) {
        console.log("Search query:", query);
      } else {
        console.log("Please enter a search query");
      }
    });

    document
    .getElementById("home-button")
    .addEventListener("click", goToHomePage);
    
  function goToHomePage() {
    window.location.href = "/html/home.html";
  }

  document
    .getElementById("basket-button")
    .addEventListener("click", goToBasket);
  function goToBasket() {
    window.location.href = "/html/home.html";
  }

  let headAnimationInProgress = false;
  let bodyAnimationInProgress = false;

  // Function to handle mouse movement
  document.addEventListener("mousemove", function (event) {
    const accountButton = document.getElementById("account-button");
    const accountHead = document.getElementById("account-head");
    const accountBody = document.getElementById("account-body");
    const rect = accountButton.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const withinLeftDistance = mouseX >= rect.left - 25;
    const withinRightDistance = mouseX <= rect.right + 100;
    const withinTopDistance = mouseY >= rect.top - 100;
    const withinBottomDistance = mouseY <= rect.bottom + 100;

    if (
      withinLeftDistance &&
      withinRightDistance &&
      withinTopDistance &&
      withinBottomDistance
    ) {
      if (
        !headAnimationInProgress &&
        !accountHead.classList.contains("move-down-head")
      ) {
        headAnimationInProgress = true;
        accountHead.classList.remove("move-up-head");
        accountHead.classList.add("move-down-head");
        accountHead.addEventListener(
          "animationend",
          function () {
            accountHead.style.display = "none";
            headAnimationInProgress = false;
          },
          { once: true }
        );
      }
      if (
        !bodyAnimationInProgress &&
        !accountBody.classList.contains("move-down-body")
      ) {
        bodyAnimationInProgress = true;
        accountBody.classList.remove("move-up-body");
        accountBody.classList.add("move-down-body");
        accountBody.addEventListener(
          "animationend",
          function () {
            accountBody.style.display = "none";
            bodyAnimationInProgress = false;
          },
          { once: true }
        );
      }
    } else {
      if (
        !headAnimationInProgress &&
        accountHead.classList.contains("move-down-head")
      ) {
        headAnimationInProgress = true;
        accountHead.classList.remove("move-down-head");
        accountHead.style.display = "block";
        accountHead.classList.add("move-up-head");
        accountHead.addEventListener(
          "animationend",
          function () {
            headAnimationInProgress = false;
          },
          { once: true }
        );
      }

      if (
        !bodyAnimationInProgress &&
        accountBody.classList.contains("move-down-body")
      ) {
        bodyAnimationInProgress = true;
        accountBody.classList.remove("move-down-body");
        accountBody.style.display = "block";
        accountBody.classList.add("move-up-body");
        accountBody.addEventListener(
          "animationend",
          function () {
            bodyAnimationInProgress = false;
          },
          { once: true }
        );
      }
    }
  });

  const underline = document.getElementById("underline");
  const labels = document.querySelectorAll(".menu-label");

  function updateUnderlinePosition() {
    const checkedRadio = document.querySelector('input[name="menu"]:checked');
    const checkedLabel = checkedRadio.parentElement;
    const spanElement = checkedRadio.nextElementSibling;

    const labelRect = checkedLabel.getBoundingClientRect();
    const containerRect = document
      .getElementById("grey-container")
      .getBoundingClientRect();

    underline.style.width = `${spanElement.offsetWidth}px`;
    underline.style.left = `${labelRect.left - containerRect.left}px`;
  }

  labels.forEach((label) => {
    label.addEventListener("click", updateUnderlinePosition);
  });

  // Initial update on page load to position the underline under "New"
  updateUnderlinePosition();
});

function PopIn(element) {
  const elem = document.getElementById(element);
  elem.classList.add("pop-in");
  elem.classList.remove("pop-out");
}

function PopOut(element) {
  const elem = document.getElementById(element);
  elem.classList.remove("pop-in");
  elem.classList.add("pop-out");
}

function BigPop(element) {
  const elem = document.getElementById(element);
  elem.classList.remove("pop-in", "pop-out", "big-pop-out");
  elem.classList.add("big-pop-in");

  setTimeout(() => {
      elem.classList.remove("big-pop-in");
      elem.classList.add("big-pop-out");

      setTimeout(() => {
          elem.classList.remove("big-pop-out");
      }, 100);
  }, 100);
}