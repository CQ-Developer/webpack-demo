import count from "./js/count.js";
import sum from "./js/sum.js";

// 在入口处引入使得webpack能打包该资源
import "./css/index.css";
// 引入字体图标文件
import "./css/iconfont.css"

// 引入less资源
import "./less/index.less";

// 引入sass资源
import "./sass/index.sass"
import "./sass/index.scss"

// 引入stylus资源
import "./stylus/index.styl"

// 引入其他资源
import "./media/flower.webm"

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4, 5));

// 热替换JS资源
if (module.hot) {
    module.hot.accept("./js/count.js");
    module.hot.accept("./js/sum.js");
}

// 动态导入math
document.getElementById("btn").onclick = function () {
    import(/* webpackChunkName: "math" */ "./js/math.js").then(({ sum }) => console.log(sum(1, 2, 3)));
};