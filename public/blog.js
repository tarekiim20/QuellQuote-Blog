const quotesText = document.querySelectorAll(".quote-body div p");
const copyAction = document.querySelectorAll(".copy");
const likeButton = document.querySelectorAll(".like-button button:first-child");
const likesCounter = document.querySelectorAll(
  ".quote-body div.gap-3 span:nth-child(2)"
);

var counter = 1;
const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

for (let index = 0; index < copyAction.length; index++) {
  copyAction[index].addEventListener(
    "click",
    copyContent(quotesText[index].innerHTML)
  );
}

for (let index = 0; index < likeButton.length; index++) {
  likeButton[index].addEventListener("click", () => {
    likesCounter[index].innerHTML = "likes:" + counter;
    counter++;
  });
}
