import count from "./js/count.js";
import sum from "./js/sum.js";

// 在入口处引入使得webpack能打包该资源
import "./css/index.css";

// 引入less资源
import "./less/index.less";

// 引入sass资源
import "./sass/index.sass"
import "./sass/index.scss"

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4, 5));