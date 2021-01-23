// getElementsByTagName('img')[0].src
const node = "";
const hello = {
  id: node.dataset["id"],
  price: node.getElementsByClassName("_3I9_wc")[0].innerText,
  discount_price: node.getElementsByClassName("_30jeq3")[0].innerText,
  name:
    node.getElementsByClassName("_2WkVRV")[0].innerText +
    " " +
    node.getElementsByClassName("IRpwTa")[0].innerText,
  image_urls: [node.getElementsByTagName("img")[0].src],
  categories: ["Men's Clothing"],
  desciption: "Description goes here",
};
export default hello;
